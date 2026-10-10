import { gsap } from 'gsap';
import { buildRallyPath } from './rally-path.js';

const expoOut = gsap.parseEase('expo.out');
// o expo.out do GSAP termina em 0,999; no fim do trecho o estado precisa ser exatamente o final
const easeOut = (t) => (t >= 1 ? 1 : expoOut(t));

// quanto a ponta persegue o alvo a cada quadro: abaixo de 1, a bola desliza em vez de grudar no scroll
const INERTIA = 0.16;

// O rali: depois do saque, a bola desce a página por um traço contínuo e suave. Dentro de cada seção ela passa
// por um espaço reservado ([data-lane]), onde fica a marca da seção; entre as seções ela cruza a página em arco,
// quicando nos respiros ([data-respiro]). A ponta do traço segue a altura do meio da tela, com inércia.
export function createRally({ container, start }) {
  const svg = container.querySelector('[data-rally-trace]');
  const path = container.querySelector('[data-rally-path]');
  const ball = container.querySelector('[data-rally-ball]');
  const marks = [...container.querySelectorAll('[data-chapter-mark]')].map((mark) => ({
    oval: mark.querySelector('.mark__oval'),
    caption: mark.querySelector('.mark__caption'),
    y: 0,
  }));

  let rally = null;
  let length = 0;
  let lengthAtY = [];
  let head = null;

  // posição de um elemento em coordenadas do container (medidas de layout: não mudam com transform)
  function boxOf(el) {
    let x = 0;
    let y = 0;
    for (let node = el; node && node !== container; node = node.offsetParent) {
      x += node.offsetLeft;
      y += node.offsetTop;
    }
    return { x, y, width: el.offsetWidth, height: el.offsetHeight };
  }

  const centerOf = (el) => {
    const box = boxOf(el);
    return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  };

  // Os pontos de passagem, na ordem do documento: a marca e a saída de cada espaço reservado,
  // os quiques de cada respiro (cruzando da estação anterior para a seguinte) e a marca final (o ingresso).
  function waypoints() {
    const stations = [];
    for (const el of container.querySelectorAll('[data-lane], [data-respiro], .ticket [data-chapter-mark]')) {
      if (!el.offsetParent) continue; // espaço que só existe em outra largura de tela
      if (el.matches('[data-respiro]')) {
        stations.push({ respiro: el });
        continue;
      }
      if (el.matches('[data-chapter-mark]')) {
        stations.push({ points: [{ ...centerOf(el.querySelector('.mark__oval')), contact: true }] });
        continue;
      }
      const box = boxOf(el);
      const x = box.x + box.width / 2;
      const mark = el.querySelector('[data-chapter-mark] .mark__oval');
      const top = mark ? { ...centerOf(mark), contact: true } : { x, y: box.y + 24 };
      stations.push({ points: [top, { x: top.x, y: box.y + box.height - 24 }] });
    }

    const points = [{ ...start(), contact: true }];
    stations.forEach((station, i) => {
      if (!station.respiro) {
        points.push(...station.points);
        return;
      }
      const box = boxOf(station.respiro);
      const fromX = points[points.length - 1].x;
      const next = stations.slice(i + 1).find((s) => s.points);
      const toX = next ? next.points[0].x : fromX;
      const bounces = Number(station.respiro.dataset.bounces || 1);
      for (let k = 1; k <= bounces; k++) {
        const t = k / (bounces + 1);
        points.push({ x: fromX + (toX - fromX) * t, y: box.y + box.height * t, contact: true });
      }
    });

    // y estritamente crescente (o traço é x = f(y))
    return points.filter((p, i) => i === 0 || p.y > points[i - 1].y + 4);
  }

  function measure() {
    svg.setAttribute('viewBox', `0 0 ${container.clientWidth} ${container.clientHeight}`);
    for (const mark of marks) mark.y = centerOf(mark.oval).y;

    rally = buildRallyPath(waypoints());
    path.setAttribute('d', rally.d);
    length = path.getTotalLength();
    path.style.strokeDasharray = `${length} ${length}`;

    const samples = 600;
    lengthAtY = Array.from({ length: samples + 1 }, (_, i) => {
      const at = (length * i) / samples;
      return { at, y: path.getPointAtLength(at).y };
    });
  }

  function lengthForY(y) {
    const found = lengthAtY.find((sample) => sample.y >= y);
    return found ? found.at : length;
  }

  // target: a altura, no container, onde a ponta do traço deve estar (o meio da tela).
  // instant: pula a inércia (reduced-motion, ou o estado final).
  function render(target, { instant = false } = {}) {
    if (!rally) measure();
    head = instant || head === null || !Number.isFinite(target) ? target : head + (target - head) * INERTIA;

    const drawn = lengthForY(head);
    path.style.strokeDashoffset = length - drawn;

    const tip = rally.pointAtY(Math.min(head, lengthAtY[lengthAtY.length - 1].y));
    gsap.set(ball, { x: tip.x, y: tip.y, opacity: drawn > 0 && drawn < length ? 1 : 0 });

    for (const mark of marks) {
      const sink = easeOut(gsap.utils.clamp(0, 1, (head - mark.y + 40) / 110));
      gsap.set(mark.oval, { scale: sink });
      gsap.set(mark.caption, { opacity: sink, y: (1 - sink) * 12 });
    }
  }

  return { render, measure };
}
