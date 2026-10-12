import { test, expect } from './fixtures.js';

// Amostra o traço do rali e procura pontos dentro de caixas de texto visíveis. Fica de fora o que a bola
// atravessa por trás de propósito (Sous la Terre, a Histoire e o Face-à-face, que são opacos).
async function textCrossings(page) {
  return page.evaluate(() => {
    const path = document.querySelector('[data-rally-path]');
    const ctm = path.getScreenCTM();
    const length = path.getTotalLength();
    // o ingresso fica de fora: ele é o destino final do traço
    const texts = [...document.querySelectorAll('.rally h2, .rally p, .rally dt, .rally dd, .rally li, .rally figcaption')]
      .filter((el) => !el.closest('.soil, .histoire, .face'))
      .map((el) => ({ el, box: el.getBoundingClientRect() }));
    const hits = new Set();
    for (let at = 0; at <= length; at += 4) {
      const p = path.getPointAtLength(at).matrixTransform(ctm);
      for (const { el, box } of texts) {
        if (p.x > box.left + 2 && p.x < box.right - 2 && p.y > box.top + 2 && p.y < box.bottom - 2) {
          hits.add(`${el.tagName.toLowerCase()}: ${el.textContent.trim().slice(0, 40)}`);
        }
      }
    }
    return [...hits];
  });
}

for (const [name, viewport] of [['desktop', { width: 1440, height: 900 }], ['celular', { width: 390, height: 844 }]]) {
  test.describe(`no ${name}`, () => {
    test.use({ viewport, reducedMotion: 'reduce' });

    test('o traço da bola nunca atravessa um texto', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('load');
      expect(await textCrossings(page)).toEqual([]);
    });
  });
}

test('cada quique deixa uma marca no saibro, que fica depois que a bola passa', async ({ page }) => {
  await page.goto('/');
  const firstBounce = page.locator('.rally__bounce').first();
  await expect(firstBounce).toHaveCount(1);
  const scaleOf = () => firstBounce.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a);
  expect(await scaleOf()).toBe(0);

  await page.locator('#histoire').scrollIntoViewIfNeeded();
  // feita: o tranco passa, e ela assenta um pouco abaixo do tamanho cheio (afundou no saibro)
  await expect.poll(scaleOf, { timeout: 5000 }).toBeCloseTo(0.96, 2);
});

// a ponta do traço (onde a bola toca) segue o meio da tela; o quique só acontece quando ela chega ao contato
async function scrollTipTo(page, y) {
  await page.evaluate((target) => window.scrollTo(0, target - innerHeight / 2), y);
}

test('a marca não aparece antes da bola: logo acima do contato, ainda não há marca', async ({ page }) => {
  await page.goto('/');
  const bounce = page.locator('.rally__bounce').first();
  const y = await bounce.evaluate((el) => el.getBoundingClientRect().top + scrollY);
  const scaleOf = () => bounce.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a);

  await scrollTipTo(page, y - 30); // a bola a 30 px do saibro
  await page.waitForTimeout(1500);
  expect(await scaleOf()).toBe(0);

  await scrollTipTo(page, y + 30); // a bola tocou
  await expect.poll(scaleOf, { timeout: 3000 }).toBeGreaterThan(0.9);
});

test('as marcas voltam com a bola: rolando de volta ao topo, todas se desfazem', async ({ page }) => {
  await page.goto('/');
  await page.locator('#les-legendes').scrollIntoViewIfNeeded();
  const caption = page.locator('#terre-battue .mark__caption');
  const heroMark = page.locator('.mark--hero .mark__oval');
  const scaleOf = (locator) => locator.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a);
  await expect(caption).toHaveCSS('opacity', '1', { timeout: 5000 });
  const made = () =>
    page.locator('.rally__bounce').evaluateAll((els) => els.filter((el) => new DOMMatrix(getComputedStyle(el).transform).a > 0.01).length);
  await expect.poll(made, { timeout: 5000 }).toBeGreaterThan(1);
  expect(await scaleOf(heroMark)).toBeGreaterThan(0.9);

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(made, { timeout: 5000 }).toBe(0);
  await expect(caption).toHaveCSS('opacity', '0');
  // a Marca 01 do hero também: a bola voltou para a mão do jogador
  await expect.poll(() => scaleOf(heroMark), { timeout: 3000 }).toBe(0);
});

test('a marca se desfaz quando a bola volta para logo acima do contato', async ({ page }) => {
  await page.goto('/');
  const bounce = page.locator('.rally__bounce').first();
  const y = await bounce.evaluate((el) => el.getBoundingClientRect().top + scrollY);
  const scaleOf = () => bounce.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a);

  await scrollTipTo(page, y + 30); // a bola tocou
  await expect.poll(scaleOf, { timeout: 3000 }).toBeGreaterThan(0.9);

  await scrollTipTo(page, y - 30); // a bola voltou para 30 px acima do saibro
  await expect.poll(scaleOf, { timeout: 3000 }).toBe(0);
});

test.describe('quiques com prefers-reduced-motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('todas as marcas dos quiques já estão no saibro', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
    const scales = await page.locator('.rally__bounce').evaluateAll((els) => els.map((el) => new DOMMatrix(getComputedStyle(el).transform).a));
    expect(scales.length).toBeGreaterThan(3);
    expect(scales.every((s) => Math.abs(s - 0.96) < 0.001)).toBe(true);
  });
});

test('a bola quica por cima das marcas dos capítulos, sem sumir debaixo delas', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('load');
  const y = await page.evaluate(() => {
    const oval = document.querySelector('#terre-battue .mark__oval');
    return oval.getBoundingClientRect().top + scrollY + oval.offsetHeight / 2;
  });
  for (let s = 0; s < y - 450; s += 250) {
    await page.evaluate((v) => window.scrollTo(0, v), s);
    await page.waitForTimeout(30);
  }
  await page.evaluate((v) => window.scrollTo(0, v), y - 450 + 4);
  await page.waitForTimeout(1500);
  const top = await page.evaluate(() => {
    const r = document.querySelector('[data-rally-ball]').getBoundingClientRect();
    return document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2).matches('[data-rally-ball]');
  });
  expect(top).toBe(true);
});
