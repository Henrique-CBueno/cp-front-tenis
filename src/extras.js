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
  // O rastro da bola na cena: a chegada, os arcos de cada pulo e a saída. Mora dentro da linha do tempo,
  // então corre para a esquerda junto com as datas no scroll lateral (o traço do rali corre por trás da cena).
  const svgNS = 'http://www.w3.org/2000/svg';
  const trace = document.createElementNS(svgNS, 'svg');
  trace.classList.add('histoire__trace');
  trace.setAttribute('aria-hidden', 'true');
  const [entryPath, exitPath] = [0, 1].map(() => trace.appendChild(document.createElementNS(svgNS, 'path')));
  const hops = dots.slice(1).map(() => trace.appendChild(document.createElementNS(svgNS, 'path')));
  track.append(trace);
  section.append(ball);
  section.dataset.dock = '';

  // os arcos dos pulos, nas coordenadas da linha: a mesma parábola que a bola faz em hopAlong
  // (x linear e a altura 4t(1-t)·lift é uma Bézier quadrática com o controle a 2·lift)
  let hopLengths = [];
  function layoutHops(axis) {
    const lift = axis === 'x' ? 30 : 18;
    const c = dots.map((dot) => {
      const d = localOf(dot, track);
      return { x: d.x + d.width / 2, y: d.y };
    });
    hopLengths = hops.map((path, i) => {
      const [a, b] = [c[i], c[i + 1]];
      const control = axis === 'x' ? { x: (a.x + b.x) / 2, y: a.y - 2 * lift } : { x: a.x + 2 * lift, y: (a.y + b.y) / 2 };
      path.setAttribute('d', `M${a.x},${a.y} Q${control.x},${control.y} ${b.x},${b.y}`);
      return path.getTotalLength();
    });
    drawHops();
  }
  let drawnTo = 0; // o rastro dos pulos fica: só cresce
  function drawHops() {
    hops.forEach((path, i) => {
      const length = hopLengths[i] || 0;
      path.style.strokeDasharray = `${length * gsap.utils.clamp(0, 1, drawnTo - i)} ${length + 1}`;
    });
  }

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
    if (clamped > drawnTo) {
      drawnTo = clamped;
      drawHops();
    }
    for (let i = reached + 1; i <= Math.floor(clamped + 0.06); i++) touch(i);
    reached = Math.max(reached, Math.floor(clamped + 0.06));
  }

  const dotAt = (i) => {
    const d = localOf(dots[i], section);
    return { x: d.x + d.width / 2, y: d.y };
  };
  const headBottom = () => localOf(head, section).y + head.offsetHeight;
  // onde termina o texto do título e da frase (o bloco ocupa a largura toda; o texto, não)
  const headTextRight = () => {
    const origin = section.getBoundingClientRect();
    const range = document.createRange();
    range.selectNodeContents(head);
    return Math.max(...[...range.getClientRects()].map((r) => r.right - origin.left));
  };
  const trackAt = () => localOf(track, section);

  gsap.matchMedia().add('(max-width: 720px)', () => {
    const lastIndex = dots.length - 1;
    section.rallyDock = {
      el: section,
      overlay: {
        trace,
        entryPath,
        exitPath,
        ball,
        shift: { entry: () => ({ x: -trackAt().x, y: -trackAt().y }), exit: () => ({ x: -trackAt().x, y: -trackAt().y }) },
      },
      frame: () => section,
      total: () => 0,
      points: () => {
        layoutHops('y');
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
    // As fases do pin, em pixels de scroll: a bola plana até 1891, espera, pula de data em data enquanto a
    // linha corre, espera em 2020 e salta para fora da linha. Os voos acontecem com a seção presa, então a
    // bola pode andar de lado com calma, em vez de dar um salto lateral no último instante.
    const vh = () => window.innerHeight;
    const phases = () => {
      const glide = vh() * 0.45;
      const hold = vh() * 0.2;
      const leap = vh() * 0.45;
      return { glide, hold, travel: Math.max(1, distance()), leap };
    };
    const totalOf = (p) => p.glide + 2 * p.hold + p.travel + p.leap;
    // a altura (na seção) que fica no meio da tela durante o pin: um pouco acima da linha, à direita da frase
    const anchorY = () => dotAt(0).y - 60;
    const travelAt = (t, p) => gsap.utils.clamp(0, 1, (t - p.glide - p.hold) / p.travel);
    const st = ScrollTrigger.create({
      trigger: section,
      start: () => `top ${vh() / 2 - anchorY()}px`,
      end: () => `+=${totalOf(phases())}`,
      pin: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = phases();
        const shift = distance() * travelAt(self.progress * totalOf(p), p);
        gsap.set(track, { x: -shift });
        // a parte vertical da chegada some nos primeiros passos do scroll lateral, antes de cruzar o título;
        // o voo rente à linha e os arcos dos pulos ficam
        entryPath.style.opacity = String(1 - gsap.utils.clamp(0, 1, shift / 240));
      },
    });
    const lastIndex = dots.length - 1;

    // os dois voos, desenhados dentro da linha do tempo (correm com ela, como os arcos dos pulos)
    const [glidePath, leapPath] = [0, 1].map(() => trace.appendChild(document.createElementNS(svgNS, 'path')));
    const geometry = { glide: 0, leap: 0, entry: null, exit: null };
    function layoutFlights() {
      const t = trackAt();
      const first = dotAt(0);
      const last = dotAt(lastIndex);
      const inX = Math.min(section.clientWidth * 0.6, headTextRight() + 48);
      const endX = last.x - distance();
      const outX = Math.min(section.clientWidth - 60, endX + items[lastIndex].offsetWidth);
      geometry.entry = { x: inX, y: anchorY() };
      geometry.exit = { x: outX, y: anchorY() };
      // chegada: continua descendo na direção em que vinha, deita sobre a linha e plana até pousar em 1891
      // (nas coordenadas da linha)
      const a = { x: inX - t.x, y: anchorY() - t.y };
      const d1 = { x: first.x - t.x, y: first.y - t.y };
      const c2x = d1.x + (a.x - d1.x) * 0.55;
      glidePath.setAttribute('d', `M${a.x},${a.y} C${a.x},${a.y + 50} ${c2x},${d1.y} ${d1.x},${d1.y}`);
      // saída: salta de 2020 para cima e para a direita e cai sobre o trecho de linha a mais (linha já no fim)
      const l = { x: last.x - t.x, y: last.y - t.y };
      const e = { x: outX - t.x + distance(), y: anchorY() - t.y };
      leapPath.setAttribute('d', `M${l.x},${l.y} Q${e.x},${l.y - 130} ${e.x},${e.y}`);
      geometry.glide = glidePath.getTotalLength();
      geometry.leap = leapPath.getTotalLength();
      draw(glidePath, geometry.glide, 0);
      draw(leapPath, geometry.leap, 0);
    }
    const draw = (path, length, f) => (path.style.strokeDasharray = `${length * f} ${length + 1}`);
    // o ponto de um voo na tela, nas coordenadas da seção (a linha pode estar deslocada)
    function along(path, length, f) {
      const point = path.getPointAtLength(length * f).matrixTransform(path.getScreenCTM());
      const origin = section.getBoundingClientRect();
      return { x: point.x - origin.left, y: point.y - origin.top };
    }
    let glided = 0;
    let leapt = 0;
    const smooth = gsap.parseEase('sine.inOut');

    section.rallyDock = {
      el: section,
      overlay: {
        trace,
        entryPath,
        exitPath,
        ball,
        // a saída é desenhada com a linha já no fim do scroll lateral
        shift: { entry: () => ({ x: -trackAt().x, y: -trackAt().y }), exit: () => ({ x: -trackAt().x + distance(), y: -trackAt().y }) },
      },
      frame: () => (section.parentElement.classList.contains('pin-spacer') ? section.parentElement : section),
      total: () => st.end - st.start,
      points: () => {
        layoutHops('x');
        layoutFlights();
        const lastItem = localOf(items[lastIndex], section);
        return {
          entry: [geometry.entry],
          // depois do salto, desce pela direita do texto de 2020
          exit: [geometry.exit, { x: geometry.exit.x, y: lastItem.y + lastItem.height + 16 }],
        };
      },
      // u: de 0 (a bola chega à direita da frase) a 1 (sai do salto), ao longo do pin inteiro
      hop: (u) => {
        const p = phases();
        const t = u * totalOf(p);
        const leapStart = p.glide + 2 * p.hold + p.travel;
        if (t < p.glide) {
          const f = smooth(t / p.glide);
          glided = Math.max(glided, f);
          draw(glidePath, geometry.glide, glided);
          const at = along(glidePath, geometry.glide, f);
          gsap.set(ball, { x: at.x, y: at.y, scaleX: 1, scaleY: 1, opacity: 1 });
          return;
        }
        if (glided < 1) {
          glided = 1;
          draw(glidePath, geometry.glide, 1);
        }
        if (t < leapStart) {
          hopTo(travelAt(t, p) * lastIndex, 'x');
          return;
        }
        hopTo(lastIndex, 'x');
        const f = smooth(gsap.utils.clamp(0, 1, (t - leapStart) / p.leap));
        leapt = Math.max(leapt, f);
        draw(leapPath, geometry.leap, leapt);
        const at = along(leapPath, geometry.leap, f);
        gsap.set(ball, { x: at.x, y: at.y, scaleX: 1, scaleY: 1, opacity: 1 });
      },
      passed: () => {
        dots.forEach((_, i) => touch(i));
        draw(glidePath, geometry.glide, 1);
        draw(leapPath, geometry.leap, 1);
      },
    };
    return () => {
      delete section.rallyDock;
      st.kill();
      glidePath.remove();
      leapPath.remove();
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
