import { describe, it, expect } from 'vitest';
import { buildRallyPath } from './rally-path.js';

// marca da 1ª seção à esquerda, quique no respiro, marca da 2ª seção à direita
const points = [
  { x: 600, y: 0, contact: true },
  { x: 600, y: 300 },
  { x: 900, y: 700, contact: true },
  { x: 300, y: 1000, contact: true },
  { x: 300, y: 1400 },
];

describe('Trajeto do Rali: a curva', () => {
  it('passa exatamente por cada ponto, na ordem', () => {
    const path = buildRallyPath(points);
    for (const p of points) {
      const at = path.pointAtY(p.y);
      expect(at.x).toBeCloseTo(p.x, 6);
      expect(at.y).toBeCloseTo(p.y, 6);
    }
  });

  it('não passa além dos pontos vizinhos (não invade o espaço do texto)', () => {
    const path = buildRallyPath(points);
    for (let i = 1; i < points.length; i++) {
      const [a, b] = [points[i - 1], points[i]];
      for (let y = a.y; y <= b.y; y += 5) {
        const { x } = path.pointAtY(y);
        expect(x).toBeGreaterThanOrEqual(Math.min(a.x, b.x) - 1e-6);
        expect(x).toBeLessThanOrEqual(Math.max(a.x, b.x) + 1e-6);
      }
    }
  });
});

// avalia o caminho SVG "M x,y C x1,y1 x2,y2 x,y ..." no parâmetro t de um segmento
function bezierAt(d, segment, t) {
  const nums = d.match(/-?\d+(\.\d+)?(e-?\d+)?/g).map(Number);
  const start = segment === 0 ? [nums[0], nums[1]] : nums.slice(2 + (segment - 1) * 6 + 4, 2 + (segment - 1) * 6 + 6);
  const [x1, y1, x2, y2, x3, y3] = nums.slice(2 + segment * 6, 2 + segment * 6 + 6);
  const [x0, y0] = start;
  const u = 1 - t;
  return {
    x: u ** 3 * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t ** 3 * x3,
    y: u ** 3 * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t ** 3 * y3,
  };
}

describe('Trajeto do Rali: o traço desenhado', () => {
  it('o caminho SVG coincide com a posição da bola em cada altura', () => {
    const path = buildRallyPath(points);
    for (let segment = 0; segment < points.length - 1; segment++) {
      for (const t of [0.25, 0.5, 0.75]) {
        const drawn = bezierAt(path.d, segment, t);
        const ball = path.pointAtY(drawn.y);
        expect(drawn.x).toBeCloseTo(ball.x, 1); // o SVG é arredondado em centésimos de pixel
      }
    }
  });

  it('é estável: a mesma entrada gera o mesmo caminho', () => {
    expect(buildRallyPath(points).d).toBe(buildRallyPath(points).d);
  });
});
