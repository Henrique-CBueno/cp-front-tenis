// O rastreio da bola no vídeo tem buracos: alguns quadros soltos no começo e, principalmente, todo o trecho
// em que a bola sobe acima do recorte do jogador até voltar para a raquete. Sem ponto, a bola sumia no ar.
// Aqui os buracos são preenchidos: os soltos pela média dos vizinhos, e o trecho final por um lançamento que
// parte da velocidade medida no último ponto e cai exatamente no contato.
// peakY (opcional): a altura máxima do lançamento, para a bola não sair da tela. A subida parte da velocidade
// medida e freia até o pico; a descida parte do repouso e acelera até o contato. Sem peakY, é uma parábola só
// (a física pura, que com a velocidade medida leva a bola muito acima da tela).
export function completeBallTrack(ball, { impactIndex, contact, peakY }) {
  const track = ball.map((p) => (p ? [...p] : null));

  let last = impactIndex;
  while (last > 0 && !track[last]) last--;

  // buracos entre pontos rastreados: interpolação linear
  for (let i = 0; i < last; i++) {
    if (track[i]) continue;
    let next = i + 1;
    while (!track[next]) next++;
    const prev = i - 1;
    if (prev < 0) {
      track[i] = [...track[next]];
      continue;
    }
    const f = (i - prev) / (next - prev);
    track[i] = [0, 1].map((k) => track[prev][k] + (track[next][k] - track[prev][k]) * f);
  }

  // do último ponto ao contato: x em linha reta; y em parábola, ou em subida e descida com pico em peakY
  const span = impactIndex - last;
  if (span > 0) {
    const [x0, y0] = track[last];
    const vy = last > 0 ? y0 - track[last - 1][1] : 0;
    const xAt = (t) => x0 + ((contact[0] - x0) * t) / span;
    const capped = peakY !== undefined && vy < 0 && peakY < Math.min(y0, contact[1]);
    if (capped) {
      // a subida em ease-out começa com inclinação 2·(pico − y0)/duração: igualada à velocidade medida
      const rise = Math.min(span - 2, Math.max(2, (2 * (peakY - y0)) / vy));
      for (let t = 1; t <= span; t++) {
        const y =
          t <= rise
            ? y0 + (peakY - y0) * (1 - (1 - t / rise) ** 2)
            : peakY + (contact[1] - peakY) * ((t - rise) / (span - rise)) ** 2;
        track[last + t] = [xAt(t), y];
      }
    } else {
      const g = (2 * (contact[1] - y0 - vy * span)) / span ** 2;
      for (let t = 1; t <= span; t++) track[last + t] = [xAt(t), y0 + vy * t + (g * t * t) / 2];
    }
  }
  return track;
}
