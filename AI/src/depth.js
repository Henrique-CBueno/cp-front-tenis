// O Medidor de Sous la Terre: converte o progresso da escavação (0 a 1) em profundidade real, em centímetros.
// A câmera passa uma tela por camada, com o mesmo tanto de scroll para cada uma; ela começa no meio da
// primeira e termina no meio da última. Nas fronteiras entre as telas, o medidor mostra exatamente onde
// uma camada termina; entre elas, a profundidade cresce em linha reta. Assim o tijolo (2 mm) tem a mesma
// presença das pedras (35 cm), e o número continua verdadeiro.
// Espessuras: fonte oficial (processo/pesquisa/fatos.md e camadas.md); as pedras completam os ~80 cm.
export const LAYERS = [
  { key: 'tijolo', from: 0, to: 0.2 },
  { key: 'calcario', from: 0.2, to: 7 },
  { key: 'clinquer', from: 7, to: 15 },
  { key: 'cascalho', from: 15, to: 45 },
  { key: 'pedras', from: 45, to: 80 },
];

const STEPS = LAYERS.length - 1;
// os nós: a superfície, cada fronteira (no meio do caminho entre duas telas) e o fundo
const KNOTS = [
  { at: 0, cm: 0 },
  ...LAYERS.slice(0, -1).map((layer, i) => ({ at: (i + 0.5) / STEPS, cm: layer.to })),
  { at: 1, cm: LAYERS[STEPS].to },
];

const clamp01 = (t) => Math.min(1, Math.max(0, t));

export function depthAt(progress) {
  const t = clamp01(progress);
  for (let i = 1; i < KNOTS.length; i++) {
    const [a, b] = [KNOTS[i - 1], KNOTS[i]];
    if (t <= b.at) return a.cm + ((t - a.at) / (b.at - a.at)) * (b.cm - a.cm);
  }
  return KNOTS[KNOTS.length - 1].cm;
}

// a camada que ocupa a tela nesse progresso
export function layerAt(progress) {
  return Math.min(STEPS, Math.max(0, Math.round(clamp01(progress) * STEPS)));
}

export function formatDepth(cm) {
  if (cm <= 0) return '0 cm';
  if (cm < 1) return `${Math.max(1, Math.round(cm * 10))} mm`;
  return `${Math.round(cm)} cm`;
}
