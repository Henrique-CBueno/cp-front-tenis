// Mede o tempo entre quadros durante o scroll do hero, com a CPU 4x mais lenta (celular médio).
// Uso: npm run build && npm run preview, e em outro terminal: node tools/medicoes/fluidez.mjs
import { chromium } from '@playwright/test';
const b = await chromium.launch();
for (const [name, viewport, mobile] of [['mobile', { width: 390, height: 844 }, true], ['desktop', { width: 1440, height: 900 }, false]]) {
  const ctx = await b.newContext({ viewport, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await page.goto('http://localhost:4173/');
  await page.waitForLoadState('networkidle');
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const result = await page.evaluate(async () => {
    const times = [];
    let last = performance.now();
    let running = true;
    const tick = (t) => { times.push(t - last); last = t; if (running) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
    const total = innerHeight * 1.8;
    for (let i = 0; i <= 120; i++) { window.scrollTo(0, (total * i) / 120); await new Promise((r) => setTimeout(r, 16)); }
    running = false;
    times.sort((a, b) => a - b);
    const p = (q) => times[Math.floor(times.length * q)].toFixed(1);
    return { frames: times.length, mediana: p(0.5), p95: p(0.95), acima50ms: times.filter((t) => t > 50).length };
  });
  console.log(name, 'CPU 4x', JSON.stringify(result));
  await ctx.close();
}
await b.close();
