import { test, expect } from './fixtures.js';

const mur = (page) =>
  page.evaluate(() => {
    const section = document.querySelector('[data-mur]');
    const el = document.querySelector('[data-mur-ball]');
    const box = el.getBoundingClientRect();
    return {
      phase: section.dataset.phase,
      score: Number(section.dataset.score ?? 0),
      errors: Number(section.dataset.errors ?? 0),
      marks: document.querySelectorAll('[data-mur-mark]').length,
      ball: { x: box.x + box.width / 2, y: box.y + box.height / 2 },
      visible: getComputedStyle(el).opacity !== '0',
    };
  });

async function toTheEnd(page) {
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect.poll(async () => (await mur(page)).phase, { timeout: 8000 }).toBe('idle');
}

// a raquete persegue a bola até as cordas encostarem nela com a bola descendo (e a rebatida contar)
async function rebater(page) {
  const before = (await mur(page)).score;
  for (let i = 0; i < 200; i++) {
    const { ball, score } = await mur(page);
    if (score !== before) return;
    await page.mouse.move(ball.x, ball.y);
    await page.waitForTimeout(20);
  }
  throw new Error('a raquete não conseguiu rebater');
}

test('a Bola chega ao Le Mur depois que o traço termina no ingresso', async ({ page }) => {
  await page.goto('/');
  await toTheEnd(page);
  const state = await mur(page);
  expect(state.visible).toBe(true);
  const court = await page.locator('[data-mur-court]').boundingBox();
  expect(state.ball.y).toBeGreaterThan(court.y);
  expect(state.ball.y).toBeLessThan(court.y + court.height);
  // uma Bola só: a do rali já não aparece
  expect(await page.locator('[data-rally-ball]').evaluate((el) => getComputedStyle(el).opacity)).toBe('0');
  await expect(page.locator('[data-mur-status]')).toHaveText('Rebata para começar');
});

test('uma passada da raquete pela Bola conta 1 rebatida e começa a partida', async ({ page }) => {
  await page.goto('/');
  await toTheEnd(page);
  await rebater(page);
  expect(await mur(page)).toMatchObject({ phase: 'playing', score: 1, errors: 0 });
});

test('rebater e deixar cair três vezes encerra a partida com o placar', async ({ page }) => {
  await page.goto('/');
  await toTheEnd(page);
  for (let i = 1; i <= 3; i++) {
    await rebater(page);
    await page.mouse.move(5, 5);
    await expect.poll(async () => (await mur(page)).errors, { timeout: 5000 }).toBe(i);
  }
  expect(await mur(page)).toMatchObject({ phase: 'over', score: 3 });
  // a primeira partida sempre bate o recorde (0)
  await expect(page.locator('[data-mur-status]')).toHaveText('Novo recorde: 3 rebatidas. Rebata para jogar de novo');
  await expect(page.locator('[data-mur-score]')).toHaveText('03 rebatidas · recorde 03');
  await expect(page.locator('[data-mur-error].is-made')).toHaveCount(3);
});

test('cada quique válido deixa uma Marca, e a próxima partida limpa o saibro', async ({ page }) => {
  await page.goto('/');
  await toTheEnd(page);
  for (let i = 1; i <= 3; i++) {
    await rebater(page);
    await page.mouse.move(5, 5);
    // um quique válido (a Marca) e depois o segundo quique (o erro)
    await expect.poll(async () => (await mur(page)).errors, { timeout: 5000 }).toBe(i);
    expect((await mur(page)).marks).toBe(i);
  }
  await rebater(page); // começa outra partida
  await expect.poll(async () => (await mur(page)).marks).toBe(0);
});

test('o recorde sobrevive ao recarregar', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('la-trace:le-mur:recorde', '18'));
  await page.reload();
  await page.waitForSelector('[data-loader]', { state: 'detached', timeout: 15000 });
  await toTheEnd(page);
  await rebater(page);
  await expect(page.locator('[data-mur-score]')).toHaveText('01 rebatida · recorde 18');
  for (let i = 1; i <= 3; i++) {
    if (i > 1) await rebater(page);
    await page.mouse.move(5, 5);
    await expect.poll(async () => (await mur(page)).errors, { timeout: 5000 }).toBe(i);
  }
  await expect(page.locator('[data-mur-status]')).toHaveText('Fim de partida: 3 rebatidas. Rebata para jogar de novo');
  expect(await page.evaluate(() => localStorage.getItem('la-trace:le-mur:recorde'))).toBe('18');
});

test('com o storage bloqueado, o jogo funciona e só não lembra o recorde', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('bloqueado', 'SecurityError');
      },
    });
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await toTheEnd(page);
  for (let i = 1; i <= 3; i++) {
    await rebater(page);
    await page.mouse.move(5, 5);
    await expect.poll(async () => (await mur(page)).errors, { timeout: 5000 }).toBe(i);
  }
  await expect(page.locator('[data-mur-status]')).toHaveText('Novo recorde: 3 rebatidas. Rebata para jogar de novo');
  expect(errors).toEqual([]);
});

// a raquete parada no caminho da Bola, deslocada dx na horizontal; devolve a altura do pico depois da rebatida
async function picoDaRebatida(page, dx) {
  const floor = await page.locator('[data-mur-floor]').boundingBox();
  const { ball } = await mur(page);
  await page.mouse.move(ball.x + dx, floor.y - 60);
  await expect.poll(async () => (await mur(page)).score, { timeout: 5000 }).toBe(1);
  let top = Infinity;
  for (let i = 0; i < 60; i++) {
    top = Math.min(top, (await mur(page)).ball.y);
    await page.waitForTimeout(20);
  }
  return floor.y - top;
}

test('uma passada pelo centro das cordas manda a Bola mais alto que uma pela borda', async ({ page }) => {
  await page.goto('/');
  await toTheEnd(page);
  const center = await picoDaRebatida(page, 0);
  await page.reload();
  await page.waitForSelector('[data-loader]', { state: 'detached', timeout: 15000 });
  await toTheEnd(page);
  const edge = await picoDaRebatida(page, 26);
  expect(center).toBeGreaterThan(edge * 1.15);
});

test('rolando para cima e para baixo no meio da partida, nunca há duas bolas à vista', async ({ page }) => {
  await page.goto('/');
  await toTheEnd(page);
  await rebater(page);
  await page.mouse.move(1400, 120); // longe do caminho da Bola (a raquete não rebate de novo)
  // amostra cada quadro: quantas bolas estão visíveis (a do rali e a do Le Mur)
  await page.evaluate(() => {
    window.__balls = { max: 0, frames: 0, sawRally: false };
    const visible = (sel) => Number(getComputedStyle(document.querySelector(sel)).opacity) > 0;
    const sample = () => {
      const rally = visible('[data-rally-ball]');
      const n = Number(rally) + Number(visible('[data-mur-ball]'));
      window.__balls.max = Math.max(window.__balls.max, n);
      window.__balls.sawRally ||= rally;
      window.__balls.frames++;
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  for (let i = 0; i < 20; i++) {
    await page.mouse.wheel(0, -120);
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(600);
  for (let i = 0; i < 30; i++) {
    await page.mouse.wheel(0, 120);
    await page.waitForTimeout(40);
  }
  await expect.poll(async () => (await mur(page)).phase, { timeout: 8000 }).toBe('paused');
  const balls = await page.evaluate(() => window.__balls);
  expect(balls.sawRally).toBe(true); // a Bola voltou mesmo ao rali
  expect(balls.frames).toBeGreaterThan(60);
  expect(balls.max).toBe(1);
  // a partida segue de onde parou
  expect(await mur(page)).toMatchObject({ score: 1, errors: 0 });
});

test('sair da tela pausa a partida; voltar pede um toque para continuar', async ({ page }) => {
  await page.goto('/');
  await toTheEnd(page);
  await rebater(page);
  await page.mouse.move(5, 5);
  await page.evaluate(() => window.scrollBy(0, -window.innerHeight * 1.2));
  await expect.poll(async () => (await mur(page)).phase).toBe('paused');
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(page.locator('[data-mur-status]')).toHaveText('Pausa. Clique ou aperte espaço para continuar', { timeout: 8000 });
  // pausada, a bola não cai nem conta erro
  await page.waitForTimeout(1500);
  expect(await mur(page)).toMatchObject({ phase: 'paused', score: 1, errors: 0 });
  await page.mouse.click(700, 300);
  await expect.poll(async () => (await mur(page)).phase).not.toBe('paused');
  expect((await mur(page)).score).toBe(1);
});

// conta os AudioContext criados e os avisos de autoplay
async function espiarAudio(page) {
  const warnings = [];
  page.on('console', (msg) => /AudioContext/i.test(msg.text()) && warnings.push(msg.text()));
  await page.addInitScript(() => {
    // o page.evaluate do Playwright conta como gesto do usuário; aqui a ativação é controlada pelo teste
    window.__active = false;
    Object.defineProperty(navigator, 'userActivation', { get: () => ({ hasBeenActive: window.__active, isActive: false }) });
    window.__contexts = 0;
    const Original = window.AudioContext;
    window.AudioContext = class extends Original {
      constructor(...args) {
        super(...args);
        window.__contexts++;
      }
    };
  });
  return warnings;
}

test('o som só nasce na primeira rebatida depois de uma interação, sem aviso de autoplay', async ({ page }) => {
  const warnings = await espiarAudio(page);
  await page.goto('/');
  await toTheEnd(page);
  // só a raquete encostando (sem clique nem tecla): o navegador não libera o áudio, e o jogo segue mudo
  await rebater(page);
  expect(await page.evaluate(() => window.__contexts)).toBe(0);
  // um clique libera; a próxima rebatida liga o som
  await page.evaluate(() => (window.__active = true));
  await page.mouse.move(5, 5);
  await expect.poll(async () => (await mur(page)).errors, { timeout: 5000 }).toBe(1);
  await rebater(page);
  expect(await page.evaluate(() => window.__contexts)).toBe(1);
  expect(warnings).toEqual([]);
});

test('o botão de som alterna, tem nome e estado, e a escolha sobrevive ao recarregar', async ({ page }) => {
  await page.goto('/');
  await toTheEnd(page);
  const button = page.getByRole('button', { name: 'Som' });
  await expect(button).toHaveAttribute('aria-pressed', 'true');
  await button.click();
  await expect(button).toHaveAttribute('aria-pressed', 'false');
  await page.reload();
  await page.waitForSelector('[data-loader]', { state: 'detached', timeout: 15000 });
  await expect(page.getByRole('button', { name: 'Som' })).toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('button', { name: 'Som' }).click();
  await expect(page.getByRole('button', { name: 'Som' })).toHaveAttribute('aria-pressed', 'true');
});

test('pelo teclado: Tab chega ao "Jogar" e o espaço rebate só com a Bola ao alcance', async ({ page }) => {
  await page.goto('/');
  await toTheEnd(page);
  await page.locator('.ticket').focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('[data-mur-sound]')).toBeFocused(); // o botão de som, no canto, vem primeiro
  await page.keyboard.press('Tab');
  await expect(page.locator('[data-mur-play]')).toBeFocused();
  await expect(page.locator('[data-mur-hint]')).toContainText('espaço');

  const scrollY = await page.evaluate(() => window.scrollY);
  for (let i = 0; i < 100 && (await mur(page)).score === 0; i++) {
    await page.keyboard.press('Space');
    await page.waitForTimeout(30);
  }
  expect(await mur(page)).toMatchObject({ phase: 'playing', score: 1 });
  // logo depois da rebatida a bola sobe: o espaço não vale
  await page.keyboard.press('Space');
  expect((await mur(page)).score).toBe(1);
  // o espaço não rola a página
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollY);
});

test.describe('no celular', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test('um toque perto da Bola rebate; longe, não', async ({ page }) => {
    await page.goto('/');
    await toTheEnd(page);
    await expect(page.locator('[data-mur-hint]')).toHaveText('Toque perto da bola');

    for (let i = 0; i < 20; i++) {
      const { ball } = await mur(page);
      await page.touchscreen.tap(ball.x, ball.y - 140);
      await page.waitForTimeout(40);
    }
    expect((await mur(page)).score).toBe(0);

    for (let i = 0; i < 100 && (await mur(page)).score === 0; i++) {
      const { ball } = await mur(page);
      await page.touchscreen.tap(ball.x + 10, ball.y);
      await page.waitForTimeout(30);
    }
    expect(await mur(page)).toMatchObject({ phase: 'playing', score: 1 });
  });

  test('arrastar a partir da Bola continua rolando a página', async ({ page }) => {
    await page.goto('/');
    await toTheEnd(page);
    const { ball } = await mur(page);
    const before = await page.evaluate(() => window.scrollY);
    const cdp = await page.context().newCDPSession(page);
    const touch = (type, y) =>
      cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x: ball.x, y }] });
    await touch('touchStart', ball.y);
    for (let y = ball.y; y <= ball.y + 300; y += 30) await touch('touchMove', y);
    await touch('touchEnd');
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(before - 100);
  });

  for (const width of [360, 390]) {
    test(`sem transbordamento a ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');
      await toTheEnd(page);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      const play = await page.locator('[data-mur-play]').boundingBox();
      expect(play.x + play.width).toBeLessThanOrEqual(width);
    });
  }
});

test.describe('com prefers-reduced-motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('o Le Mur fica parado, com o aviso', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-mur-status]')).toHaveText('O jogo aparece com as animações ligadas');
  });

  test('o estado parado mostra o recorde guardado, e nenhuma Bola anda nem há controles do jogo', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('la-trace:le-mur:recorde', '18'));
    await page.reload();
    await page.waitForSelector('[data-loader]', { state: 'detached', timeout: 15000 });
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(page.locator('[data-mur-score]')).toHaveText('Recorde: 18 rebatidas');
    await expect(page.locator('[data-mur-ball]')).toHaveCount(0);
    for (const control of ['[data-mur-play]', '[data-mur-sound]', '[data-mur-errors]', '[data-mur-hint]']) {
      await expect(page.locator(control)).toBeHidden();
    }
    // a bola do rali também fica parada: duas leituras com um intervalo dão o mesmo lugar
    const where = () => page.locator('[data-rally-ball]').evaluate((el) => el.style.transform);
    const before = await where();
    await page.waitForTimeout(800);
    expect(await where()).toBe(before);
    expect(await page.evaluate(() => typeof window.__contexts)).toBe('undefined');
  });
});
