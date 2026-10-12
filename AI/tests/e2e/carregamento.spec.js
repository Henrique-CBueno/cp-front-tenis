import { test as base, expect } from '@playwright/test';

// estes testes olham a tela de carregamento em si, então usam o `page` cru (sem esperar ela sair)
const test = base;

test('a tela de carregamento cobre a página e trava o scroll até o essencial chegar', async ({ page }) => {
  await page.route('**/frames/**', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    await route.continue();
  });
  await page.goto('/');

  await expect(page.locator('[data-loader]')).toBeVisible();
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(200);
  expect(await page.evaluate(() => window.scrollY)).toBe(0);

  await expect(page.locator('[data-loader]')).toHaveCount(0, { timeout: 15000 });
  await expect(page.locator('html')).not.toHaveClass(/is-loading/);
  await page.mouse.wheel(0, 900);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
});

test('o contador chega a 100% antes de a tela sair', async ({ page }) => {
  await page.goto('/');
  const count = page.locator('[data-loader-count]');
  await expect(count).toHaveText('100', { timeout: 15000 });
});

test('com reduced-motion, a tela também sai e a página fica utilizável', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('[data-loader]')).toHaveCount(0, { timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await context.close();
});
