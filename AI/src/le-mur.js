import { gsap } from 'gsap';
import { createMurRules } from './le-mur-rules.js';
import { stamp, erase, dust } from './impact.js';
import { createMurSound } from './le-mur-sound.js';

// O Le Mur: o paredão do fim da página. A Bola só vem para cá quando o traço do rali chega ao ingresso
// (rally.finished()): primeiro ela fica pousada no ingresso, e salta para o saibro do jogo quando a quadra
// entra na tela. Daí em diante, as regras (le-mur-rules.js) conduzem a bola, e a raquete a rebate.
// Momentos da Bola aqui: away (no rali) → ticket (pousada no ingresso) → arriving (saltando) → court.
// Uma Bola só: se o traço desdesenha (subindo a página), a Bola volta ao rali e a partida pausa; descendo de novo,
// ela salta outra vez do ingresso para onde estava. Fora da tela (ou com a aba escondida), a partida também pausa,
// e só volta com um toque, um clique ou o espaço.
const ARRIVAL = 0.9; // s, o salto do ingresso até o saibro
const TOUCH_REACH = 60; // px, o raio do toque em volta do centro da Bola
const STRONG_SWING = 25; // px por movimento subindo: daí para cima, a rebatida tem a força toda

const RECORD_KEY = 'la-trace:le-mur:recorde';

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
const two = (n) => String(n).padStart(2, '0');

// o recorde fica no navegador; sem storage (bloqueado, aba privada), o jogo funciona e só não lembra
function loadBest() {
  try {
    return Math.max(0, Number.parseInt(localStorage.getItem(RECORD_KEY), 10) || 0);
  } catch {
    return 0;
  }
}
function saveBest(best) {
  try {
    localStorage.setItem(RECORD_KEY, String(best));
  } catch {
    // sem storage: o recorde vale só até recarregar
  }
}

export function createMur(section, { rally, racket = false }) {
  const court = section.querySelector('[data-mur-court]');
  const floor = section.querySelector('[data-mur-floor]');
  const status = section.querySelector('[data-mur-status]');
  const score = section.querySelector('[data-mur-score]');
  const errorMarks = [...section.querySelectorAll('[data-mur-error]')];
  const errorBox = section.querySelector('[data-mur-errors]');
  const hint = section.querySelector('[data-mur-hint]');
  const play = section.querySelector('[data-mur-play]');
  const soundButton = section.querySelector('[data-mur-sound]');

  // o som: o botão no canto liga e desliga (aria-pressed = som ligado), e a escolha fica guardada
  const sound = createMurSound();
  const showSound = () => soundButton.setAttribute('aria-pressed', String(!sound.muted()));
  showSound();
  soundButton.addEventListener('click', () => {
    sound.setMuted(!sound.muted());
    showSound();
  });
  const ticketMark = document.querySelector('.ticket .mark__oval');

  const ball = document.createElement('span');
  ball.className = 'court__ball mur__ball';
  ball.setAttribute('aria-hidden', 'true');
  ball.dataset.murBall = '';
  court.append(ball);

  const touch = window.matchMedia('(pointer: coarse)').matches;
  let rules = null;
  let best = loadBest();
  let bestBefore = best; // o recorde quando a partida começou: o fim mostra se ele caiu
  const marks = []; // as Marcas desta partida no saibro
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
    const { phase, score: total, errors, best: record } = rules.state();
    const isRecord = phase === 'over' && total > bestBefore;
    const text = {
      idle: 'Rebata para começar',
      playing: '',
      waiting: `${lastError === 'out' ? 'Fora' : 'Dois quiques'}. Rebata para continuar`,
      paused: `Pausa. ${touch ? 'Toque' : 'Clique ou aperte espaço'} para continuar`,
      over: `${isRecord ? 'Novo recorde' : 'Fim de partida'}: ${plural(total, 'rebatida')}. Rebata para jogar de novo`,
    }[phase];
    const key = `${phase}|${total}|${errors}|${text}|${marks.length}`;
    if (key === shown) return;
    shown = key;
    status.textContent = text;
    score.textContent = `${two(total)} rebatida${total === 1 ? '' : 's'}${record > 0 ? ` · recorde ${two(record)}` : ''}`;
    errorMarks.forEach((mark, i) => mark.classList.toggle('is-made', i < errors));
    errorBox.setAttribute('aria-label', `${plural(errors, 'erro')} de 3`);
    section.classList.toggle('is-record', isRecord);
    Object.assign(section.dataset, { phase, score: total, errors, marks: marks.length });
  }

  // cada quique válido deixa uma Marca no saibro, na linha de base, com o pó do quique
  function leaveMark(x) {
    const el = document.createElement('span');
    el.className = 'rally__bounce mur__mark';
    el.dataset.murMark = '';
    el.style.left = `${x}px`;
    el.style.top = `${floorY()}px`;
    court.insertBefore(el, ball);
    stamp(el);
    dust(court, x, floorY());
    marks.push(el);
  }

  // a próxima partida começa com o saibro limpo: as Marcas da anterior se recolhem
  function clearMarks() {
    for (const el of marks.splice(0)) {
      erase(el);
      gsap.delayedCall(0.35, () => el.remove());
    }
  }

  // toda rebatida passa por aqui: a primeira de uma partida limpa o saibro
  function strike(contact) {
    const starting = ['idle', 'over'].includes(rules.state().phase);
    if (!rules.hit(contact)) return;
    sound.wake();
    sound.hit(contact?.power ?? 0.5);
    if (starting) {
      clearMarks();
      bestBefore = rules.state().best;
    }
  }

  gsap.ticker.add((_, deltaTime) => {
    if (!rules) measure();
    const dt = Math.min(deltaTime / 1000, 1 / 30);

    if (!rally.finished()) {
      rules.pause();
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
      const to = { x: rules.state().x, y: floorY() - rules.state().h - radius() }; // de volta para onde estava
      const lift = 4 * t * (1 - t) * 80; // um pulinho para fora do ingresso, e a queda até o saibro
      place({ x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t * t - lift });
      if (t >= 1) moment = 'court';
      return;
    }

    for (const event of rules.step(dt)) {
      if (event.type === 'error') {
        lastError = event.reason;
        sound.error();
      }
      if (event.type === 'bounce' && event.valid) {
        leaveMark(event.x);
        sound.bounce();
      }
      if (event.type === 'over' && event.best > bestBefore) {
        saveBest(event.best);
        sound.record();
      }
    }
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

  // a pausa: o Le Mur quase todo fora da tela, ou a aba escondida
  new IntersectionObserver(([entry]) => entry.intersectionRatio < 0.3 && rules?.pause(), {
    threshold: [0, 0.3],
  }).observe(section);
  document.addEventListener('visibilitychange', () => document.hidden && rules?.pause());

  // a volta da pausa: um toque ou um clique em qualquer lugar do Le Mur, ou o espaço no "Jogar" (sem rebater)
  const paused = () => moment === 'court' && rules.state().phase === 'paused';
  function resume() {
    if (!paused()) return false;
    rules.resume();
    return true;
  }

  // no celular: tocar perto da Bola rebate, e quanto mais perto do centro, mais limpa a rebatida. O toque não
  // é cancelado, então arrastar a partir dali continua rolando a página.
  section.addEventListener(
    'pointerdown',
    (event) => {
      if (resume() || event.pointerType === 'mouse' || moment !== 'court') return;
      const d = distance(event.clientX, event.clientY);
      if (d <= TOUCH_REACH) strike({ quality: 1 - d / TOUCH_REACH, side: Math.sign(center().x - event.clientX) });
    },
    { passive: true },
  );

  // no teclado: o botão "Jogar" rebate (espaço ou Enter), se a Bola estiver ao alcance, descendo e baixa
  function swing() {
    if (resume()) return;
    if (moment === 'court' && rules.reachable()) strike();
  }
  play.addEventListener('keydown', (event) => {
    if (event.key !== ' ' && event.key !== 'Enter') return;
    event.preventDefault(); // sem o clique sintético e sem rolar a página
    if (!event.repeat) swing();
  });
  play.addEventListener('keyup', (event) => event.key === ' ' && event.preventDefault());
  play.addEventListener('click', (event) => event.detail > 0 && swing());

  // a instrução muda por aparelho; com o foco no botão, vira a dica do espaço
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
      strike({
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
  const best = loadBest();
  section.querySelector('[data-mur-score]').textContent = best > 0 ? `Recorde: ${two(best)} rebatidas` : '';
  section.querySelector('[data-mur-errors]').hidden = true;
  section.querySelector('[data-mur-play]').hidden = true;
  section.querySelector('[data-mur-sound]').hidden = true;
  section.querySelector('[data-mur-hint]').hidden = true;
  section.dataset.phase = 'still';
}
