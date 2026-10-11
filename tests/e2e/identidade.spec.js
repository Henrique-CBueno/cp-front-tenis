import { test, expect } from '@playwright/test';

test('o rodapé é compacto: no máximo 40% da altura da tela', async ({ page }) => {
  await page.goto('/');
  const height = await page.locator('footer').evaluate((el) => el.offsetHeight);
  expect(height).toBeLessThanOrEqual(900 * 0.4);
});

test('o rodapé leva à página de créditos, que tem todos os créditos e as fontes', async ({ page }) => {
  await page.goto('/');
  await page.locator('footer a[href="/creditos.html"]').click();
  await expect(page).toHaveURL(/creditos\.html$/);
  await expect(page.getByRole('heading', { name: 'Créditos e fontes', level: 1 })).toBeVisible();
  const text = await page.locator('main').textContent();
  for (const needle of ['Wikimedia Commons', 'Pexels', 'Mixkit', 'Anybody', 'Logo de Roland-Garros', 'Fontes dos fatos']) {
    expect(text).toContain(needle);
  }
  await expect(page.locator('main a[href*="creativecommons.org"]').first()).toBeVisible();
});

test('o logo oficial aparece no topo e no rodapé, com alt, ao lado do aviso de tributo', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.topbar .brand__logo')).toHaveAttribute('alt', 'Roland-Garros');
  await expect(page.locator('footer .brand__logo')).toHaveAttribute('alt', 'Roland-Garros');
  await expect(page.locator('.topbar .brand__tag')).toHaveText('tributo de fã');
  await expect(page.locator('.footer__disclaimer')).toContainText('sem vínculo', { ignoreCase: true });
});

test('favicon, ícone de celular, manifest e cartão de compartilhamento existem', async ({ page, request }) => {
  await page.goto('/');
  for (const selector of ['link[rel="icon"][type="image/svg+xml"]', 'link[rel="apple-touch-icon"]', 'link[rel="manifest"]']) {
    const href = await page.locator(selector).getAttribute('href');
    expect((await request.get(href)).status(), href).toBe(200);
  }
  const og = await page.locator('meta[property="og:image"]').getAttribute('content');
  expect((await request.get(og)).status()).toBe(200);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /La Trace/);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
});
