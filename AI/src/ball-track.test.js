import { describe, it, expect } from 'vitest';
import { completeBallTrack } from './ball-track.js';

describe('Rastreio da bola: completar os quadros sem rastreio', () => {
  it('um buraco no meio do rastreio vira a média dos vizinhos', () => {
    const track = completeBallTrack([[0, 0.8], null, [0.2, 0.6], [0.3, 0.5]], { impactIndex: 3, contact: [0.3, 0.5] });
    expect(track[1][0]).toBeCloseTo(0.1);
    expect(track[1][1]).toBeCloseTo(0.7);
  });

  it('depois do último ponto, a bola segue em lançamento e cai exatamente no contato', () => {
    const ball = [[0.3, 0.6], [0.31, 0.5], null, null, null, null, null, null, null, null, null];
    const track = completeBallTrack(ball, { impactIndex: 10, contact: [0.6, 0.1] });
    expect(track[10][0]).toBeCloseTo(0.6);
    expect(track[10][1]).toBeCloseTo(0.1);
    expect(track.every(Boolean)).toBe(true);
  });

  it('o lançamento continua com a velocidade medida: sobe acima do contato e depois desce até ele', () => {
    const ball = [[0.3, 0.6], [0.3, 0.5], null, null, null, null, null, null, null, null, null];
    const track = completeBallTrack(ball, { impactIndex: 10, contact: [0.3, 0.1] });
    // o primeiro quadro novo segue subindo mais ou menos na mesma velocidade (0,1 por quadro)
    expect(track[2][1]).toBeLessThan(0.45);
    const ys = track.map((p) => p[1]);
    const peak = ys.indexOf(Math.min(...ys));
    expect(ys[peak]).toBeLessThan(0.1);
    expect(peak).toBeGreaterThan(1);
    expect(peak).toBeLessThan(10);
  });

  it('não mexe nos pontos rastreados nem nos quadros depois do contato', () => {
    const ball = [[0.3, 0.6], [0.3, 0.5], null, null, null];
    const track = completeBallTrack(ball, { impactIndex: 3, contact: [0.3, 0.1] });
    expect(track[0]).toEqual([0.3, 0.6]);
    expect(track[1]).toEqual([0.3, 0.5]);
    expect(track[4]).toBeNull();
  });

  it('com um pico, a bola não passa dele: sobe com a velocidade medida, para no pico e desce até o contato', () => {
    const ball = [[0.3, 0.6], [0.3, 0.5], ...Array(20).fill(null)];
    const track = completeBallTrack(ball, { impactIndex: 21, contact: [0.3, 0.1], peakY: -0.2 });
    const ys = track.map((p) => p[1]);
    expect(Math.min(...ys)).toBeCloseTo(-0.2, 5);
    expect(ys[21]).toBeCloseTo(0.1);
    // o primeiro passo novo tem a mesma velocidade do último medido (0,1 por quadro), com folga pela curva
    expect(ys[1] - ys[2]).toBeGreaterThan(0.07);
    expect(ys[1] - ys[2]).toBeLessThan(0.11);
    // nada de saltos: nenhum passo maior que a velocidade de saída
    for (let i = 2; i < 21; i++) expect(Math.abs(ys[i + 1] - ys[i])).toBeLessThan(0.11);
  });
});
