import { gsap } from 'gsap';

// O marquee: a frase corre sozinha devagar e ganha a velocidade do scroll. Rolar para cima inverte o sentido.
// A faixa tem duas cópias iguais lado a lado; quando a primeira sai inteira, volta ao começo sem costura.
const BASE = 0.6; // px por quadro, parado
const PUSH = 0.35; // quanto de cada px rolado vira velocidade

export function runMarquees(marquees) {
  const bands = marquees.map((marquee, i) => {
    const track = marquee.querySelector('[data-marquee-track]');
    track.append(track.firstElementChild.cloneNode(true));
    return { track, sense: i % 2 ? 1 : -1, x: 0 };
  });

  let lastY = window.scrollY;
  let direction = 1;
  let boost = 0;
  gsap.ticker.add(() => {
    const delta = window.scrollY - lastY;
    lastY = window.scrollY;
    if (delta) direction = Math.sign(delta);
    boost += (Math.abs(delta) * PUSH - boost) * 0.12; // a velocidade cresce e cai com suavidade

    for (const band of bands) {
      const width = band.track.firstElementChild.offsetWidth;
      if (!width) continue;
      band.x += band.sense * direction * (BASE + boost);
      band.x = gsap.utils.wrap(-width, 0, band.x);
      gsap.set(band.track, { x: band.x });
    }
  });
}
