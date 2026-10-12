import { test, expect } from './fixtures.js';

test('a navegação leva até a seção escolhida', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Seções' }).getByRole('link', { name: 'Les Légendes' }).click();

  // o caminho até Les Légendes passa por duas cenas presas (Sous la Terre e a Histoire): com a suíte inteira
  // rodando em paralelo, a rolagem suave pode passar de 4 s
  await expect(page.getByRole('heading', { name: 'Les Légendes' })).toBeInViewport({ timeout: 8000 });
});

test('a navegação funciona pelo teclado, com foco visível', async ({ page }) => {
  await page.goto('/');
  const link = page.getByRole('navigation', { name: 'Seções' }).getByRole('link', { name: 'Terre Battue' });
  await link.focus();

  await expect(link).toBeFocused();
  await expect(link).not.toHaveCSS('outline-style', 'none');

  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Terre Battue' })).toBeInViewport({ timeout: 4000 });
});

test('cada marca afunda no saibro quando o traço chega até ela', async ({ page }) => {
  await page.goto('/');
  const caption = page.locator('#terre-battue .mark__caption');
  await expect(caption).toHaveCSS('opacity', '0');

  await page.getByRole('heading', { name: 'Terre Battue' }).scrollIntoViewIfNeeded();
  await expect(caption).toHaveCSS('opacity', '1', { timeout: 4000 });
});

test('o coração do Guga é desenhado conforme a seção passa pela tela', async ({ page }) => {
  await page.goto('/');
  const heart = page.locator('[data-heart-path]');
  const offset = () => heart.evaluate((path) => parseFloat(getComputedStyle(path).strokeDashoffset));

  expect(await offset()).toBeGreaterThan(100);
  await page.locator('#titulo-guga').scrollIntoViewIfNeeded();
  await expect.poll(offset, { timeout: 4000 }).toBeLessThan(5);
});

test.describe('com prefers-reduced-motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('o traço já está completo e todas as marcas visíveis', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');

    for (const caption of await page.locator('[data-chapter-mark] .mark__caption').all()) {
      await expect(caption).toHaveCSS('opacity', '1');
    }
    const offset = await page.locator('[data-rally-path]').evaluate((path) => parseFloat(path.style.strokeDashoffset));
    expect(offset).toBeCloseTo(0, 0);
  });

  test('o coração do Guga já aparece completo', async ({ page }) => {
    await page.goto('/');
    const offset = await page.locator('[data-heart-path]').evaluate((path) => parseFloat(getComputedStyle(path).strokeDashoffset));
    expect(offset).toBe(0);
  });
});
