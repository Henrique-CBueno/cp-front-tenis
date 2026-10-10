import { gsap } from 'gsap';

// Histoire: no desktop a seção fica presa e a linha do tempo corre na horizontal, conduzida pelo scroll.
// No celular ela fica de pé (CSS) e não há pin.
export function runTimeline(section) {
  const track = section.querySelector('[data-timeline-track]');
  gsap.matchMedia().add('(min-width: 721px)', () => {
    // medidas de layout (offset*), que não mudam com o translate já aplicado
    const distance = () => Math.max(0, track.offsetLeft + track.offsetWidth - section.clientWidth);
    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  });
}

// Le Score: cada número conta até o valor quando a linha entra na tela.
export function runCounters(section) {
  const format = new Intl.NumberFormat('pt-BR');
  for (const el of section.querySelectorAll('[data-count]')) {
    const target = Number(el.dataset.count);
    const isYear = target > 1000 && target < 2100;
    const state = { value: isYear ? target - 120 : 0 };
    el.textContent = isYear ? String(state.value) : format.format(state.value);
    gsap.to(state, {
      value: target,
      duration: 1.6,
      ease: 'expo.out',
      onUpdate: () => (el.textContent = isYear ? String(Math.round(state.value)) : format.format(Math.round(state.value))),
      onComplete: () => (el.textContent = isYear ? String(target) : format.format(target)),
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  }
}
