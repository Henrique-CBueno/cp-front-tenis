import { describe, it, expect } from 'vitest';
import { LAYERS, depthAt, layerAt, formatDepth } from './depth.js';

describe('Medidor de Sous la Terre', () => {
  it('começa na superfície e termina a 80 cm', () => {
    expect(depthAt(0)).toBe(0);
    expect(depthAt(1)).toBe(80);
  });

  it('nunca volta: a profundidade só cresce com o progresso', () => {
    let last = -1;
    for (let i = 0; i <= 200; i++) {
      const d = depthAt(i / 200);
      expect(d).toBeGreaterThanOrEqual(last);
      last = d;
    }
  });

  it('cada camada ganha o mesmo tanto de scroll', () => {
    const spans = LAYERS.map((_, i) => {
      const inside = [];
      for (let k = 0; k <= 1000; k++) if (layerAt(k / 1000) === i) inside.push(k);
      return inside.length;
    });
    // as das pontas começam e terminam com a câmera no meio delas: meio trecho a menos
    expect(spans[1]).toBeCloseTo(spans[2], -1);
    expect(spans[2]).toBeCloseTo(spans[3], -1);
    expect(spans[0]).toBeCloseTo(spans[1] / 2, -1);
    expect(spans[4]).toBeCloseTo(spans[1] / 2, -1);
  });

  it('nas fronteiras, o valor exato de onde uma camada termina', () => {
    const boundaries = LAYERS.slice(0, -1).map((layer) => layer.to);
    expect(boundaries).toEqual([0.2, 7, 15, 45]);
    boundaries.forEach((cm, i) => expect(depthAt((i + 0.5) / (LAYERS.length - 1))).toBeCloseTo(cm, 6));
  });

  it('a camada que está na tela muda nas fronteiras', () => {
    expect(layerAt(0)).toBe(0);
    expect(layerAt(0.2)).toBe(1);
    expect(layerAt(0.5)).toBe(2);
    expect(layerAt(0.75)).toBe(3);
    expect(layerAt(1)).toBe(4);
  });

  it('escreve a profundidade como se lê numa régua', () => {
    expect(formatDepth(0)).toBe('0 cm');
    expect(formatDepth(0.12)).toBe('1 mm');
    expect(formatDepth(0.2)).toBe('2 mm');
    expect(formatDepth(6.6)).toBe('7 cm');
    expect(formatDepth(80)).toBe('80 cm');
  });
});
