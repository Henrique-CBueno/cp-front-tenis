import { gsap } from 'gsap';

// A raquete-cursor (só desktop com mouse, sem reduced-motion). O centro das cordas fica exatamente no ponteiro,
// então o clique cai onde a raquete aponta. A mola fica no ângulo: o cabo vem atrasado, balançando com o movimento.
// No clique, um impulso no ângulo faz o swing. Sobre links e botões, a raquete fica de pé ("posição de espera").
// Quando as cordas passam pela bola de um alvo (o rali, o Le Mur), o alvo é rebatido (hit). Cada alvo tem o seu
// intervalo mínimo entre duas rebatidas (cooldown, em ms).
const SPOT = { x: 30, y: 32 }; // o sweet spot no viewBox da raquete
const REST = -35; // em graus: o cabo para baixo e para a direita
const READY = -8;
const STIFFNESS = 0.08;
const DAMPING = 0.78;

const SVG = `
<svg viewBox="0 0 60 130" width="60" height="130" aria-hidden="true">
  <g class="racket__strings">
    ${[14, 20, 26, 32, 38, 44, 50].map((y) => `<line x1="6" y1="${y}" x2="54" y2="${y}" />`).join('')}
    ${[12, 18, 24, 30, 36, 42, 48].map((x) => `<line x1="${x}" y1="2" x2="${x}" y2="62" />`).join('')}
  </g>
  <ellipse class="racket__face" cx="30" cy="32" rx="22" ry="28" />
  <path class="racket__frame" d="M30 4 C 44 4 53 17 53 32 C 53 47 44 60 30 60 C 16 60 7 47 7 32 C 7 17 16 4 30 4 Z M22 59 L30 80 L38 59" />
  <rect class="racket__handle" x="26.5" y="79" width="7" height="47" rx="2.5" />
  <path class="racket__grip" d="M26.5 88 L33.5 94 M26.5 98 L33.5 104 M26.5 108 L33.5 114 M26.5 118 L33.5 124" />
</svg>`;

export function createRacket({ onHit } = {}) {
  const racket = document.createElement('div');
  racket.className = 'racket';
  racket.dataset.racket = '';
  racket.innerHTML = SVG;
  racket.style.transformOrigin = `${SPOT.x}px ${SPOT.y}px`;
  document.body.append(racket);
  document.documentElement.classList.add('has-racket');

  const pointer = { x: -200, y: -200, vx: 0, seen: false };
  let angle = REST;
  let spin = 0;
  let ready = false;
  const targets = [onHit].flat().filter(Boolean);
  const lastHit = new Map();

  window.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse') return;
      pointer.vx = event.clientX - pointer.x;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.seen = true;
      ready = Boolean(event.target.closest?.('a, button, [tabindex]:not([tabindex="-1"]), label, summary'));
      racket.classList.toggle('is-on-chalk', Boolean(event.target.closest?.('[data-racket-dark]')));
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => (pointer.seen = false));
  window.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse') spin -= 26; // o swing: um impulso; a mola traz de volta
  });

  gsap.ticker.add(() => {
    // a mola do ângulo: o movimento na horizontal inclina a raquete, e ela volta balançando
    const target = (ready ? READY : REST) + gsap.utils.clamp(-28, 28, pointer.vx * 1.4);
    spin = (spin + (target - angle) * STIFFNESS) * DAMPING;
    angle += spin;
    pointer.vx *= 0.7;

    racket.classList.toggle('is-ready', ready);
    gsap.set(racket, {
      x: pointer.x - SPOT.x,
      y: pointer.y - SPOT.y,
      rotation: angle,
      scale: ready ? 0.9 : 1,
      autoAlpha: pointer.seen ? 1 : 0,
    });

    if (!pointer.seen) return;
    const now = performance.now();
    for (const target of targets) {
      if (now - (lastHit.get(target) ?? 0) < (target.cooldown ?? 700)) continue;
      if (!target.near(pointer.x, pointer.y, 26)) continue;
      lastHit.set(target, now);
      target.hit({ x: pointer.x, y: pointer.y });
    }
  });

  return racket;
}

// a raquete só existe com um mouse de verdade e com movimento permitido
export const racketAllowed = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
