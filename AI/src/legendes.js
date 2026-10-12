import { gsap } from 'gsap';

// O coração do Guga é desenhado com o scroll, num traço só, como a ponta da raquete no saibro.
export function drawHeart(section, { animate }) {
  const path = section.querySelector('[data-heart-path]');
  const length = path.getTotalLength();
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: animate ? length : 0 });
  if (!animate) return;

  gsap.to(path, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: { trigger: section.querySelector('[data-heart]'), start: 'top 75%', end: 'bottom 55%', scrub: true },
  });
}
