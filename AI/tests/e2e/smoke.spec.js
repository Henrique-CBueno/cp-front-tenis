import { test, expect } from './fixtures.js';

const OFFICIAL_TICKETS_URL = 'https://tickets.rolandgarros.com/';

test('a página carrega sem erros no console', async ({ page }) => {
  const errors = [];
  page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  expect(errors).toEqual([]);
});

test('o CTA "Garanta seu ingresso" leva à bilheteria oficial em nova aba', async ({ page }) => {
  await page.goto('/');
  const ctas = page.getByRole('link', { name: /garanta seu ingresso/i });

  await expect(ctas.first()).toBeVisible();
  for (const cta of await ctas.all()) {
    await expect(cta).toHaveAttribute('href', OFFICIAL_TICKETS_URL);
    await expect(cta).toHaveAttribute('target', '_blank');
    await expect(cta).toHaveAttribute('rel', /noopener/);
  }
});

test('o canvas do saque desenha quadros depois de rolar pela seção', async ({ page }) => {
  await page.goto('/');
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(800);

  const painted = await page.locator('[data-serve-canvas]').evaluate((canvas) => {
    const { data } = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    let opaque = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] > 0) opaque++;
    return opaque;
  });

  expect(painted).toBeGreaterThan(0);
});
