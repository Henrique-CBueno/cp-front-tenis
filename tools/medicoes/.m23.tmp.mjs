import { chromium } from '@playwright/test';
const out = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await p.goto('http://localhost:4173/'); await p.waitForLoadState('networkidle');
const g = await p.evaluate(() => { const s = document.querySelector('#histoire'); const top = s.getBoundingClientRect().top + scrollY; const dots = [...s.querySelectorAll('.timeline__dot')].map((d) => d.getBoundingClientRect().top + scrollY + d.offsetHeight / 2); return { top, bottom: top + s.offsetHeight, first: dots[0], last: dots[dots.length - 1] }; });
// a ponta do traço fica no meio da tela: rolar para scrollY = alvo - 422
const targets = [['antes', g.top - 200], ['entrando', g.top + 120], ['quase-1a', g.first - 40], ['1a-data', g.first + 5], ['meio', (g.first + g.last) / 2], ['ultima', g.last + 5], ['saindo', g.last + 120], ['depois', g.bottom + 150]];
for (let y = 0; y < targets[0][1] - 422; y += 300) { await p.evaluate((v) => scrollTo(0, v), y); await p.waitForTimeout(30); }
let k = 0;
for (const [name, t] of targets) {
  const cur = await p.evaluate(() => scrollY); const y = t - 422;
  for (let i = 1; i <= 8; i++) { await p.evaluate((v) => scrollTo(0, v), cur + ((y - cur) * i) / 8); await p.waitForTimeout(30); }
  await p.waitForTimeout(900);
  const balls = await p.evaluate(() => { const sec = document.querySelector('#histoire').getBoundingClientRect(); const vis = (el) => getComputedStyle(el).opacity !== '0'; const rb = document.querySelector('[data-rally-ball]').getBoundingClientRect(); const rally = vis(document.querySelector('[data-rally-ball]')) && !(rb.top > sec.top && rb.bottom < sec.bottom) && rb.bottom > 0 && rb.top < innerHeight; const tb = document.querySelector('[data-timeline-ball]'); const tr = tb.getBoundingClientRect(); const tl = vis(tb) && tr.top > sec.top - 5 && tr.bottom < sec.bottom + 5; return { rally, timeline: tl }; });
  console.log(name, JSON.stringify(balls));
  await p.screenshot({ path: `${out}/mobile-${String(k++).padStart(2, '0')}-${name}.png` });
}
await b.close();
