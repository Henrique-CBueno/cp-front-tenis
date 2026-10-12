// As regras do Le Mur, sem DOM: a bola vista de lado, em px de uma quadra width × height, com h sendo a altura
// acima do saibro. A regra do tênis: depois da rebatida, a bola pode quicar uma vez (a marca); dois quiques
// seguidos ou a bola fora pela lateral é erro; três erros encerram a partida. O placar é o total de rebatidas.
//
// Fases: idle (antes da primeira rebatida) → playing → waiting (depois de um erro, espera a rebatida) → over.
// Em idle, waiting e over a bola quica parada no meio, e esses quiques não contam.
export function createMurRules({ width, height, gravity = 2600, restitution = 0.6, idleApex = 0.3, hitApex = 0.62, reach = 0.35, best = 0 }) {
  const speedFor = (apex) => Math.sqrt(2 * gravity * apex * height);
  let phase = 'idle';
  let score = 0;
  let errors = 0;
  let bounces = 0; // quiques desde a última rebatida
  const ball = { x: width / 2, h: 0, vx: 0, vh: speedFor(idleApex) };

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

  // aim: de -1 (para a esquerda) a 1 (para a direita). quality: de 0 (a borda) a 1 (o centro), a rebatida
  // limpa sobe mais. Só vale com a bola descendo (ou parada no alto).
  function hit({ aim = 0, quality = 1 } = {}) {
    if (ball.vh > 0) return false;
    if (phase === 'idle' || phase === 'over') {
      score = 0;
      errors = 0;
    }
    phase = 'playing';
    score++;
    bounces = 0;
    ball.vh = speedFor(hitApex * (0.75 + 0.25 * Math.min(1, Math.max(0, quality))));
    ball.vx = aim * width * 0.35;
    return true;
  }

  // ao alcance: descendo e já no terço de baixo da quadra (a janela do teclado)
  const reachable = () => ball.vh <= 0 && ball.h < height * reach;

  const state = () => ({ phase, score, errors, best, x: ball.x, h: ball.h, vh: ball.vh });
  return { step, hit, reachable, state };
}
