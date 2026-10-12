// Ícones e cartão de compartilhamento, gerados a partir do logo oficial em cor (decisão 016).
// Uso: npm run build && npm run preview, e em outro terminal: node tools/identidade.mjs
import { chromium } from '@playwright/test';
import fs from 'node:fs';

const logo = fs.readFileSync('public/img/marca/roland-garros.svg', 'utf8');
fs.copyFileSync('public/img/marca/roland-garros.svg', 'public/favicon.svg');

const browser = await chromium.launch();
// o logo num quadrado: sem fundo no favicon; com fundo de saibro nos ícones de tela inicial (iOS não aceita transparência)
async function icon(size, file, { background = 'transparent', pad = 0 } = {}) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  const inner = Math.round(size * (1 - 2 * pad));
  await page.setContent(
    `<body style="margin:0;display:grid;place-items:center;width:${size}px;height:${size}px;background:${background}">` +
      logo.replace(/width="62" height="62"/, `width="${inner}" height="${inner}"`) +
      '</body>',
  );
  await page.screenshot({ path: file, omitBackground: background === 'transparent' });
  await page.close();
}
await icon(32, 'public/favicon-32.png');
await icon(180, 'public/apple-touch-icon.png', { background: '#b04e29', pad: 0.1 });
await icon(192, 'public/icon-192.png', { background: '#b04e29', pad: 0.1 });
await icon(512, 'public/icon-512.png', { background: '#b04e29', pad: 0.1 });

// o cartão: o hero no estado final (reduced-motion: o quadro do saque e a Marca 01), em 1200×630
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, reducedMotion: 'reduce' });
await page.goto('http://localhost:4173/');
await page.waitForLoadState('networkidle');
await page.waitForTimeout(800);
await page.screenshot({ path: 'public/og.jpg', type: 'jpeg', quality: 82 });
await browser.close();

fs.writeFileSync(
  'public/site.webmanifest',
  JSON.stringify(
    {
      name: 'La Trace · Roland-Garros por um fã brasileiro',
      short_name: 'La Trace',
      lang: 'pt-BR',
      start_url: '/',
      display: 'standalone',
      background_color: '#b04e29',
      theme_color: '#b04e29',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  ) + '\n',
);
console.log('ícones, manifest e cartão gerados');
