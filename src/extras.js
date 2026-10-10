import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stamp, dust } from './impact.js';

// A bola da Histoire. É a mesma bola do rali: ele a entrega à cena na primeira data e a recebe de volta na última
// (ver as docas em rally.js). Entre as datas, ela quica de uma para a outra sobre a linha do tempo; cada data
// é uma marca, que nasce quando a bola toca nela e fica.
// f é o índice fracionário entre as datas (0 = primeira, n-1 = última); entre duas datas a bola faz um arco e
// achata ao tocar.
function hopAlong(section, ball, dots, f, axis) {
  const origin = section.getBoundingClientRect();
  const at = (i) => {
    const r = dots[i].getBoundingClientRect();
    return { x: r.left + r.width / 2 - origin.left, y: r.top + r.height / 2 - origin.top };
  };
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

// posição de um elemento nas coordenadas da seção (medidas de layout: não mudam com o translate da linha)
function localOf(el, section) {
  let x = 0;
  let y = 0;
  for (let node = el; node && node !== section; node = node.offsetParent) {
    x += node.offsetLeft;
    y += node.offsetTop;
  }
  return { x, y, width: el.offsetWidth, height: el.offsetHeight };
}

// Histoire: no desktop a seção fica presa e a linha do tempo corre na horizontal, conduzida pelo scroll.
// O pin começa no instante em que a bola pousa na primeira data (que fica no meio da tela); a bola espera
// ali, a linha corre, e na última data ela espera de novo antes de sair. No celular a linha fica de pé
// (CSS), sem pin, e a bola desce de data em data. Sem movimento (reduced-motion), nada disso roda e a bola
// do rali passa por trás da seção.
export function runTimeline(section) {
  const track = section.querySelector('[data-timeline-track]');
  const head = section.querySelector('.histoire__head');
  const dots = [...section.querySelectorAll('.timeline__dot')];
  const items = [...section.querySelectorAll('.timeline__item')];

  const ball = document.createElement('span');
  ball.className = 'court__ball timeline__ball';
  ball.setAttribute('aria-hidden', 'true');
  ball.dataset.timelineBall = '';
  // a entrada e a saída do traço, desenhadas por cima da cena (o traço do rali corre por trás dela)
  const svgNS = 'http://www.w3.org/2000/svg';
  const trace = document.createElementNS(svgNS, 'svg');
  trace.classList.add('histoire__trace');
  trace.setAttribute('aria-hidden', 'true');
  const [entryPath, exitPath] = [0, 1].map(() => trace.appendChild(document.createElementNS(svgNS, 'path')));
  section.append(trace, ball);
  section.dataset.dock = '';

  // as datas são marcas: nascem quando a bola toca nelas
  gsap.set(dots, { yPercent: -50, scale: 0 });
  const made = dots.map(() => false);
  function touch(i) {
    if (made[i]) return;
    made[i] = true;
    stamp(dots[i]);
    // o pó sai de onde a data está agora na tela (a linha pode estar deslocada pelo scroll lateral)
    const [r, origin] = [dots[i].getBoundingClientRect(), section.getBoundingClientRect()];
    dust(section, r.left + r.width / 2 - origin.left, r.top + r.height / 2 - origin.top);
  }
  let reached = -1;
  function hopTo(f, axis) {
    const n = dots.length - 1;
    const clamped = gsap.utils.clamp(0, n, f);
    hopAlong(section, ball, dots, clamped, axis);
    for (let i = reached + 1; i <= Math.floor(clamped + 0.06); i++) touch(i);
    reached = Math.max(reached, Math.floor(clamped + 0.06));
  }

  const dotAt = (i) => {
    const d = localOf(dots[i], section);
    return { x: d.x + d.width / 2, y: d.y };
  };
  const headBottom = () => localOf(head, section).y + head.offsetHeight;
  const overlay = { trace, entryPath, exitPath, ball };

  gsap.matchMedia().add('(max-width: 720px)', () => {
    const lastIndex = dots.length - 1;
    section.rallyDock = {
      el: section,
      overlay,
      frame: () => section,
      total: () => 0,
      points: () => {
        const first = dotAt(0);
        const last = dotAt(lastIndex);
        const trackBox = localOf(track, section);
        // entra pela faixa da direita, passa no vão entre o texto e a linha e pousa na primeira data
        const laneX = section.clientWidth - parseFloat(getComputedStyle(section).paddingRight) - 34;
        return {
          entry: [{ x: laneX, y: headBottom() + 8 }, { x: first.x, y: trackBox.y - 6 }, { ...first, contact: true }],
          exit: [{ ...last, contact: true }, { x: last.x, y: trackBox.y + trackBox.height }],
        };
      },
      // u: de 0 (primeira data) a 1 (última); a bola segue a altura do meio da tela, de data em data
      hop: (u) => {
        const ys = dots.map((_, i) => dotAt(i).y);
        const y = ys[0] + u * (ys[lastIndex] - ys[0]);
        let i = 0;
        while (i < lastIndex - 1 && y > ys[i + 1]) i++;
        hopTo(i + gsap.utils.clamp(0, 1, (y - ys[i]) / (ys[i + 1] - ys[i])), 'y');
      },
      passed: () => dots.forEach((_, i) => touch(i)),
    };
    return () => delete section.rallyDock;
  });

  gsap.matchMedia().add('(min-width: 721px)', () => {
    // medidas de layout (offset*), que não mudam com o translate já aplicado
    const distance = () => Math.max(0, track.offsetLeft + track.offsetWidth - section.clientWidth);
    const hold = () => window.innerHeight * 0.3; // a espera na primeira e na última data
    const travel = (p, total) => gsap.utils.clamp(0, 1, (p * total - hold()) / Math.max(1, distance()));
    const st = ScrollTrigger.create({
      trigger: section,
      // o pin começa quando a primeira data chega ao meio da tela: é onde a ponta do traço (e a bola) está
      start: () => `top ${window.innerHeight / 2 - dotAt(0).y}px`,
      end: () => `+=${distance() + 2 * hold()}`,
      pin: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => gsap.set(track, { x: -distance() * travel(self.progress, self.end - self.start) }),
    });
    const lastIndex = dots.length - 1;
    section.rallyDock = {
      el: section,
      overlay,
      frame: () => (section.parentElement.classList.contains('pin-spacer') ? section.parentElement : section),
      total: () => st.end - st.start,
      points: () => {
        const first = dotAt(0);
        const last = dotAt(lastIndex);
        const lastItem = localOf(items[lastIndex], section);
        const endX = last.x - distance();
        // sai pela linha, para a direita do texto da última data, e só então desce
        const outX = Math.min(section.clientWidth - 60, endX + items[lastIndex].offsetWidth);
        return {
          entry: [{ x: first.x, y: headBottom() + 8 }, { ...first, contact: true }],
          exit: [{ x: endX, y: last.y, contact: true }, { x: outX, y: last.y + 8 }, { x: outX, y: lastItem.y + lastItem.height + 16 }],
        };
      },
      // u: de 0 (pouso na primeira data) a 1 (saída da última), ao longo do pin inteiro
      hop: (u) => hopTo(travel(u, st.end - st.start) * lastIndex, 'x'),
      passed: () => dots.forEach((_, i) => touch(i)),
    };
    return () => {
      delete section.rallyDock;
      st.kill();
    };
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
