import { gsap } from 'gsap';
import { createMurRules } from './le-mur-rules.js';

// O Le Mur: o paredão do fim da página. A Bola só vem para cá quando o traço do rali chega ao ingresso
// (rally.finished()): primeiro ela fica pousada no ingresso, e salta para o saibro do jogo quando a quadra
// entra na tela. Daí em diante, as regras (le-mur-rules.js) conduzem a bola, e a raquete a rebate.
// Momentos da Bola aqui: away (no rali) → ticket (pousada no ingresso) → arriving (saltando) → court.
const ARRIVAL = 0.9; // s, o salto do ingresso até o saibro

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

export function createMur(section, { rally }) {
  const court = section.querySelector('[data-mur-court]');
  const floor = section.querySelector('[data-mur-floor]');
  const status = section.querySelector('[data-mur-status]');
  const score = section.querySelector('[data-mur-score]');
  const ticketMark = document.querySelector('.ticket .mark__oval');

  const ball = document.createElement('span');
  ball.className = 'court__ball mur__ball';
  ball.setAttribute('aria-hidden', 'true');
  ball.dataset.murBall = '';
  court.append(ball);

  let rules = null;
  let best = 0;
  let moment = 'away';
  const arrival = { t: 0, from: null };
  let lastError = null;
  let shown = '';

  // a quadra: a largura inteira, e a altura do topo até a linha de base (o chão)
  const floorY = () => floor.offsetTop;
  const radius = () => ball.offsetWidth / 2;
  function measure() {
    best = rules ? rules.state().best : best;
    rules = createMurRules({ width: court.clientWidth, height: floorY(), best });
  }

  // o centro do oval do ingresso, nas coordenadas da quadra (os dois rolam juntos: a distância não muda)
  function ticketPoint() {
    const t = ticketMark.getBoundingClientRect();
    const c = court.getBoundingClientRect();
    return { x: t.left + t.width / 2 - c.left, y: t.top + t.height / 2 - c.top - radius() };
  }

  function place({ x, y }, opacity = 1) {
    gsap.set(ball, { x, y, opacity });
  }

  function report() {
    const { phase, score: total, errors } = rules.state();
    const text = {
      idle: 'Rebata para começar',
      playing: '',
      waiting: `${lastError === 'out' ? 'Fora' : 'Dois quiques'}. Rebata para continuar`,
      over: `Fim de partida: ${plural(total, 'rebatida')}. Rebata para jogar de novo`,
    }[phase];
    const key = `${phase}|${total}|${errors}|${text}`;
    if (key === shown) return;
    shown = key;
    status.textContent = text;
    score.textContent = `${plural(total, 'rebatida')} · erros ${errors}/3`;
    Object.assign(section.dataset, { phase, score: total, errors });
  }

  gsap.ticker.add((_, deltaTime) => {
    if (!rules) measure();
    const dt = Math.min(deltaTime / 1000, 1 / 30);

    if (!rally.finished()) {
      moment = 'away';
      gsap.set(ball, { opacity: 0 });
      return;
    }
    if (moment === 'away') moment = 'ticket';
    if (moment === 'ticket') {
      place(ticketPoint());
      // salta quando a quadra já ocupa boa parte da tela
      if (court.getBoundingClientRect().top < window.innerHeight * 0.45) {
        Object.assign(arrival, { t: 0, from: ticketPoint() });
        moment = 'arriving';
      }
      return;
    }
    if (moment === 'arriving') {
      arrival.t = Math.min(1, arrival.t + dt / ARRIVAL);
      const { t, from } = arrival;
      const to = { x: rules.state().x, y: floorY() - radius() };
      const lift = 4 * t * (1 - t) * 80; // um pulinho para fora do ingresso, e a queda até o saibro
      place({ x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t * t - lift });
      if (t >= 1) moment = 'court';
      return;
    }

    for (const event of rules.step(dt)) if (event.type === 'error') lastError = event.reason;
    const { x, h } = rules.state();
    place({ x, y: floorY() - h - radius() });
    report();
  });

  window.addEventListener('resize', () => {
    if (rules && rules.state().phase !== 'playing') measure();
  });

  // o alvo da raquete: as cordas encostam na bola (coordenadas da tela)
  return {
    cooldown: 250,
    near(x, y, reach) {
      if (moment !== 'court') return false;
      const box = ball.getBoundingClientRect();
      return Math.hypot(box.left + box.width / 2 - x, box.top + box.height / 2 - y) < reach + box.width / 2;
    },
    hit: () => rules.hit(),
  };
}

// sem movimento, o Le Mur é um estado parado (ticket 34 completa este estado)
export function stillMur(section) {
  section.querySelector('[data-mur-status]').textContent = 'O jogo aparece com as animações ligadas';
  section.dataset.phase = 'still';
}
