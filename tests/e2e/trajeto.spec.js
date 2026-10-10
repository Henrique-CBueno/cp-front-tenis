import { test, expect } from '@playwright/test';

// Amostra o traço do rali e procura pontos dentro de caixas de texto visíveis. Fica de fora o que a bola
// atravessa por trás de propósito (as camadas da quadra, a Histoire e o Face-à-face, que são opacos).
async function textCrossings(page) {
  return page.evaluate(() => {
    const path = document.querySelector('[data-rally-path]');
    const ctm = path.getScreenCTM();
    const length = path.getTotalLength();
    // o ingresso fica de fora: ele é o destino final do traço
    const texts = [...document.querySelectorAll('.rally h2, .rally p, .rally dt, .rally dd, .rally li, .rally figcaption')]
      .filter((el) => !el.closest('.strata, .histoire, .face'))
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
  await expect.poll(scaleOf, { timeout: 4000 }).toBe(1);
});

test.describe('quiques com prefers-reduced-motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('todas as marcas dos quiques já estão no saibro', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
    const scales = await page.locator('.rally__bounce').evaluateAll((els) => els.map((el) => new DOMMatrix(getComputedStyle(el).transform).a));
    expect(scales.length).toBeGreaterThan(3);
    expect(scales.every((s) => s === 1)).toBe(true);
  });
});
