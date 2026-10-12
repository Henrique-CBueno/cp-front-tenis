import { test, expect } from './fixtures.js';

const mur = (page) =>
  page.evaluate(() => {
    const section = document.querySelector('[data-mur]');
    const el = document.querySelector('[data-mur-ball]');
    const box = el.getBoundingClientRect();
    return {
      phase: section.dataset.phase,
      score: Number(section.dataset.score ?? 0),
      errors: Number(section.dataset.errors ?? 0),
      ball: { x: box.x + box.width / 2, y: box.y + box.height / 2 },
      visible: getComputedStyle(el).opacity !== '0',
    };
  });

async function toTheEnd(page) {
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect.poll(async () => (await mur(page)).phase, { timeout: 8000 }).toBe('idle');
}

// a raquete persegue a bola até as cordas encostarem nela com a bola descendo (e a rebatida contar)
async function rebater(page) {
  const before = (await mur(page)).score;
  for (let i = 0; i < 200; i++) {
    const { ball, score } = await mur(page);
    if (score !== before) return;
    await page.mouse.move(ball.x, ball.y);
    await page.waitForTimeout(20);
  }
  throw new Error('a raquete não conseguiu rebater');
}

test('a Bola chega ao Le Mur depois que o traço termina no ingresso', async ({ page }) => {
  await page.goto('/');
  await toTheEnd(page);
  const state = await mur(page);
  expect(state.visible).toBe(true);
  const court = await page.locator('[data-mur-court]').boundingBox();
  expect(state.ball.y).toBeGreaterThan(court.y);
  expect(state.ball.y).toBeLessThan(court.y + court.height);
  // uma Bola só: a do rali já não aparece
  expect(await page.locator('[data-rally-ball]').evaluate((el) => getComputedStyle(el).opacity)).toBe('0');
  await expect(page.locator('[data-mur-status]')).toHaveText('Rebata para começar');
});

test('uma passada da raquete pela Bola conta 1 rebatida e começa a partida', async ({ page }) => {
  await page.goto('/');
  await toTheEnd(page);
  await rebater(page);
  expect(await mur(page)).toMatchObject({ phase: 'playing', score: 1, errors: 0 });
});

test('rebater e deixar cair três vezes encerra a partida com o placar', async ({ page }) => {
  await page.goto('/');
  await toTheEnd(page);
  for (let i = 1; i <= 3; i++) {
    await rebater(page);
    await page.mouse.move(5, 5);
    await expect.poll(async () => (await mur(page)).errors, { timeout: 5000 }).toBe(i);
  }
  expect(await mur(page)).toMatchObject({ phase: 'over', score: 3 });
  await expect(page.locator('[data-mur-status]')).toHaveText('Fim de partida: 3 rebatidas. Rebata para jogar de novo');
});

test.describe('com prefers-reduced-motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('o Le Mur fica parado, com o aviso', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-mur-status]')).toHaveText('O jogo aparece com as animações ligadas');
  });
});
