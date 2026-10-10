// Trajeto do Rali: o caminho da bola descrito como x = f(y), uma interpolação cúbica monótona (Fritsch–Carlson).
// - passa exatamente por cada ponto de passagem;
// - nunca vai além dos pontos vizinhos, então não invade o espaço reservado ao texto;
// - como y só cresce, a ponta do traço pode seguir o scroll.

// Inclinações dx/dy em cada ponto, zeradas nos extremos locais para não haver "estouro" entre os pontos.
function slopes(points) {
  const n = points.length;
  const delta = [];
  for (let i = 0; i < n - 1; i++) {
    delta.push((points[i + 1].x - points[i].x) / (points[i + 1].y - points[i].y));
  }
  const m = new Array(n).fill(0);
  if (n < 2) return m;
  m[0] = delta[0];
  m[n - 1] = delta[n - 2];
  for (let i = 1; i < n - 1; i++) {
    m[i] = delta[i - 1] * delta[i] <= 0 ? 0 : (delta[i - 1] + delta[i]) / 2;
  }
  for (let i = 0; i < n - 1; i++) {
    if (delta[i] === 0) {
      m[i] = 0;
      m[i + 1] = 0;
      continue;
    }
    const a = m[i] / delta[i];
    const b = m[i + 1] / delta[i];
    const s = a * a + b * b;
    if (s > 9) {
      const t = 3 / Math.sqrt(s);
      m[i] = t * a * delta[i];
      m[i + 1] = t * b * delta[i];
    }
  }
  return m;
}

export function buildRallyPath(points) {
  const m = slopes(points);
  const last = points.length - 1;

  function segmentFor(y) {
    if (y <= points[0].y) return 0;
    for (let i = 0; i < last; i++) if (y <= points[i + 1].y) return i;
    return last - 1;
  }

  function pointAtY(y) {
    const i = segmentFor(y);
    const [a, b] = [points[i], points[i + 1]];
    const h = b.y - a.y;
    const t = Math.min(1, Math.max(0, (y - a.y) / h));
    const t2 = t * t;
    const t3 = t2 * t;
    const x = (2 * t3 - 3 * t2 + 1) * a.x + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * b.x + (t3 - t2) * h * m[i + 1];
    return { x, y: a.y + t * h };
  }

  // a mesma curva em SVG: cada trecho de Hermite vira uma Bézier cúbica (y é linear em t, então coincidem)
  const r = (v) => Math.round(v * 100) / 100;
  let d = `M${r(points[0].x)},${r(points[0].y)}`;
  for (let i = 0; i < last; i++) {
    const [a, b] = [points[i], points[i + 1]];
    const h = b.y - a.y;
    d += ` C${r(a.x + (m[i] * h) / 3)},${r(a.y + h / 3)} ${r(b.x - (m[i + 1] * h) / 3)},${r(b.y - h / 3)} ${r(b.x)},${r(b.y)}`;
  }

  return { d, pointAtY };
}
