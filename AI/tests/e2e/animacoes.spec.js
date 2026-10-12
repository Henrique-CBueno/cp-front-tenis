import { test, expect } from '@playwright/test';

const shiftOf = (page, i = 0) =>
  page.locator('[data-marquee-track]').nth(i).evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);

test('os títulos se revelam letra a letra, mas o leitor de tela lê a palavra inteira', async ({ page }) => {
  await page.goto('/');
  const title = page.locator('#titulo-palmares');
  await expect(page.getByRole('heading', { name: 'Palmarès', level: 2 })).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Jeu, Set et Match', level: 2 })).toHaveCount(1);
  await expect(title.locator('.title__letter')).toHaveCount('Palmarès'.length);
  expect(await title.locator('.title__word').evaluateAll((els) => els.every((el) => el.getAttribute('aria-hidden') === 'true'))).toBe(true);

  const last = title.locator('.title__letter').last();
  expect(Number(await last.evaluate((el) => getComputedStyle(el).opacity))).toBeLessThan(1);
  await title.scrollIntoViewIfNeeded();
  await expect(last).toHaveCSS('opacity', '1', { timeout: 4000 });
});

test('o marquee corre sozinho e inverte o sentido quando a página sobe', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-marquee]').first().scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(500);
  const a = await shiftOf(page);
  await page.waitForTimeout(400);
  const b = await shiftOf(page);
  const down = Math.sign(b - a);
  expect(down).not.toBe(0);

  await page.mouse.wheel(0, -400);
  await page.waitForTimeout(500);
  const c = await shiftOf(page);
  await page.waitForTimeout(400);
  const d = await shiftOf(page);
  expect(Math.sign(d - c)).toBe(-down);
});

test('as duas faixas correm em sentidos opostos', async ({ page }) => {
  await page.goto('/');
  const [a0, b0] = [await shiftOf(page, 0), await shiftOf(page, 1)];
  await page.waitForTimeout(500);
  const [a1, b1] = [await shiftOf(page, 0), await shiftOf(page, 1)];
  expect(Math.sign(a1 - a0)).toBe(-Math.sign(b1 - b0));
});

test.describe('com prefers-reduced-motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('o marquee fica parado e os títulos aparecem prontos', async ({ page }) => {
    await page.goto('/');
    const a = await shiftOf(page);
    await page.waitForTimeout(500);
    expect(await shiftOf(page)).toBe(a);
    await expect(page.locator('.title__letter')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Palmarès', level: 2 })).toHaveCount(1);
  });
});
