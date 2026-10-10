import { test, expect } from '@playwright/test';

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
