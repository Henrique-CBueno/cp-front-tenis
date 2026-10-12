import { describe, it, expect } from 'vitest';
import { createServeSequence } from './serve-sequence.js';

const frames = (prefix, count) => Array.from({ length: count }, (_, i) => `${prefix}/${i}.webp`);

const manifest = {
  mobileMaxWidth: 720,
  keyframeEvery: 4,
  sets: {
    desktop: frames('desktop', 9),
    mobile: frames('mobile', 5),
    static: ['static/impact.webp'],
  },
};

describe('Sequência do Saque: escolha do conjunto', () => {
  it('usa o conjunto desktop num viewport largo', () => {
    const seq = createServeSequence({ manifest, loader: () => new Promise(() => {}), viewport: { width: 1440 } });
    expect(seq.set).toBe('desktop');
  });

  it('usa o conjunto mobile num viewport estreito', () => {
    const seq = createServeSequence({ manifest, loader: () => new Promise(() => {}), viewport: { width: 390 } });
    expect(seq.set).toBe('mobile');
  });

  it('usa o quadro estático com reduced-motion, mesmo num viewport largo', () => {
    const seq = createServeSequence({
      manifest,
      loader: () => new Promise(() => {}),
      viewport: { width: 1440, reducedMotion: true },
    });
    expect(seq.set).toBe('static');
  });
});

// deixa as promessas pendentes andarem (o resto dos quadros só é pedido depois dos quadros-chave)
const flush = () => new Promise((resolve) => setTimeout(resolve));

function fakeLoader() {
  const requested = [];
  const pending = new Map();
  const loader = (url) => {
    requested.push(url);
    return new Promise((resolve, reject) => pending.set(url, { resolve, reject }));
  };
  const finish = async (url) => {
    if (!pending.has(url)) await flush();
    pending.get(url).resolve({ url });
    await flush();
  };
  const fail = (url) => pending.get(url).reject(new Error(`falhou: ${url}`));
  return { loader, requested, finish, fail };
}

describe('Sequência do Saque: preload', () => {
  it('pede primeiro só os quadros-chave (o primeiro quadro incluso)', () => {
    const fake = fakeLoader();
    const seq = createServeSequence({ manifest, loader: fake.loader, viewport: { width: 1440 } });

    seq.preload();

    // 9 quadros com um quadro-chave a cada 4: 0, 4, 8
    expect(fake.requested).toEqual([0, 4, 8].map((i) => `desktop/${i}.webp`));
  });

  it('o resto vem depois dos quadros-chave, poucos de cada vez', async () => {
    const fake = fakeLoader();
    const seq = createServeSequence({ manifest, loader: fake.loader, viewport: { width: 1440 } });

    const ready = seq.preload({ concurrency: 2 });
    for (const i of [0, 4, 8]) await fake.finish(`desktop/${i}.webp`);
    await ready;

    expect(fake.requested.slice(3)).toEqual(['desktop/1.webp', 'desktop/2.webp']);
    await fake.finish('desktop/1.webp');
    expect(fake.requested.slice(3)).toEqual(['desktop/1.webp', 'desktop/2.webp', 'desktop/3.webp']);
  });

  it('avisa o progresso dos quadros-chave e resolve quando todos terminam, mesmo com falha', async () => {
    const fake = fakeLoader();
    const seq = createServeSequence({ manifest, loader: fake.loader, viewport: { width: 1440 } });
    const progress = [];
    let resolved = false;

    seq.preload({ onProgress: (p) => progress.push(p) }).then(() => (resolved = true));
    await fake.finish('desktop/0.webp');
    fake.fail('desktop/4.webp');
    await flush();
    expect(resolved).toBe(false);
    await fake.finish('desktop/8.webp');

    expect(progress).toEqual([1 / 3, 2 / 3, 1]);
    expect(resolved).toBe(true);
  });

  it('só pede os quadros do conjunto ativo', () => {
    const fake = fakeLoader();
    const seq = createServeSequence({ manifest, loader: fake.loader, viewport: { width: 1440, reducedMotion: true } });

    seq.preload();

    expect(fake.requested).toEqual(['static/impact.webp']);
  });
});

async function loadedDesktop(indices) {
  const fake = fakeLoader();
  const seq = createServeSequence({ manifest, loader: fake.loader, viewport: { width: 1440 } });
  seq.preload();
  // na ordem em que são pedidos: os quadros-chave antes do resto
  const ordered = [...indices].sort((a, b) => (a % 4 === 0 ? -1 : 0) - (b % 4 === 0 ? -1 : 0) || a - b);
  for (const i of ordered) await fake.finish(`desktop/${i}.webp`);
  return seq;
}

describe('Sequência do Saque: quadro para o progresso do scroll', () => {
  it('progresso 0 é o primeiro quadro e progresso 1 é o último', async () => {
    const seq = await loadedDesktop([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(seq.frameAt(0)).toEqual({ url: 'desktop/0.webp' });
    expect(seq.frameAt(1)).toEqual({ url: 'desktop/8.webp' });
  });

  it('o meio do scroll é o quadro do meio', async () => {
    const seq = await loadedDesktop([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(seq.frameAt(0.5)).toEqual({ url: 'desktop/4.webp' });
    expect(seq.frameAt(0.25)).toEqual({ url: 'desktop/2.webp' });
  });

  it('progresso fora de [0, 1] fica preso nas pontas', async () => {
    const seq = await loadedDesktop([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(seq.frameAt(-0.3)).toEqual({ url: 'desktop/0.webp' });
    expect(seq.frameAt(1.7)).toEqual({ url: 'desktop/8.webp' });
  });

  it('se o quadro alvo não carregou, devolve o carregado mais próximo', async () => {
    const seq = await loadedDesktop([0, 4, 8]);
    expect(seq.frameAt(5 / 8)).toEqual({ url: 'desktop/4.webp' });
    expect(seq.frameAt(7 / 8)).toEqual({ url: 'desktop/8.webp' });
  });

  it('sem nenhum quadro carregado, não há nada a desenhar', async () => {
    const seq = await loadedDesktop([]);
    expect(seq.frameAt(0.5)).toBeNull();
  });

  it('um quadro que falhou ao carregar não quebra a sequência', async () => {
    const fake = fakeLoader();
    const seq = createServeSequence({ manifest, loader: fake.loader, viewport: { width: 1440 } });
    seq.preload();
    await fake.finish('desktop/0.webp');
    fake.fail('desktop/4.webp');
    await flush();
    expect(seq.frameAt(0.5)).toEqual({ url: 'desktop/0.webp' });
  });
});
