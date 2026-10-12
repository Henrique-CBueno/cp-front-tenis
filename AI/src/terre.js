import { gsap } from 'gsap';

// Terre Battue: a foto da marca anda mais devagar que a página (as camadas da quadra viraram a cena Sous la Terre).
export function animateTerre(section) {
  gsap.fromTo(
    section.querySelector('[data-parallax-photo] img'),
    { yPercent: -12 },
    { yPercent: 0, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } },
  );
}
