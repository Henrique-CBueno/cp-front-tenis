import { test, expect } from '@playwright/test';

// a foto está revelada quando a máscara da onda subiu (posição 60%) e ela saiu do tom de saibro
const revealed = (card) =>
  card.locator('.champion__photo').evaluate((img) => {
    const style = getComputedStyle(img);
    return (style.maskPosition || style.webkitMaskPosition).includes('60%') && style.filter.includes('grayscale(0)');
  });

test('o Palmarès é uma lista em ordem cronológica, com ano, nome, troféu e foto descrita', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('#palmares ol > li .champion');
  await expect(cards).toHaveCount(8);
  const years = await page.locator('.champion__year').allTextContents();
  expect(years).toEqual([...years].sort());
  for (const alt of await page.locator('.champion__photo').evaluateAll((imgs) => imgs.map((img) => img.alt))) {
    expect(alt.length).toBeGreaterThan(20);
  }
  await expect(page.locator('.topnav a[href="#palmares"]')).toHaveCount(1);
});

test('no desktop, o hover revela a foto do campeão', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('.champion').nth(3);
  await card.scrollIntoViewIfNeeded();
  expect(await revealed(card)).toBe(false);
  await card.hover();
  await expect.poll(() => revealed(card), { timeout: 3000 }).toBe(true);
});

test('o foco pelo teclado revela a foto como o hover', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('.champion').first();
  await card.scrollIntoViewIfNeeded();
  await card.focus();
  await expect.poll(() => revealed(card), { timeout: 3000 }).toBe(true);
});

test.describe('no celular', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test('o toque revela a foto', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('.champion').nth(2);
    // no alto da tela, fora da faixa do meio: só o toque abre
    await card.evaluate((el) => el.scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(300);
    expect(await revealed(card)).toBe(false);
    await card.tap();
    await expect.poll(() => revealed(card), { timeout: 3000 }).toBe(true);
  });

  test('o card no meio da tela revela a foto sozinho', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('.champion').nth(5);
    await card.evaluate((el) => el.scrollIntoView({ block: 'center' }));
    await expect.poll(() => revealed(card), { timeout: 3000 }).toBe(true);
  });

  test('vira lista: um card por linha', async ({ page }) => {
    await page.goto('/');
    const lefts = await page.locator('.champion').evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().left)));
    expect(new Set(lefts).size).toBe(1);
  });
});

test('no desktop, os campeões ficam dos dois lados de um vão central, por onde a bola desce', async ({ page }) => {
  await page.goto('/');
  const lefts = await page.locator('.champion').evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().left)));
  expect(new Set(lefts).size).toBe(2);
  const lane = await page.locator('#palmares [data-lane]').boundingBox();
  expect(Math.abs(lane.x + lane.width / 2 - 1440 / 2)).toBeLessThan(2);
});
