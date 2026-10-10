import { test, expect } from '@playwright/test';

// Amostra o traço do rali e procura pontos dentro de caixas de texto visíveis. Fica de fora o que a bola
// atravessa por trás de propósito (as camadas da quadra e a Histoire, que são opacas).
async function textCrossings(page) {
  return page.evaluate(() => {
    const path = document.querySelector('[data-rally-path]');
    const ctm = path.getScreenCTM();
    const length = path.getTotalLength();
    // o ingresso fica de fora: ele é o destino final do traço
    const texts = [...document.querySelectorAll('.rally h2, .rally p, .rally dt, .rally dd, .rally li, .rally figcaption')]
      .filter((el) => !el.closest('.strata, .histoire'))
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
