import { gsap } from 'gsap';
import { buildRallyPath } from './rally-path.js';
import { stamp, erase, dust as dustAt } from './impact.js';

// quanto a ponta persegue o alvo a cada quadro: abaixo de 1, a bola desliza em vez de grudar no scroll
const INERTIA = 0.16;

// O rali: depois do saque, a bola desce a página por um traço contínuo e suave. Dentro de cada seção ela passa
// por um espaço reservado ([data-lane]), onde fica a marca da seção; entre as seções ela cruza a página em arco,
// quicando nos respiros ([data-respiro]). A ponta do traço segue a altura do meio da tela, com inércia.
export function createRally({ container, start }) {
  const svg = container.querySelector('[data-rally-trace]');
  const path = container.querySelector('[data-rally-path]');
  const ball = container.querySelector('[data-rally-ball]');
  const shadow = container.querySelector('[data-rally-shadow]');
  const ground = container.querySelector('[data-rally-ground]');
  let bounceMarks = [];
  let drawnNow = 0; // quanto do traço já foi desenhado: a bola do hero passa a vez quando ele começa
  const marks = [...container.querySelectorAll('[data-chapter-mark]')].map((mark) => ({
    oval: mark.querySelector('.mark__oval'),
    caption: mark.querySelector('.mark__caption'),
    y: 0,
    made: false,
  }));

  let rally = null;
  let length = 0;
  let lengthAtY = [];
  let head = null;
  // a rebatida da raquete: um pulinho somado à altura do arco; acaba em 0, então a bola volta ao traço
  const kick = { y: 0 };
  // o tranco do quique na bola: 1 no toque, volta a 0 em ~0,2 s (achata mais e a inércia cai um instante)
  const jolt = { v: 0 };
  // depois de medir de novo, as marcas que já ficaram para trás são refeitas sem animação
  let settle = true;
  let tipNow = null;

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

  // Docas: cenas presas que recebem a bola (a Histoire). A cena informa por onde a bola entra e sai, em
  // coordenadas dela; o rali desenha a entrada e a saída do traço por cima da cena e entrega a bola a ela no meio.
  let docks = [];

  // Os pontos de passagem, na ordem do documento: a marca e a saída de cada espaço reservado,
  // os quiques de cada respiro (cruzando da estação anterior para a seguinte), as docas e a marca final (o ingresso).
  function waypoints() {
    const stations = [];
    docks = [];
    for (const el of container.querySelectorAll('[data-lane], [data-respiro], [data-dock], .ticket [data-chapter-mark]')) {
      if (el.matches('[data-dock]')) {
        const dock = el.rallyDock;
        if (!dock) continue; // sem doca (reduced-motion): a bola passa por trás da cena
        // durante o pin a cena fica fixa; a posição dela na página é a do pin-spacer
        const frame = dock.frame();
        const offIn = boxOf(frame).y;
        const offOut = offIn + dock.total();
        const { entry, exit } = dock.points();
        const inPoints = entry.map((p) => ({ ...p, y: p.y + offIn }));
        const outPoints = exit.map((p) => ({ ...p, y: p.y + offOut }));
        docks.push({
          dock,
          offIn,
          offOut,
          inY: inPoints[inPoints.length - 1].y,
          outY: outPoints[0].y,
          bottom: offOut + el.offsetHeight,
        });
        stations.push({ points: [...inPoints, ...outPoints] });
        continue;
      }
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
      const bottom = { x: top.x, y: box.y + box.height - 24 };
      // num espaço comprido ([data-sway]) a bola não desce reta: quica de um lado para o outro dentro dele
      const sway = [];
      if (el.matches('[data-sway]')) {
        const count = Math.max(1, Math.round((bottom.y - top.y) / 480) - 1);
        for (let k = 1; k <= count; k++) {
          const side = k % 2 ? 1 : -1;
          sway.push({ x: x + side * box.width * 0.28, y: top.y + ((bottom.y - top.y) * k) / (count + 1), contact: true, bounce: true });
        }
      }
      stations.push({ points: [top, ...sway, bottom] });
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
        points.push({ x: fromX + (toX - fromX) * t, y: box.y + box.height * t, contact: true, bounce: true });
      }
    });

    // y estritamente crescente (o traço é x = f(y))
    return points.filter((p, i) => i === 0 || p.y > points[i - 1].y + 4);
  }

  function measure() {
    svg.setAttribute('viewBox', `0 0 ${container.clientWidth} ${container.clientHeight}`);
    for (const mark of marks) mark.y = centerOf(mark.oval).y;

    const points = waypoints();
    rally = buildRallyPath(points);

    // uma mini marca no saibro para cada quique dos respiros (as marcas das seções já existem no layout)
    ground.replaceChildren();
    bounceMarks = points
      .filter((p) => p.bounce)
      .map((p) => {
        const el = document.createElement('span');
        el.className = 'rally__bounce';
        el.style.left = `${p.x}px`;
        el.style.top = `${p.y}px`;
        ground.append(el);
        return { el, x: p.x, y: p.y, made: false };
      });
    settle = true;
    path.setAttribute('d', rally.d);
    length = path.getTotalLength();
    path.style.strokeDasharray = `${length} ${length}`;

    const samples = 600;
    lengthAtY = Array.from({ length: samples + 1 }, (_, i) => {
      const at = (length * i) / samples;
      return { at, y: path.getPointAtLength(at).y };
    });

    for (const d of docks) {
      const { trace, entryPath, exitPath, shift } = d.dock.overlay;
      const host = trace.parentElement;
      trace.setAttribute('viewBox', `0 0 ${host.offsetWidth} ${host.offsetHeight}`);
      // o desenho pode morar num elemento que se move dentro da cena (a linha do tempo): shift leva das
      // coordenadas da cena para as dele, na entrada e na saída
      for (const [p, off, s] of [[entryPath, d.offIn, shift.entry()], [exitPath, d.offOut, shift.exit()]]) {
        p.setAttribute('d', rally.d);
        p.setAttribute('transform', `translate(${s.x} ${s.y - off})`);
      }
      // exatos (a tabela tem um ponto a cada ~25 px): o traço da chegada termina na bola, sem passar dela
      d.lin = exactLengthForY(d.inY);
      d.lout = exactLengthForY(d.outY);
    }
  }

  // A bola sobre a cena: na entrada e na saída ela segue o traço (no mesmo ponto em que estaria a do rali,
  // que fica escondida atrás da cena opaca); entre a primeira e a última data, a cena a conduz.
  function renderDocks(drawn, tip, height) {
    for (const d of docks) {
      const { entryPath, exitPath, ball: docked } = d.dock.overlay;
      entryPath.style.strokeDasharray = `${Math.min(drawn, d.lin)} ${length}`;
      exitPath.style.strokeDasharray = `0 ${d.lout} ${Math.max(0, drawn - d.lout)} ${length}`;
      // um traço de comprimento zero com ponta redonda vira um ponto: some até ter comprimento
      entryPath.style.visibility = drawn > 0.5 ? 'visible' : 'hidden';
      exitPath.style.visibility = drawn - d.lout > 0.5 ? 'visible' : 'hidden';

      // a bola voltou para antes da cena: as marcas dela se desfazem
      if (!(head > d.inY)) d.dock.before?.();
      const near = head > d.offIn - 300 && head < d.bottom + 300;
      if (!near || !Number.isFinite(head)) {
        gsap.set(docked, { opacity: 0 });
        continue;
      }
      if (head > d.inY && head < d.outY) {
        d.dock.hop((head - d.inY) / (d.outY - d.inY));
        continue;
      }
      if (head >= d.outY) d.dock.passed(); // as datas que ficaram para trás já são marcas
      const off = head <= d.inY ? d.offIn : d.offOut;
      const y = tip.y - height * 0.6 - off;
      gsap.set(docked, {
        x: tip.x,
        y,
        scaleX: 1 + height / 420,
        scaleY: 1 + height / 420,
        // fora da cena quem aparece é a bola do rali; a da cena só existe dentro dela
        opacity: y > -15 && y < d.dock.el.clientHeight + 15 ? 1 : 0,
      });
    }
  }

  // o comprimento do traço em que ele chega à altura y, por bisseção (o traço só desce: y cresce com o comprimento)
  function exactLengthForY(y) {
    let [lo, hi] = [0, length];
    for (let i = 0; i < 30; i++) {
      const mid = (lo + hi) / 2;
      if (path.getPointAtLength(mid).y < y) lo = mid;
      else hi = mid;
    }
    return hi;
  }

  function lengthForY(y) {
    const found = lengthAtY.find((sample) => sample.y >= y);
    return found ? found.at : length;
  }

  const dust = (x, y) => dustAt(ground, x, y);

  // target: a altura, no container, onde a ponta do traço deve estar (o meio da tela).
  // instant: pula a inércia (reduced-motion, ou o estado final).
  function render(target, { instant = false } = {}) {
    if (!rally) measure();
    const previous = head;
    const inertia = INERTIA * (1 - 0.75 * jolt.v);
    head = instant || head === null || !Number.isFinite(target) ? target : head + (target - head) * inertia;

    const drawn = lengthForY(head);
    drawnNow = drawn;
    path.style.strokeDashoffset = length - drawn;

    // o traço é o chão (a sombra corre sobre ele); a bola sobe acima da sombra conforme a altura do arco
    const groundY = Math.min(head, lengthAtY[lengthAtY.length - 1].y);
    const tip = rally.pointAtY(groundY);
    const height = rally.heightAt(groundY);
    const visible = drawn > 0 && drawn < length;
    const squash = height < 6 ? 1 - (6 - height) / 6 : 1; // 0 no chão, 1 no ar
    tipNow = tip;
    renderDocks(drawn, tip, height);
    gsap.set(ball, {
      x: tip.x,
      y: tip.y - height * 0.6 - kick.y,
      scaleX: (1 + height / 420) * (1 + 0.2 * (1 - squash)) * (1 + 0.3 * jolt.v),
      scaleY: (1 + height / 420) * (1 - 0.28 * (1 - squash)) * (1 - 0.32 * jolt.v),
      opacity: visible ? 1 : 0,
    });
    gsap.set(shadow, {
      x: tip.x,
      y: tip.y,
      scale: Math.max(0.45, 1 - height / 220),
      opacity: visible ? Math.max(0.12, 0.5 - height / 320) : 0,
    });

    // pó quando a ponta passa por um contato, descendo a página
    if (Number.isFinite(previous) && Number.isFinite(head) && head > previous) {
      for (const c of rally.contacts) if (c.y > previous && c.y <= head) dust(c.x, c.y);
    }

    // Cada marca nasce no instante em que a ponta cruza o contato, descendo, e se desfaz quando ela volta para
    // antes dele, subindo: as marcas acompanham a bola. Sem um cruzamento de verdade (primeira medida,
    // reduced-motion, salto), o estado vem pronto, sem animação.
    const moving = !instant && !settle && Number.isFinite(previous) && Number.isFinite(head);
    for (const mark of [...marks, ...bounceMarks]) {
      const reached = head >= mark.y;
      if (mark.made && !reached) {
        erase(mark.oval || mark.el, { caption: mark.caption, instant: !(moving && mark.y <= previous) });
        mark.made = false;
        continue;
      }
      if (mark.made && !settle) continue;
      if (!reached) continue;
      const live = moving && head > previous && mark.y > previous;
      if (!mark.made && live) gsap.fromTo(jolt, { v: 1 }, { v: 0, duration: 0.22, ease: 'power2.out', overwrite: true });
      stamp(mark.oval || mark.el, { caption: mark.caption, instant: mark.made || !live });
      mark.made = true;
    }
    settle = false;
  }

  // a raquete-cursor encosta na bola? (coordenadas da tela)
  function near(x, y, reach) {
    if (Number(gsap.getProperty(ball, 'opacity')) === 0) return false;
    const box = ball.getBoundingClientRect();
    return Math.hypot(box.left + box.width / 2 - x, box.top + box.height / 2 - y) < reach + box.width / 2;
  }

  function hit() {
    if (gsap.isTweening(kick) || !tipNow) return;
    dust(tipNow.x, tipNow.y);
    gsap.timeline()
      .to(kick, { y: 70, duration: 0.28, ease: 'power2.out' })
      .to(kick, { y: 0, duration: 0.42, ease: 'bounce.out' });
  }

  return { render, measure, near, hit, started: () => drawnNow > 0 };
}
