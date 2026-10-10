import { gsap } from 'gsap';

// A bola da Histoire: enquanto a linha do tempo passa, ela quica de data em data sobre a linha.
// progress (0–1) vira um índice entre as datas; entre duas datas a bola faz um arco e achata ao tocar.
function hopAlong(section, ball, progress, axis) {
  const dots = [...section.querySelectorAll('.timeline__dot')];
  const origin = section.getBoundingClientRect();
  const at = (i) => {
    const r = dots[i].getBoundingClientRect();
    return { x: r.left + r.width / 2 - origin.left, y: r.top + r.height / 2 - origin.top };
  };
  const f = gsap.utils.clamp(0, dots.length - 1, progress * (dots.length - 1));
  const i = Math.min(dots.length - 2, Math.floor(f));
  const t = f - i;
  const [a, b] = [at(i), at(i + 1)];
  const lift = 4 * t * (1 - t) * (axis === 'x' ? 30 : 18); // baixo o bastante para não encostar no texto
  const ground = Math.min(t, 1 - t) < 0.06; // perto de uma data: no chão
  gsap.set(ball, {
    x: a.x + (b.x - a.x) * t + (axis === 'y' ? lift : 0),
    y: a.y + (b.y - a.y) * t - (axis === 'x' ? lift : 0),
    scaleX: ground ? 1.18 : 1,
    scaleY: ground ? 0.74 : 1,
    opacity: 1,
  });
}

// Histoire: no desktop a seção fica presa e a linha do tempo corre na horizontal, conduzida pelo scroll.
// No celular ela fica de pé (CSS) e não há pin. Nos dois casos, uma bola quica de data em data.
export function runTimeline(section) {
  const track = section.querySelector('[data-timeline-track]');
  const ball = document.createElement('span');
  ball.className = 'court__ball timeline__ball';
  ball.setAttribute('aria-hidden', 'true');
  ball.dataset.timelineBall = '';
  section.append(ball);

  gsap.matchMedia().add('(max-width: 720px)', () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: track,
        start: 'top 60%',
        end: 'bottom 60%',
        scrub: true,
        onUpdate: (self) => hopAlong(section, ball, self.progress, 'y'),
        onEnter: (self) => hopAlong(section, ball, self.progress, 'y'),
      },
    });
  });

  gsap.matchMedia().add('(min-width: 721px)', () => {
    // medidas de layout (offset*), que não mudam com o translate já aplicado
    const distance = () => Math.max(0, track.offsetLeft + track.offsetWidth - section.clientWidth);
    const run = gsap.to(track, {
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
    // a bola acompanha a linha a cada quadro (os dots se movem com o translate da linha)
    const follow = () => hopAlong(section, ball, run.scrollTrigger.progress, 'x');
    gsap.ticker.add(follow);
    return () => gsap.ticker.remove(follow);
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
