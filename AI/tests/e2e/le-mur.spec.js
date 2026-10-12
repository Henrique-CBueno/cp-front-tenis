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
  await expect(page.locator('[data-mur-status]')).toHaveText('Fim de partida: 3 rebatidas. Rebata para jogar de novo');
});

test('pelo teclado: Tab chega ao "Jogar" e o espaço rebate só com a Bola ao alcance', async ({ page }) => {
  await page.goto('/');
  await toTheEnd(page);
  await page.locator('.ticket').focus();
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
});
