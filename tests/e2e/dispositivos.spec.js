import { test, expect } from '@playwright/test';

function framesRequested(page) {
  const urls = [];
  page.on('request', (request) => {
    const { pathname } = new URL(request.url());
    if (pathname.startsWith('/frames/')) urls.push(pathname);
  });
  return urls;
}

test.describe('no celular', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test('só baixa o conjunto de quadros mobile', async ({ page }) => {
    const frames = framesRequested(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(frames.length).toBeGreaterThan(0);
    expect(frames.every((url) => url.startsWith('/frames/mobile/'))).toBe(true);
  });

  test('não tem scroll horizontal', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe('com prefers-reduced-motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('mostra só o quadro estático do saque, já desenhado', async ({ page }) => {
    const frames = framesRequested(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(frames).toEqual(['/frames/static/impacto.webp']);
    const painted = await page.locator('[data-serve-canvas]').evaluate((canvas) => {
      const { data } = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
      return data.some((value, i) => i % 4 === 3 && value > 0);
    });
    expect(painted).toBe(true);
  });

  test('não prende a seção do saque nem exige rolar para ver a marca', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('.mark--hero .mark__caption')).toHaveCSS('opacity', '1');
    const pinned = await page.locator('.pin-spacer').count();
    expect(pinned).toBe(0);
  });
});
