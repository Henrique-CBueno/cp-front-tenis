import { gsap } from 'gsap';

const expoOut = gsap.parseEase('expo.out');
// o expo.out do GSAP termina em 0,999; no fim do trecho o estado precisa ser exatamente o final
const easeOut = (t) => (t >= 1 ? 1 : expoOut(t));

// O traço corre pela borda da página (onde nunca há conteúdo) e atravessa para cada marca no respiro acima
// dela. No desktop o texto alterna de lado, então a borda é a do lado da próxima marca; no celular o texto
// ocupa a esquerda, então a borda é sempre a direita.
function railPath(points, width) {
  const turn = 64;
  const railFor = (b) => (width > 720 && b.x < width / 2 ? 12 : width - 12);
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const [a, b] = [points[i - 1], points[i]];
    const rail = railFor(b);
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
    path.setAttribute('d', railPath(points, width));
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
      const sink = easeOut(gsap.utils.clamp(0, 1, (headY - mark.y + 40) / 110));
      gsap.set(mark.oval, { scale: sink });
      gsap.set(mark.caption, { opacity: sink, y: (1 - sink) * 12 });
    }
  }

  return { render, measure };
}
