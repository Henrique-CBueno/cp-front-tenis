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
