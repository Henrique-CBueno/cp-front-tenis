import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stamp, erase, dust } from './impact.js';

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
function localOf(el, ancestor) {
  let x = 0;
  let y = 0;
  for (let node = el; node && node !== ancestor; node = node.offsetParent) {
    x += node.offsetLeft;
    y += node.offsetTop;
  }
  return { x, y, width: el.offsetWidth, height: el.offsetHeight };
}

// Histoire: no desktop a seção fica presa e a linha do tempo corre na horizontal, conduzida pelo scroll.
// A bola chega descendo pela esquerda (o título fica à direita) e pousa em 1891 no instante em que a seção
// prende; espera, pula de data em data enquanto a linha corre, espera em 2020 e sai descendo pelo vão antes
// dela. No celular a linha fica de pé (CSS), sem pin, com a mesma chegada e a mesma saída. Sem movimento
// (reduced-motion), nada disso roda e a bola do rali passa por trás da seção.
export function runTimeline(section) {
  const track = section.querySelector('[data-timeline-track]');
  const dots = [...section.querySelectorAll('.timeline__dot')];
  const items = [...section.querySelectorAll('.timeline__item')];
  const lastIndex = dots.length - 1;

  const ball = document.createElement('span');
  ball.className = 'court__ball timeline__ball';
  ball.setAttribute('aria-hidden', 'true');
  ball.dataset.timelineBall = '';
  // O rastro da chegada e da saída, desenhado por cima da cena (o traço do rali corre por trás dela). Mora
  // dentro da linha do tempo: no scroll lateral, a chegada fica para trás junto com as datas.
  const svgNS = 'http://www.w3.org/2000/svg';
  const trace = document.createElementNS(svgNS, 'svg');
  trace.classList.add('histoire__trace');
  trace.setAttribute('aria-hidden', 'true');
  const [entryPath, exitPath] = [0, 1].map(() => trace.appendChild(document.createElementNS(svgNS, 'path')));
  track.append(trace);
  section.append(ball);
  section.dataset.dock = '';

  // as datas são marcas: nascem quando a bola toca nelas e se desfazem quando ela volta para antes delas
  // (o CSS já centra a data na linha com translateY(-50%); o GSAP assume esse deslocamento como yPercent)
  gsap.set(dots, { y: 0, yPercent: -50, scale: 0 });
  const made = dots.map(() => false);
  function touch(i) {
    if (made[i]) return;
    made[i] = true;
    stamp(dots[i]);
    // o pó sai de onde a data está agora na tela (a linha pode estar deslocada pelo scroll lateral)
    const [r, origin] = [dots[i].getBoundingClientRect(), section.getBoundingClientRect()];
    dust(section, r.left + r.width / 2 - origin.left, r.top + r.height / 2 - origin.top);
  }
  function untouch(i) {
    if (!made[i]) return;
    made[i] = false;
    erase(dots[i]);
  }
  function hopTo(f, axis) {
    const clamped = gsap.utils.clamp(0, lastIndex, f);
    hopAlong(section, ball, dots, clamped, axis);
    const reached = Math.floor(clamped + 0.06);
    dots.forEach((_, i) => (i <= reached ? touch(i) : untouch(i)));
  }

  const dotAt = (i) => {
    const d = localOf(dots[i], section);
    return { x: d.x + d.width / 2, y: d.y };
  };
  const trackAt = () => localOf(track, section);
  const shift = { entry: () => ({ x: -trackAt().x, y: -trackAt().y }) };
  const passed = () => dots.forEach((_, i) => touch(i));
  const before = () => dots.forEach((_, i) => untouch(i));

  gsap.matchMedia().add('(max-width: 720px)', () => {
    section.rallyDock = {
      el: section,
      overlay: { trace, entryPath, exitPath, ball, shift: { ...shift, exit: shift.entry } },
      frame: () => section,
      total: () => 0,
      points: () => {
        const first = dotAt(0);
        const last = dotAt(lastIndex);
        const trackBox = localOf(track, section);
        // desce pela esquerda, ao lado da linha, pousa em 1891; depois de 2020 segue descendo pela própria linha
        return {
          entry: [{ x: first.x, y: first.y - 60 }, { ...first, contact: true }],
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
      passed,
      before,
    };
    return () => delete section.rallyDock;
  });

  gsap.matchMedia().add('(min-width: 721px)', () => {
    // medidas de layout (offset*), que não mudam com o translate já aplicado
    const distance = () => Math.max(0, track.offsetLeft + track.offsetWidth - section.clientWidth);
    // a ponta da linha, com a linha já no fim do scroll lateral: no meio do trecho a mais depois de 2020
    const lineEnd = () => {
      const last = localOf(items[lastIndex], section);
      const right = section.clientWidth;
      const after = last.x + last.width - distance();
      return { x: Math.min(right - 40, after + (right - after) * 0.55), y: dotAt(lastIndex).y };
    };
    const hold = () => window.innerHeight * 0.25; // a espera em 1891 e em 2020
    const out = () => window.innerHeight * 0.3; // o último pulo, de 2020 até o fim da linha
    const travelAt = (t) => gsap.utils.clamp(0, 1, (t - hold()) / Math.max(1, distance()));
    const st = ScrollTrigger.create({
      trigger: section,
      // o pin começa quando 1891 chega ao meio da tela: é onde a ponta do traço (e a bola) está
      start: () => `top ${window.innerHeight / 2 - dotAt(0).y}px`,
      end: () => `+=${distance() + 2 * hold() + out()}`,
      pin: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => gsap.set(track, { x: -distance() * travelAt(self.progress * (self.end - self.start)) }),
    });
    section.rallyDock = {
      el: section,
      // a saída é desenhada com a linha já no fim do scroll lateral
      overlay: { trace, entryPath, exitPath, ball, shift: { ...shift, exit: () => ({ x: -trackAt().x + distance(), y: -trackAt().y }) } },
      frame: () => (section.parentElement.classList.contains('pin-spacer') ? section.parentElement : section),
      total: () => st.end - st.start,
      points: () => {
        const first = dotAt(0);
        const end = lineEnd();
        const lastItem = localOf(items[lastIndex], section);
        // desce reto pela esquerda (o título está à direita) e pousa em 1891; no fim, cai da ponta da linha
        return {
          entry: [{ x: first.x, y: first.y - 120 }, { ...first, contact: true }],
          exit: [{ ...end, contact: true }, { x: end.x, y: lastItem.y + lastItem.height + 16 }],
        };
      },
      // u: de 0 (pouso em 1891) a 1 (a bola na ponta da linha), ao longo do pin inteiro
      hop: (u) => {
        const t = u * (st.end - st.start);
        const leave = 2 * hold() + distance();
        if (t < leave) {
          hopTo(travelAt(t) * lastIndex, 'x');
          return;
        }
        // o último pulo segue para a direita, como os outros: de 2020 até a ponta da linha
        hopTo(lastIndex, 'x');
        const f = gsap.utils.clamp(0, 1, (t - leave) / out());
        const from = dotAt(lastIndex);
        const a = { x: from.x - distance(), y: from.y };
        const b = lineEnd();
        const lift = 4 * f * (1 - f) * 30;
        const ground = f > 0.94;
        gsap.set(ball, {
          x: a.x + (b.x - a.x) * f,
          y: a.y - lift,
          scaleX: ground ? 1.18 : 1,
          scaleY: ground ? 0.74 : 1,
          opacity: 1,
        });
      },
      passed,
      before,
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
