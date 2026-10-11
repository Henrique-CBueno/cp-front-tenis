import { test, expect } from '@playwright/test';

// A geometria do pin (como em sous-la-terre.js): começa com a marca do tijolo no meio da tela;
// pouso (0,3 tela), escavação (4 telas), pausa (0,2), o corte (1) e o salto (0,4).
const pinOf = (page) =>
  page.evaluate(() => {
    const sec = document.querySelector('#sous-la-terre');
    const mark = sec.querySelector('[data-soil-mark]');
    let y = mark.offsetHeight / 2;
    for (let n = mark; n && n !== sec; n = n.offsetParent) y += n.offsetTop;
    const top = sec.parentElement.getBoundingClientRect().top + scrollY;
    return { start: top + y - innerHeight / 2, h: sec.clientHeight };
  });

async function glideTo(page, y) {
  const from = await page.evaluate(() => scrollY);
  for (let i = 1; i <= 10; i++) {
    await page.evaluate((v) => window.scrollTo(0, v), from + ((y - from) * i) / 10);
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(700);
}

// bolas à vista: a do rali quando não está escondida atrás da cena; a da cena quando está dentro dela
const visibleBalls = (page) =>
  page.evaluate(() => {
    const sec = document.querySelector('#sous-la-terre').getBoundingClientRect();
    const center = (el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };
    const shown = (el) => getComputedStyle(el).opacity !== '0';
    const inside = (c) => c.y > sec.top && c.y < sec.bottom;
    const onScreen = (c) => c.y > 0 && c.y < innerHeight;
    const [rally, docked] = [document.querySelector('[data-rally-ball]'), document.querySelector('[data-soil-ball]')];
    const [r, d] = [center(rally), center(docked)];
    return (shown(rally) && onScreen(r) && !inside(r) ? 1 : 0) + (shown(docked) && onScreen(d) && inside(d) ? 1 : 0);
  });

const depth = (page) => page.locator('[data-soil-depth]').textContent();

test('Sous la Terre: o scroll cava as camadas e o medidor conta a profundidade real até 80 cm', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('load');
  const { start, h } = await pinOf(page);
  await glideTo(page, start + h * 0.15);
  expect(await depth(page)).toBe('0 cm');
  await glideTo(page, start + h * (0.3 + 2)); // no meio da escavação: o clínquer
  expect(await depth(page)).toBe('11 cm');
  await expect(page.locator('.soil__layer--clinquer h3')).toBeInViewport({ ratio: 1 });
  await glideTo(page, start + h * (0.3 + 4 + 0.1)); // no fundo
  expect(await depth(page)).toBe('80 cm');
  await expect(page.locator('.soil__layer--pedras h3')).toBeInViewport({ ratio: 1 });
});

test('Sous la Terre: no fim, a câmera se afasta e mostra o corte inteiro em escala', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('load');
  const { start, h } = await pinOf(page);
  await glideTo(page, start + h * (0.3 + 4 + 0.2 + 1));
  await expect(page.locator('[data-soil-cut]')).toHaveCSS('opacity', '1');
  const share = await page.evaluate(() => {
    const bands = [...document.querySelectorAll('.soil__band')].map((b) => b.getBoundingClientRect().height);
    const total = bands.reduce((a, b) => a + b, 0);
    return { tijolo: bands[0] / total, pedras: bands[4] / total };
  });
  expect(share.pedras).toBeCloseTo(35 / 80, 1);
  expect(share.tijolo).toBeLessThan(0.01); // o tijolo é só um fio
});

for (const [name, viewport, extra] of [
  ['desktop', { width: 1440, height: 900 }, {}],
  ['celular', { width: 390, height: 844 }, { hasTouch: true, isMobile: true }],
]) {
  test.describe(`Sous la Terre no ${name}`, () => {
    test.use({ viewport, ...extra });

    test('uma bola só: pousa no tijolo, some com a superfície, volta no corte e sai saltando', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('load');
      const { start, h } = await pinOf(page);
      for (const x of [-0.5, -0.15, 0.15, 0.3 + 4 + 0.2 + 1, 0.3 + 4 + 0.2 + 1 + 0.2, 6.1 + 0.4]) {
        await glideTo(page, start + h * x);
        expect(await visibleBalls(page), `posição ${x}`).toBe(1);
      }
    });
  });
}

test.describe('Sous la Terre com prefers-reduced-motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('sem pin: as camadas empilhadas, cada uma com o texto, e o corte no fim', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
    expect(await page.locator('#sous-la-terre').evaluate((el) => el.parentElement.classList.contains('pin-spacer'))).toBe(false);
    await expect(page.locator('.soil__layer h3')).toHaveCount(5);
    const [layers, cut] = await page.evaluate(() => [
      document.querySelector('.soil__layers').offsetHeight,
      getComputedStyle(document.querySelector('[data-soil-cut]')).opacity,
    ]);
    expect(layers).toBeGreaterThan(900 * 3);
    expect(cut).toBe('1');
  });
});

test('Sous la Terre ocupa a tela inteira enquanto cava: nada da próxima seção aparece embaixo', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('load');
  const { start, h } = await pinOf(page);
  for (const x of [0.05, 1.3, 3.3]) {
    await glideTo(page, start + h * x);
    const [top, below] = await page.evaluate(() => {
      const r = document.querySelector('#sous-la-terre').getBoundingClientRect();
      return [r.top, innerHeight - r.bottom];
    });
    expect(Math.abs(top)).toBeLessThan(1);
    expect(below).toBeLessThan(1);
  }
});
