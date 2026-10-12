// As regras do Le Mur, sem DOM: a bola vista de lado, em px de uma quadra width × height, com h sendo a altura
// acima do saibro. A regra do tênis: depois da rebatida, a bola pode quicar uma vez (a marca); dois quiques
// seguidos ou a bola fora pela lateral é erro; três erros encerram a partida. O placar é o total de rebatidas.
//
// Fases: idle (antes da primeira rebatida) → playing → waiting (depois de um erro, espera a rebatida) → over.
// paused: a partida congelada no meio (o jogo saiu da tela, ou a Bola voltou ao rali); resume() a devolve a playing.
// Em idle, waiting e over a bola quica parada no meio, e esses quiques não contam.
// A dificuldade: a cada 5 rebatidas a gravidade sobe (a bola chega à mesma altura, mas cai mais rápido).
const LEVEL_EVERY = 5;
const LEVEL_GRAVITY = 0.1; // +10% de gravidade por nível
const LEVEL_MAX = 8; // daí em diante não acelera mais (1,8× a gravidade)
const clamp01 = (n) => Math.min(1, Math.max(0, n));

export function createMurRules({ width, height, gravity: baseGravity = 2600, restitution = 0.6, idleApex = 0.3, hitApex = 0.62, reach = 0.35, best = 0 }) {
  let gravity = baseGravity;
  const speedFor = (apex) => Math.sqrt(2 * gravity * apex * height);
  let phase = 'idle';
  let score = 0;
  let errors = 0;
  let bounces = 0; // quiques desde a última rebatida
  const ball = { x: width / 2, h: 0, vx: 0, vh: speedFor(idleApex) };

  const level = () => (phase === 'idle' ? 0 : Math.floor(score / LEVEL_EVERY));
  const regravitate = () => (gravity = baseGravity * (1 + LEVEL_GRAVITY * Math.min(level(), LEVEL_MAX)));

  function rest() {
    Object.assign(ball, { x: width / 2, h: 0, vx: 0, vh: speedFor(idleApex) });
  }

  function error(reason, events) {
    errors++;
    events.push({ type: 'error', reason });
    if (errors >= 3) {
      phase = 'over';
      best = Math.max(best, score);
      events.push({ type: 'over', score, best });
    } else {
      phase = 'waiting';
    }
    rest();
  }

  function step(dt) {
    const events = [];
    if (phase === 'paused') return events;
    ball.vh -= gravity * dt;
    ball.h += ball.vh * dt;
    ball.x += ball.vx * dt;

    if (phase === 'playing' && (ball.x < 0 || ball.x > width)) {
      error('out', events);
      return events;
    }
    if (ball.h <= 0 && ball.vh < 0) {
      ball.h = 0;
      if (phase !== 'playing') {
        ball.vh = speedFor(idleApex);
        events.push({ type: 'bounce', valid: false, x: ball.x });
      } else if (++bounces >= 2) {
        error('double', events);
      } else {
        ball.vh = -ball.vh * restitution;
        events.push({ type: 'bounce', valid: true, x: ball.x });
      }
    }
    return events;
  }

  // O contato: quality vai de 0 (a borda das cordas) a 1 (o centro); o centro manda alto e reto, a borda manda
  // baixo e para o lado em que a bola pegou (side: -1 esquerda, 1 direita). power vai de 0 (a raquete parada) a 1
  // (o gesto subindo), e 0,5 é o toque normal (celular, teclado). aim força o desvio (de -1 a 1).
  // Só vale com a bola descendo (ou parada no alto).
  function pause() {
    if (phase === 'playing') phase = 'paused';
  }
  function resume() {
    if (phase === 'paused') phase = 'playing';
  }

  function hit({ quality = 1, power = 0.5, side = 0, aim = side * (1 - clamp01(quality)) } = {}) {
    if (ball.vh > 0 || phase === 'paused') return false;
    if (phase === 'idle' || phase === 'over') {
      score = 0;
      errors = 0;
    }
    phase = 'playing';
    score++;
    bounces = 0;
    regravitate();
    const apex = hitApex * (0.75 + 0.25 * clamp01(quality)) * (0.65 + 0.7 * clamp01(power));
    ball.vh = speedFor(Math.min(apex, 0.92));
    ball.vx = aim * width * 0.35;
    return true;
  }

  // ao alcance: descendo e já no terço de baixo da quadra (a janela do teclado)
  const reachable = () => ball.vh <= 0 && ball.h < height * reach;

  const state = () => ({ phase, score, errors, best, level: level(), x: ball.x, h: ball.h, vh: ball.vh });
  return { step, hit, pause, resume, reachable, state };
}
