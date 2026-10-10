import { chromium } from '@playwright/test';
const out = process.argv[2];
const [w, h, tag] = [Number(process.argv[3]), Number(process.argv[4]), process.argv[5]];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: w, height: h } });
const errors = []; p.on('pageerror', (e) => errors.push(e.message));
await p.goto('http://localhost:4173/'); await p.waitForLoadState('networkidle');
const info = await p.evaluate(() => { const s = document.querySelector('#histoire'); const sp = s.parentElement; return { top: sp.getBoundingClientRect().top + scrollY, h: sp.offsetHeight }; });
const shots = [-500, -250, -60, 0, 0.25, 0.6, 1, 'after1', 'after2'];
const startY = info.top - h; 
for (let y = Math.max(0, startY - 2500); y < startY; y += 250) { await p.evaluate((v) => scrollTo(0, v), y); await p.waitForTimeout(40); }
let k = 0;
for (const s of shots) {
  let y;
  if (typeof s === 'number' && Math.abs(s) > 1) y = info.top + s - h / 2 + (await p.evaluate(() => { const d = document.querySelector('.timeline__dot'); return 0; }));
  const pinStart = info.top; // aproximado: o pin começa perto do topo do spacer
  if (s === -500) y = info.top - 500; else if (s === -250) y = info.top - 250; else if (s === -60) y = info.top - 60;
  else if (s === 0) y = info.top + 20; else if (s === 'after1') y = info.top + info.h - h * 0.5; else if (s === 'after2') y = info.top + info.h - h * 0.15;
  else y = info.top + (info.h - h) * s;
  // aproxima devagar para a inércia acompanhar
  const cur = await p.evaluate(() => scrollY);
  for (let i = 1; i <= 8; i++) { await p.evaluate((v) => scrollTo(0, v), cur + ((y - cur) * i) / 8); await p.waitForTimeout(30); }
  await p.waitForTimeout(900);
  const balls = await p.evaluate(() => { const vis = (el) => { const r = el.getBoundingClientRect(); const o = getComputedStyle(el).opacity; return o !== '0' && r.bottom > 0 && r.top < innerHeight; }; const sec = document.querySelector('#histoire').getBoundingClientRect(); const rb = document.querySelector('[data-rally-ball]').getBoundingClientRect(); const rallyShown = vis(document.querySelector('[data-rally-ball]')) && !(rb.top > sec.top && rb.bottom < sec.bottom); const tb = document.querySelector('[data-timeline-ball]'); const tr = tb.getBoundingClientRect(); const tShown = vis(tb) && tr.top > sec.top - 5 && tr.bottom < sec.bottom + 5; return { rally: rallyShown, timeline: tShown }; });
  console.log(tag, s, JSON.stringify(balls));
  await p.screenshot({ path: `${out}/${tag}-${String(k++).padStart(2, '0')}.png` });
}
console.log('errors', errors);
await b.close();
