import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LAYERS, depthAt, formatDepth } from './depth.js';
import { stamp, dust } from './impact.js';

// Sous la Terre: a escavação. A seção fica presa; a bola pousa no tijolo e deixa a marca; o scroll cava as
// cinco camadas (a pilha sobe uma tela por camada, cada textura com parallax) enquanto o medidor conta a
// profundidade real; no fundo, a câmera se afasta e mostra o corte inteiro em escala, com a marca no topo;
// a bola salta do topo do corte e cai, e o rali segue abaixo da cena.
// Como a Histoire, a cena é uma doca do rali (ver rally.js): ele entrega a bola no pouso e a recebe na saída.
// Sem movimento (reduced-motion), nada disso roda: o CSS mostra as camadas empilhadas e o corte no fim.
export function runSoil(section) {
  const column = section.querySelector('[data-soil-layers]');
  const textures = [...section.querySelectorAll('.soil__texture')];
  const mark = section.querySelector('[data-soil-mark]');
  const gauge = section.querySelector('[data-soil-depth]');
  const gaugeBox = section.querySelector('.soil__gauge');
  const cut = section.querySelector('[data-soil-cut]');
  const cutMark = section.querySelector('[data-soil-cut-mark]');
  const steps = LAYERS.length - 1;

  const ball = document.createElement('span');
  ball.className = 'court__ball soil__ball';
  ball.setAttribute('aria-hidden', 'true');
  ball.dataset.soilBall = '';
  const svgNS = 'http://www.w3.org/2000/svg';
  const trace = document.createElementNS(svgNS, 'svg');
  trace.classList.add('soil__trace');
  trace.setAttribute('aria-hidden', 'true');
  const [entryPath, exitPath] = [0, 1].map(() => trace.appendChild(document.createElementNS(svgNS, 'path')));
  section.append(trace, ball);
  section.dataset.dock = '';

  // posição de um elemento nas coordenadas da seção (medidas de layout: não mudam com transform)
  const localOf = (el) => {
    let x = 0;
    let y = 0;
    for (let node = el; node && node !== section; node = node.offsetParent) {
      x += node.offsetLeft;
      y += node.offsetTop;
    }
    return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2, right: x + el.offsetWidth };
  };
  // o centro de um elemento na tela, nas coordenadas da seção (com os transforms aplicados)
  const onScreen = (el) => {
    const [r, origin] = [el.getBoundingClientRect(), section.getBoundingClientRect()];
    return { x: r.left + r.width / 2 - origin.left, y: r.top + r.height / 2 - origin.top };
  };

  // as fases do pin, em pixels de scroll
  const phases = () => {
    const h = section.clientHeight;
    return { land: h * 0.3, dig: h * steps, rest: h * 0.2, cut: h, out: h * 0.4 };
  };
  const totalOf = (p) => p.land + p.dig + p.rest + p.cut + p.out;
  const digAt = (t, p) => gsap.utils.clamp(0, 1, (t - p.land) / p.dig);
  const cutAt = (t, p) => gsap.utils.clamp(0, 1, (t - p.land - p.dig - p.rest) / p.cut);

  function scene(t) {
    const p = phases();
    const f = digAt(t, p);
    const c = cutAt(t, p);
    // a pilha sobe uma tela por camada; cada textura corre um pouco mais devagar que a sua camada
    gsap.set(column, { yPercent: (-100 * steps * f) / LAYERS.length, scale: 1 - 0.35 * c, opacity: 1 - c });
    textures.forEach((img, i) => gsap.set(img, { yPercent: gsap.utils.clamp(-9, 9, (i - steps * f) * 9) }));
    gauge.textContent = formatDepth(depthAt(f));
    gsap.set(gaugeBox, { autoAlpha: 1 - c });
    // a câmera se afasta: o corte chega de perto e assenta no tamanho real
    gsap.set(cut, { autoAlpha: c, scale: 1.25 - 0.25 * c });
    // a parte vertical do traço da chegada some quando a superfície começa a subir
    entryPath.style.opacity = String(1 - gsap.utils.clamp(0, 1, f * 8));
  }

  // a marca do pouso e a marca no topo do corte nascem uma vez e ficam
  let landed = false;
  function land() {
    if (landed) return;
    landed = true;
    stamp(mark);
    const at = onScreen(mark);
    dust(section, at.x, at.y);
  }
  let cutMarked = false;
  function markCut() {
    if (cutMarked) return;
    cutMarked = true;
    stamp(cutMark, { instant: true });
  }

  const anchorY = () => localOf(mark).y;
  // a saída: à direita do corte inteiro (a fatia e a régua)
  const figure = section.querySelector('.soil__figure');
  const exitPoint = () => ({ x: Math.min(section.clientWidth - 30, localOf(figure).right + 50), y: anchorY() });

  const st = ScrollTrigger.create({
    trigger: section,
    // o pin começa quando a marca do tijolo chega ao meio da tela: é onde a bola pousa
    start: () => `top ${window.innerHeight / 2 - anchorY()}px`,
    end: () => `+=${totalOf(phases())}`,
    pin: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => scene(self.progress * (self.end - self.start)),
  });
  scene(0);

  const place = (at, extra = {}) => gsap.set(ball, { x: at.x, y: at.y, scaleX: 1, scaleY: 1, opacity: 1, ...extra });

  section.rallyDock = {
    el: section,
    overlay: { trace, entryPath, exitPath, ball, shift: { entry: () => ({ x: 0, y: 0 }), exit: () => ({ x: 0, y: 0 }) } },
    frame: () => (section.parentElement.classList.contains('pin-spacer') ? section.parentElement : section),
    total: () => st.end - st.start,
    points: () => {
      const m = localOf(mark);
      const e = exitPoint();
      return {
        entry: [{ x: m.x, y: m.y - 140 }, { x: m.x, y: m.y, contact: true }],
        exit: [e, { x: e.x, y: section.clientHeight - 24 }],
      };
    },
    // u: de 0 (o pouso no tijolo) a 1 (a bola no ar, ao lado do corte), ao longo do pin inteiro
    hop: (u) => {
      const p = phases();
      const t = u * totalOf(p);
      land();
      const c = cutAt(t, p);
      const outStart = p.land + p.dig + p.rest + p.cut;
      if (t < outStart) {
        if (c < 0.6) {
          // a bola fica na marca do tijolo e sobe com a superfície até sair da tela
          const at = onScreen(mark);
          place(at, { opacity: at.y > -20 ? 1 : 0 });
          return;
        }
        // a câmera se afastou: a bola reaparece na marca, no topo do corte
        markCut();
        place(onScreen(cutMark), { opacity: (c - 0.6) / 0.4 });
        return;
      }
      // o salto: do topo do corte para fora dele, caindo até a altura de onde o rali continua
      markCut();
      const o = gsap.utils.clamp(0, 1, (t - outStart) / p.out);
      const from = onScreen(cutMark);
      const to = exitPoint();
      const lift = 4 * o * (1 - o) * 120; // alto o bastante para passar por cima da régua do corte
      place({ x: from.x + (to.x - from.x) * o, y: from.y + (to.y - from.y) * o * o - lift });
    },
    passed: () => {
      land();
      markCut();
    },
  };
}
