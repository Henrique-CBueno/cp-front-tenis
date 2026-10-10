import { gsap } from 'gsap';

// O quique deixa a marca: ela nasce de uma vez no instante do toque, com um tranco (estica na largura, achata,
// assenta), e depois escurece e afunda devagar, como o saibro assentando. Uma vez feita, fica.
// instant: a marca já estava feita (reduced-motion, ou a página abriu com a bola mais abaixo).
export function stamp(oval, { caption, instant = false } = {}) {
  const sunk = { filter: 'brightness(0.8)', scale: 0.96 };
  if (instant) {
    gsap.set(oval, { scaleX: sunk.scale, scaleY: sunk.scale, filter: sunk.filter });
    if (caption) gsap.set(caption, { opacity: 1, y: 0 });
    return null;
  }

  const tl = gsap.timeline();
  tl.fromTo(oval, { scaleX: 0.35, scaleY: 0.15, filter: 'brightness(1.12)' }, { scaleX: 1.2, scaleY: 0.78, duration: 0.09, ease: 'power3.out' })
    .to(oval, { scaleX: 1, scaleY: 1, duration: 0.55, ease: 'elastic.out(1, 0.45)' })
    .to(oval, { scaleX: sunk.scale, scaleY: sunk.scale, filter: sunk.filter, duration: 2.4, ease: 'sine.inOut' }, '+=0.15');
  if (caption) tl.fromTo(caption, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 0.12);
  return tl;
}

// A nuvem de pó do quique: alguns grãos de saibro que saltam em leque e somem. Curta e barata.
export function dust(parent, x, y) {
  for (let i = 0; i < 7; i++) {
    const grain = document.createElement('span');
    grain.className = 'rally__dust';
    grain.style.left = `${x}px`;
    grain.style.top = `${y}px`;
    parent.append(grain);
    const angle = Math.PI + (Math.PI * (i + 0.5)) / 7; // para cima, em leque
    const reach = 18 + Math.random() * 22;
    gsap.to(grain, {
      x: Math.cos(angle) * reach,
      y: Math.sin(angle) * reach * 0.6,
      scale: 0.3,
      opacity: 0,
      duration: 0.7 + Math.random() * 0.3,
      ease: 'expo.out',
      onComplete: () => grain.remove(),
    });
  }
}
