import { test, expect } from '@playwright/test';

test('a linha do tempo corre na horizontal enquanto a seção Histoire está presa', async ({ page }) => {
  await page.goto('/');
  const track = page.locator('[data-timeline-track]');
  const shift = () => track.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);

  await page.locator('#histoire').scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, 900);
  await expect.poll(shift, { timeout: 4000 }).toBeLessThan(-100);
});

test('os números do placar terminam no valor certo', async ({ page }) => {
  await page.goto('/');
  await page.locator('#numeros').scrollIntoViewIfNeeded();
  await page.locator('[data-count="727500"]').scrollIntoViewIfNeeded();

  await expect(page.locator('[data-count="727500"]')).toHaveText('727.500', { timeout: 4000 });
  await expect(page.locator('[data-count="1891"]')).toHaveText('1891', { timeout: 4000 });
});

test.describe('com prefers-reduced-motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('a linha do tempo não prende a página e os números já aparecem prontos', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-count="727500"]')).toHaveText('727.500');
    await expect(page.locator('.pin-spacer')).toHaveCount(0);
  });
});

test.describe('no celular', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('a linha do tempo fica de pé, sem pin', async ({ page }) => {
    await page.goto('/');
    const direction = await page.locator('[data-timeline-track]').evaluate((el) => getComputedStyle(el).flexDirection);
    expect(direction).toBe('column');
  });
});

test('a bola não some na Histoire: quica sobre a linha do tempo durante o pin', async ({ page }) => {
  await page.goto('/');
  await page.locator('#histoire').scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, 600);
  const ball = page.locator('[data-timeline-ball]');
  await expect(ball).toHaveCSS('opacity', '1', { timeout: 4000 });
  await expect(ball).toBeInViewport();
});

test('Face-à-face: ao fim do encontro, os dois estão em cor e os títulos são 3 e 14', async ({ page }) => {
  await page.goto('/');
  const top = await page.evaluate(() => document.querySelector('#face-a-face').getBoundingClientRect().top + scrollY);
  await page.evaluate((y) => window.scrollTo(0, y), top + 900 * 2.4);

  const colorOf = (sel) => page.locator(sel).evaluate((img) => getComputedStyle(img).filter);
  await expect.poll(() => colorOf('.face__player--guga img'), { timeout: 4000 }).toContain('grayscale(0)');
  await expect.poll(() => colorOf('.face__player--nadal img'), { timeout: 4000 }).toContain('grayscale(0)');
  await expect(page.locator('[data-face-count="3"]')).toHaveText('3');
  await expect(page.locator('[data-face-count="14"]')).toHaveText('14');
  await expect(page.locator('.face__line')).toHaveCSS('opacity', '1');
});

test('Face-à-face: no começo, os dois entram em tom de saibro', async ({ page }) => {
  await page.goto('/');
  const top = await page.evaluate(() => document.querySelector('#face-a-face').getBoundingClientRect().top + scrollY);
  await page.evaluate((y) => window.scrollTo(0, y + 200), top);
  await expect
    .poll(() => page.locator('.face__player--guga img').evaluate((img) => getComputedStyle(img).filter), { timeout: 4000 })
    .toContain('grayscale(1)');
});

test.describe('Face-à-face com prefers-reduced-motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('mostra direto o encontro: em cor, 3 e 14 e a frase', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-face-count="14"]')).toHaveText('14');
    const filter = await page.locator('.face__player--nadal img').evaluate((img) => getComputedStyle(img).filter);
    expect(filter).toBe('none');
    await expect(page.locator('.face__line')).toHaveCSS('opacity', '1');
  });
});

// Quantas bolas estão à vista: a do rali conta quando não está escondida atrás da Histoire (opaca);
// a da Histoire conta quando está dentro dela.
const visibleBalls = (page) =>
  page.evaluate(() => {
    const sec = document.querySelector('#histoire').getBoundingClientRect();
    const center = (el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };
    const shown = (el) => getComputedStyle(el).opacity !== '0';
    const inside = (c) => c.y > sec.top && c.y < sec.bottom;
    const onScreen = (c) => c.y > 0 && c.y < innerHeight;
    const rally = document.querySelector('[data-rally-ball]');
    const docked = document.querySelector('[data-timeline-ball]');
    const r = center(rally);
    const d = center(docked);
    return (shown(rally) && onScreen(r) && !inside(r) ? 1 : 0) + (shown(docked) && onScreen(d) && inside(d) ? 1 : 0);
  });

// a geometria do pin: onde ele começa e termina (a ponta do traço fica no meio da tela)
const pinOf = (page) =>
  page.evaluate(() => {
    const sec = document.querySelector('#histoire');
    const spacer = sec.parentElement;
    const top = spacer.getBoundingClientRect().top + scrollY;
    const dot = sec.querySelector('.timeline__dot');
    let y = 0;
    for (let n = dot; n && n !== sec; n = n.offsetParent) y += n.offsetTop;
    // o pin começa com a bola 60 px acima da linha, à direita da frase
    const start = top + y - 60 - innerHeight / 2;
    // as fases do pin (em extras.js): voo até 1891, espera, linha correndo, espera, salto para fora
    const vh = innerHeight;
    return { start, end: start + spacer.offsetHeight - sec.offsetHeight, glide: vh * 0.45, hold: vh * 0.2, leap: vh * 0.45 };
  });

async function glideTo(page, y) {
  const from = await page.evaluate(() => scrollY);
  for (let i = 1; i <= 10; i++) {
    await page.evaluate((v) => window.scrollTo(0, v), from + ((y - from) * i) / 10);
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(700);
}

const ballOnDot = (page, index) =>
  page.evaluate((i) => {
    const dots = [...document.querySelectorAll('.timeline__dot')];
    const dot = dots.at(i).getBoundingClientRect();
    const ball = document.querySelector('[data-timeline-ball]').getBoundingClientRect();
    return Math.hypot(dot.left + dot.width / 2 - (ball.left + ball.width / 2), dot.top + dot.height / 2 - (ball.top + ball.height / 2));
  }, index);

test('Histoire: uma bola só do começo ao fim; ela espera na 1ª data e na última', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('load');
  const pin = await pinOf(page);
  for (const y of [pin.start - 900, pin.start - 400, pin.start - 150]) {
    await glideTo(page, y);
    expect(await visibleBalls(page)).toBe(1);
  }
  await glideTo(page, pin.start + pin.glide * 0.5); // planando até 1891
  expect(await visibleBalls(page)).toBe(1);
  await glideTo(page, pin.start + pin.glide + pin.hold * 0.5); // pousou e espera
  expect(await visibleBalls(page)).toBe(1);
  expect(await ballOnDot(page, 0)).toBeLessThan(14);
  for (const f of [0.3, 0.6]) {
    await glideTo(page, pin.start + (pin.end - pin.start) * f);
    expect(await visibleBalls(page)).toBe(1);
  }
  await glideTo(page, pin.end - pin.leap - pin.hold * 0.5); // espera em 2020
  expect(await visibleBalls(page)).toBe(1);
  expect(await ballOnDot(page, -1)).toBeLessThan(14);
  await glideTo(page, pin.end - pin.leap * 0.5); // saltando para fora da linha
  expect(await visibleBalls(page)).toBe(1);
  for (const y of [pin.end + 200, pin.end + 700]) {
    await glideTo(page, y);
    expect(await visibleBalls(page)).toBe(1);
  }
});

// pontos do traço desenhado sobre a Histoire que caem dentro de um texto dela
const overlayCrossings = (page, which) =>
  page.evaluate((w) => {
    const sec = document.querySelector('#histoire');
    // a ordem dos caminhos: entrada, saída, os arcos dos pulos e, no desktop, o voo até 1891 e o salto de 2020
    const paths = [...sec.querySelectorAll('.histoire__trace path')];
    const pick = { entrada: 0, saida: 1, voo: paths.length - 2, salto: paths.length - 1 };
    const path = paths[pick[w]];
    const dash = getComputedStyle(path).strokeDasharray.split(',').map(parseFloat);
    const [from, to] = w === 'saida' ? [dash[1], dash[1] + dash[2]] : [0, dash[0]];
    const ctm = path.getScreenCTM();
    const box = sec.getBoundingClientRect();
    // as linhas de texto de verdade (um bloco pode ocupar a largura toda com o texto só de um lado)
    const texts = [...sec.querySelectorAll('h2, p, time')].flatMap((el) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      return [...range.getClientRects()].map((r) => ({ el, r }));
    });
    const hits = new Set();
    for (let at = from; at <= to; at += 3) {
      const p = path.getPointAtLength(at).matrixTransform(ctm);
      if (p.y < box.top || p.y > box.bottom) continue;
      for (const { el, r } of texts) {
        if (p.x > r.left + 2 && p.x < r.right - 2 && p.y > r.top + 2 && p.y < r.bottom - 2) hits.add(el.textContent.trim().slice(0, 30));
      }
    }
    return { drawn: to - from, hits: [...hits] };
  }, which);

test('Histoire: o traço desenhado sobre a cena nunca cruza um texto (entrada e saída)', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('load');
  const pin = await pinOf(page);
  await glideTo(page, pin.start + pin.glide + 10);
  for (const which of ['entrada', 'voo']) {
    const { drawn, hits } = await overlayCrossings(page, which);
    expect(drawn).toBeGreaterThan(50);
    expect(hits).toEqual([]);
  }
  await glideTo(page, pin.end + 900);
  for (const which of ['saida', 'salto']) {
    const { drawn, hits } = await overlayCrossings(page, which);
    expect(drawn).toBeGreaterThan(50);
    expect(hits).toEqual([]);
  }
});

test.describe('Histoire no celular', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test('uma bola só, descendo de data em data, e o traço sem cruzar texto', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
    const g = await page.evaluate(() => {
      const sec = document.querySelector('#histoire');
      const top = sec.getBoundingClientRect().top + scrollY;
      return { top, bottom: top + sec.offsetHeight };
    });
    for (let y = g.top - 600; y <= g.bottom + 300; y += 250) {
      await glideTo(page, y - 422);
      expect(await visibleBalls(page)).toBe(1);
    }
    for (const which of ['entrada', 'saida']) {
      const { drawn, hits } = await overlayCrossings(page, which);
      expect(drawn).toBeGreaterThan(30);
      expect(hits).toEqual([]);
    }
  });
});
