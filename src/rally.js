import { gsap } from 'gsap';

const easeOut = gsap.parseEase('expo.out');

// Desktop: o texto alterna de lado, então o traço sai da marca na horizontal (ao lado do oval não há texto),
// desce na coluna da próxima marca (vazia) e chega a ela por cima.
function swingPath(points) {
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const [a, b] = [points[i - 1], points[i]];
    const dy = b.y - a.y;
    d += ` C${b.x},${a.y} ${b.x},${b.y - dy * 0.6} ${b.x},${b.y}`;
  }
  return d;
}

// Celular: o texto ocupa a esquerda, então o traço desce pela margem direita
// e atravessa para cada marca no respiro acima dela.
function railPath(points, width) {
  const rail = width - 10;
  const turn = 64;
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const [a, b] = [points[i - 1], points[i]];
    d += ` C${rail},${a.y} ${rail},${a.y} ${rail},${a.y + turn}`;
    d += ` L${rail},${b.y - turn}`;
    d += ` C${rail},${b.y - turn / 3} ${b.x},${b.y - turn} ${b.x},${b.y}`;
  }
  return d;
}

// O rali: um traço contínuo que desce a página e liga as marcas das seções. A ponta do traço (a bola)
// fica sempre na altura do meio da tela; cada marca afunda no saibro quando o traço chega até ela.
export function createRally({ container, start }) {
  const svg = container.querySelector('[data-rally-trace]');
  const path = container.querySelector('[data-rally-path]');
  const ball = container.querySelector('[data-rally-ball]');
  const marks = [...container.querySelectorAll('[data-chapter-mark]')].map((mark) => ({
    oval: mark.querySelector('.mark__oval'),
    caption: mark.querySelector('.mark__caption'),
    y: 0,
  }));

  let length = 0;
  let lengthAtY = [];

  // centro de um oval em coordenadas do container (medidas de layout: o oval começa em scale(0))
  function centerOf(oval) {
    let x = oval.offsetWidth / 2;
    let y = oval.offsetHeight / 2;
    for (let el = oval; el && el !== container; el = el.offsetParent) {
      x += el.offsetLeft;
      y += el.offsetTop;
    }
    return { x, y };
  }

  function measure() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // da Marca 01 (no hero, acima do container) a cada marca; curvas que só descem, para a ponta seguir o scroll
    const points = [start()];
    for (const mark of marks) {
      const center = centerOf(mark.oval);
      mark.y = center.y;
      points.push(center);
    }
    path.setAttribute('d', width <= 720 ? railPath(points, width) : swingPath(points));
    length = path.getTotalLength();
    path.style.strokeDasharray = `${length} ${length}`;

    const samples = 400;
    lengthAtY = Array.from({ length: samples + 1 }, (_, i) => {
      const at = (length * i) / samples;
      return { at, y: path.getPointAtLength(at).y };
    });
  }

  function lengthForY(y) {
    const found = lengthAtY.find((sample) => sample.y >= y);
    return found ? found.at : length;
  }

  // headY: a altura, no container, onde a ponta do traço deve estar
  function render(headY) {
    if (!length) measure();
    const drawn = lengthForY(headY);
    path.style.strokeDashoffset = length - drawn;

    const tip = path.getPointAtLength(drawn);
    gsap.set(ball, { x: tip.x, y: tip.y, opacity: drawn > 0 && drawn < length ? 1 : 0 });

    for (const mark of marks) {
      const sink = easeOut(gsap.utils.clamp(0, 1, (headY - mark.y + 40) / 160));
      gsap.set(mark.oval, { scale: sink });
      gsap.set(mark.caption, { opacity: sink, y: (1 - sink) * 12 });
    }
  }

  return { render, measure };
}
