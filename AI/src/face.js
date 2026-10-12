import { gsap } from 'gsap';

// tom de saibro (duotone) do começo e a cor de verdade do encontro; mesmas funções, para o GSAP interpolar
const CLAY = 'grayscale(1) sepia(1) saturate(2.4) hue-rotate(-14deg) brightness(0.8) contrast(1.1)';
const COLOR = 'grayscale(0) sepia(0) saturate(1) hue-rotate(0deg) brightness(1) contrast(1)';

// Face-à-face: a seção fica presa e o scroll conduz o encontro. A rede desce; Guga e Nadal entram de lados
// opostos em tom de saibro, com o nome atrás; na rede, ganham cor e a rede pulsa; os títulos contam e a frase fecha.
// Sem animação (reduced-motion), o HTML e o CSS já mostram o estado final.
export function runFaceOff(section) {
  const q = (selector) => section.querySelector(selector);
  const [guga, nadal] = [q('.face__player--guga'), q('.face__player--nadal')];
  const images = [guga.querySelector('img'), nadal.querySelector('img')];
  const counts = [...section.querySelectorAll('[data-face-count]')];

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: section, start: 'top top', end: '+=220%', pin: true, scrub: true },
  });

  tl.fromTo(q('.face__net'), { scaleY: 0 }, { scaleY: 1, duration: 0.15 })
    .fromTo(images, { filter: CLAY }, { filter: CLAY, duration: 0.01 }, 0)
    .fromTo(guga, { xPercent: -85 }, { xPercent: 0, duration: 0.45, ease: 'power2.out' }, 0.05)
    .fromTo(nadal, { xPercent: 85 }, { xPercent: 0, duration: 0.45, ease: 'power2.out' }, 0.05)
    .fromTo(q('.face__name--guga'), { xPercent: -25, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.45 }, 0.05)
    .fromTo(q('.face__name--nadal'), { xPercent: 25, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.45 }, 0.05)
    // o encontro: cor e o pulso da rede
    .to(images, { filter: COLOR, duration: 0.15 }, 0.5)
    .to(q('.face__net'), { scaleX: 2.6, duration: 0.05, yoyo: true, repeat: 1 }, 0.5)
    .fromTo(q('.face__score'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1 }, 0.6);

  for (const dd of counts) {
    const target = Number(dd.dataset.faceCount);
    const state = { value: 0 };
    tl.fromTo(
      state,
      { value: 0 },
      { value: target, duration: 0.2, onUpdate: () => (dd.textContent = String(Math.round(state.value))) },
      0.62,
    );
  }

  tl.fromTo(q('.face__line'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.1 }, 0.85).to({}, { duration: 0.1 });
}
