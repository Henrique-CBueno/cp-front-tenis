import { gsap } from 'gsap';
import { createMurRules } from './le-mur-rules.js';

// O Le Mur: o paredão do fim da página. A Bola só vem para cá quando o traço do rali chega ao ingresso
// (rally.finished()): primeiro ela fica pousada no ingresso, e salta para o saibro do jogo quando a quadra
// entra na tela. Daí em diante, as regras (le-mur-rules.js) conduzem a bola, e a raquete a rebate.
// Momentos da Bola aqui: away (no rali) → ticket (pousada no ingresso) → arriving (saltando) → court.
const ARRIVAL = 0.9; // s, o salto do ingresso até o saibro
const TOUCH_REACH = 60; // px, o raio do toque em volta do centro da Bola
const STRONG_SWING = 25; // px por movimento subindo: daí para cima, a rebatida tem a força toda

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

export function createMur(section, { rally, racket = false }) {
  const court = section.querySelector('[data-mur-court]');
  const floor = section.querySelector('[data-mur-floor]');
  const status = section.querySelector('[data-mur-status]');
  const score = section.querySelector('[data-mur-score]');
  const hint = section.querySelector('[data-mur-hint]');
  const play = section.querySelector('[data-mur-play]');
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

  // a distância do ponto (coordenadas da tela) ao centro da Bola
  function center() {
    const box = ball.getBoundingClientRect();
    return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
  }
  const distance = (x, y) => Math.hypot(center().x - x, center().y - y);

  // no celular: tocar perto da Bola rebate, e quanto mais perto do centro, mais limpa a rebatida. O toque não
  // é cancelado, então arrastar a partir dali continua rolando a página.
  section.addEventListener(
    'pointerdown',
    (event) => {
      if (event.pointerType === 'mouse' || moment !== 'court') return;
      const d = distance(event.clientX, event.clientY);
      if (d <= TOUCH_REACH) rules.hit({ quality: 1 - d / TOUCH_REACH, side: Math.sign(center().x - event.clientX) });
    },
    { passive: true },
  );

  // no teclado: o botão "Jogar" rebate (espaço ou Enter), se a Bola estiver ao alcance, descendo e baixa
  function swing() {
    if (moment === 'court' && rules.reachable()) rules.hit();
  }
  play.addEventListener('keydown', (event) => {
    if (event.key !== ' ' && event.key !== 'Enter') return;
    event.preventDefault(); // sem o clique sintético e sem rolar a página
    if (!event.repeat) swing();
  });
  play.addEventListener('keyup', (event) => event.key === ' ' && event.preventDefault());
  play.addEventListener('click', (event) => event.detail > 0 && swing());

  // a instrução muda por aparelho; com o foco no botão, vira a dica do espaço
  const touch = window.matchMedia('(pointer: coarse)').matches;
  const deviceHint = racket ? 'Encoste a raquete na bola para rebater' : touch ? 'Toque perto da bola' : 'Use o botão Jogar';
  hint.textContent = deviceHint;
  play.addEventListener('focus', () => (hint.textContent = 'Aperte espaço quando a bola estiver descendo, perto do chão'));
  play.addEventListener('blur', () => (hint.textContent = deviceHint));

  // o alvo da raquete: as cordas encostam na bola (coordenadas da tela). O contato: onde a Bola cai ao longo das
  // cordas, ou seja, a distância na horizontal até o centro delas, dá a qualidade (o sweet spot) e o lado para onde a
  // borda a manda. (A distância direta não serve: a bola caindo sempre encosta primeiro na borda do alcance.)
  // Subir o mouse dá a força.
  let racketReach = 26;
  return {
    cooldown: 250,
    near(x, y, reach) {
      racketReach = reach;
      return moment === 'court' && distance(x, y) < reach + ball.offsetWidth / 2;
    },
    hit({ x, vy = 0 }) {
      const dx = center().x - x;
      rules.hit({
        quality: 1 - Math.abs(dx) / (racketReach + ball.offsetWidth / 2),
        side: Math.sign(dx),
        power: Math.min(1, Math.max(0, -vy / STRONG_SWING)),
      });
    },
  };
}

// sem movimento, o Le Mur é um estado parado (ticket 34 completa este estado)
export function stillMur(section) {
  section.querySelector('[data-mur-status]').textContent = 'O jogo aparece com as animações ligadas';
  section.querySelector('[data-mur-play]').hidden = true;
  section.querySelector('[data-mur-hint]').hidden = true;
  section.dataset.phase = 'still';
}
