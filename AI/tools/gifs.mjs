// Grava um GIF de cada entrega do checkpoint para o README da raiz.
// Uso (de dentro de AI/): npm run build && npx vite preview --port 4173 --strictPort &
//                        node tools/gifs.mjs
// Precisa do ffmpeg no PATH. Saída em ../docs/gifs/.
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const saida = join(raiz, "docs/gifs");
const viewport = { width: 1280, height: 720 };
const arquivo = (pasta) => pathToFileURL(join(raiz, pasta, "index.html")).href;

// Rola a página com a roda do mouse (o Lenis da La Trace só responde a eventos reais).
async function rolar(page, { passo = 120, pausa = 40, ate } = {}) {
  const altura = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const alvo = ate ?? altura;
  await page.mouse.move(viewport.width / 2, viewport.height / 2);
  while ((await page.evaluate(() => scrollY)) < alvo - 2) {
    await page.mouse.wheel(0, passo);
    await page.waitForTimeout(pausa);
  }
}

const entregas = [
  {
    nome: "revisao",
    url: arquivo("revisao"),
    roteiro: async (page) => {
      await page.waitForTimeout(1200);
      await rolar(page, { passo: 60 });
      await page.waitForTimeout(1200);
    },
  },
  {
    nome: "bootstrap",
    url: arquivo("bootstrap"),
    roteiro: async (page) => {
      await page.waitForTimeout(1200);
      await page.locator("#depoimentos").scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await page.locator(".carousel-control-next").click();
      await page.waitForTimeout(1200);
      await page.locator(".carousel-control-next").click();
      await page.waitForTimeout(1200);
      await page.locator("#faq").scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await page.locator('[data-bs-target="#faq1"]').click();
      await page.waitForTimeout(1200);
      await page.locator('[data-bs-target="#faq2"]').click();
      await page.waitForTimeout(1200);
      await page.evaluate(() => scrollTo({ top: 0, behavior: "smooth" }));
      await page.waitForTimeout(1000);
      await page.getByRole("button", { name: "Comprar agora" }).click();
      await page.waitForTimeout(1500);
      await page.locator("#kit").check();
      await page.waitForTimeout(1200);
    },
  },
  {
    nome: "tailwind",
    url: arquivo("tailwind"),
    roteiro: async (page) => {
      await page.waitForTimeout(1500);
      await rolar(page, { passo: 60 });
      await page.waitForTimeout(1200);
    },
  },
  {
    nome: "vibecode",
    url: "http://localhost:4173/",
    // A página é longa e cheia de foto: GIF menor para não passar de ~10 MB.
    gif: { fps: 8, largura: 560, cores: 96 },
    roteiro: async (page) => {
      await page.waitForTimeout(2500);
      await rolar(page, { passo: 100, pausa: 50 });
      await page.waitForTimeout(2000);
    },
  },
];

mkdirSync(saida, { recursive: true });
const browser = await chromium.launch();
const filtro = process.argv.slice(2);

for (const { nome, url, roteiro, gif: opcoes = {} } of entregas) {
  if (filtro.length && !filtro.includes(nome)) continue;
  const tmp = mkdtempSync(join(tmpdir(), `gif-${nome}-`));
  const context = await browser.newContext({ viewport, recordVideo: { dir: tmp, size: viewport } });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await roteiro(page);
  await context.close();

  const video = join(tmp, readdirSync(tmp).find((f) => f.endsWith(".webm")));
  const gif = join(saida, `${nome}.gif`);
  const { fps = 12, largura = 800, cores = 256 } = opcoes;
  const filtros = `fps=${fps},scale=${largura}:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=${cores}:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4`;
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", video, "-vf", filtros, gif]);
  rmSync(tmp, { recursive: true, force: true });
  console.log(`✓ ${gif}`);
}

await browser.close();
