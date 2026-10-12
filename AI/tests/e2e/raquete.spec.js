import { test, expect } from './fixtures.js';

// o sweet spot da raquete na tela: o centro do aro (girar não muda o centro da caixa da elipse)
const spotOf = (page) =>
  page.locator('.racket__face').evaluate((el) => {
    const box = el.getBoundingClientRect();
    return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
  });

test('com mouse, o cursor vira raquete', async ({ page }) => {
  await page.goto('/');
  await page.mouse.move(400, 400);
  await expect(page.locator('[data-racket]')).toHaveCount(1);
  await expect(page.locator('[data-racket]')).toHaveCSS('opacity', '1');
  expect(await page.locator('body').evaluate((el) => getComputedStyle(el).cursor)).toBe('none');
});

test('o clique cai onde a raquete aponta, e ela fica de pé sobre o link', async ({ page }) => {
  await page.goto('/');
  const link = page.locator('.topnav a[href="#palmares"]');
  const box = await link.boundingBox();
  const target = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  await page.mouse.move(target.x - 120, target.y + 80);
  await page.mouse.move(target.x, target.y, { steps: 8 });

  await expect.poll(async () => {
    const spot = await spotOf(page);
    return Math.hypot(spot.x - target.x, spot.y - target.y);
  }).toBeLessThan(1.5);
  await expect(page.locator('[data-racket]')).toHaveClass(/is-ready/);
  // a raquete não rouba o clique: o elemento no ponto é o link
  expect(await page.evaluate(({ x, y }) => document.elementFromPoint(x, y).getAttribute('href'), target)).toBe('#palmares');

  await page.mouse.down();
  await page.mouse.up();
  await expect(page.locator('#titulo-palmares')).toBeInViewport({ timeout: 4000 });
});

test('fora dos links, a raquete volta à posição normal', async ({ page }) => {
  await page.goto('/');
  await page.mouse.move(700, 600);
  await expect(page.locator('[data-racket]')).not.toHaveClass(/is-ready/);
});

test('a raquete rebate a bola do rali, e a bola volta ao traço', async ({ page }) => {
  await page.goto('/');
  const top = await page.evaluate(() => document.querySelector('#palmares').getBoundingClientRect().top + scrollY);
  await page.evaluate((y) => window.scrollTo(0, y + 400), top);
  await page.mouse.move(5, 5);
  await page.waitForTimeout(2000); // a bola assenta e o pó dos quiques some

  const ball = page.locator('[data-rally-ball]');
  const before = await ball.boundingBox();
  await expect(page.locator('.rally__dust')).toHaveCount(0);

  await page.mouse.move(before.x + before.width / 2, before.y + before.height / 2, { steps: 6 });
  await expect.poll(async () => (await ball.boundingBox()).y, { timeout: 2000 }).toBeLessThan(before.y - 20);
  expect(await page.locator('.rally__dust').count()).toBeGreaterThan(0);

  await page.mouse.move(5, 5);
  await expect.poll(async () => Math.abs((await ball.boundingBox()).y - before.y), { timeout: 3000 }).toBeLessThan(1);
});

test.describe('com toque', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test('não há raquete: fica o toque normal', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-racket]')).toHaveCount(0);
  });
});

test.describe('com prefers-reduced-motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('não há raquete: fica o cursor do sistema', async ({ page }) => {
    await page.goto('/');
    await page.mouse.move(400, 400);
    await expect(page.locator('[data-racket]')).toHaveCount(0);
    expect(await page.locator('body').evaluate((el) => getComputedStyle(el).cursor)).not.toBe('none');
  });
});

test('o foco por teclado continua visível com a raquete', async ({ page }) => {
  await page.goto('/');
  await page.mouse.move(400, 400);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
  expect(outline).not.toBe('none');
});
