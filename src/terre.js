import { gsap } from 'gsap';

// Terre Battue: a foto da marca anda mais devagar que a página, e as camadas da quadra se afastam
// umas das outras quando o corte passa pela tela (uma vista explodida conduzida pelo scroll).
export function animateTerre(section) {
  gsap.fromTo(
    section.querySelector('[data-parallax-photo] img'),
    { yPercent: -12 },
    { yPercent: 0, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } },
  );

  const layers = section.querySelectorAll('.strata__layer');
  gsap.fromTo(
    layers,
    { y: 0 },
    {
      y: (i) => i * 14,
      ease: 'none',
      scrollTrigger: { trigger: section.querySelector('[data-strata]'), start: 'top 85%', end: 'center 40%', scrub: true },
    },
  );
}

