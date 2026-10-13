// O som do Le Mur, sintetizado com a Web Audio API: sem arquivos, sem créditos. O AudioContext só nasce na primeira
// rebatida, e só se a página já recebeu um clique, um toque ou uma tecla (a regra de autoplay dos navegadores:
// encostar a raquete com o mouse não conta). Antes disso, o jogo segue mudo, sem aviso no console.
// O resto da página continua mudo.
const MUTE_KEY = 'la-trace:le-mur:mudo';

function loadMuted() {
  try {
    return localStorage.getItem(MUTE_KEY) === '1';
  } catch {
    return false;
  }
}
function saveMuted(muted) {
  try {
    localStorage.setItem(MUTE_KEY, muted ? '1' : '0');
  } catch {
    // sem storage: a escolha vale até recarregar
  }
}

export function createMurSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  let muted = loadMuted();
  let ctx = null;
  let master = null;
  let noise = null; // um segundo de ruído branco, reaproveitado por todos os sons

  // chamado na rebatida: cria o contexto na primeira vez em que o navegador deixa
  function wake() {
    if (ctx || !AudioContext) return Boolean(ctx);
    if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return false;
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return true;
  }

  const live = () => ctx && !muted && ctx.state !== 'closed';

  // um envelope de volume: sobe em attack, cai exponencialmente até sumir em decay (s)
  function envelope(peak, attack, decay, at = ctx.currentTime) {
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(peak, at + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + attack + decay);
    gain.connect(master);
    return gain;
  }

  function burst({ type = 'bandpass', frequency, q = 1, peak, attack = 0.002, decay, at = ctx.currentTime }) {
    const source = ctx.createBufferSource();
    source.buffer = noise;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = frequency;
    filter.Q.value = q;
    source.connect(filter).connect(envelope(peak, attack, decay, at));
    source.start(at, Math.random() * 0.5, attack + decay + 0.05);
  }

  function tone({ type = 'sine', from, to = from, peak, attack = 0.003, decay, at = ctx.currentTime }) {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(from, at);
    osc.frequency.exponentialRampToValueAtTime(to, at + attack + decay);
    osc.connect(envelope(peak, attack, decay, at));
    osc.start(at);
    osc.stop(at + attack + decay + 0.05);
  }

  return {
    wake,
    // a rebatida: o "toc" das cordas, um estalo agudo com um corpo curto; power de 0 a 1
    hit(power = 0.5) {
      if (!live()) return;
      const peak = 0.25 + 0.55 * power;
      burst({ frequency: 2400, q: 3, peak, decay: 0.05 });
      tone({ type: 'triangle', from: 820 + 260 * power, to: 520, peak: peak * 0.6, decay: 0.07 });
    },
    // o quique: um baque abafado no saibro
    bounce() {
      if (!live()) return;
      tone({ from: 140, to: 55, peak: 0.55, decay: 0.12 });
      burst({ type: 'lowpass', frequency: 500, peak: 0.25, decay: 0.08 });
    },
    // o erro: dois toques graves que descem
    error() {
      if (!live()) return;
      const at = ctx.currentTime;
      tone({ type: 'triangle', from: 247, to: 220, peak: 0.3, decay: 0.12, at });
      tone({ type: 'triangle', from: 175, to: 147, peak: 0.3, decay: 0.22, at: at + 0.13 });
    },
    // o recorde: a torcida, um "ahh" de ruído filtrado que cresce e some, e palmas espalhadas
    record() {
      if (!live()) return;
      const at = ctx.currentTime;
      burst({ frequency: 1100, q: 0.8, peak: 0.35, attack: 0.25, decay: 1.4, at });
      burst({ frequency: 650, q: 1.2, peak: 0.2, attack: 0.3, decay: 1.2, at });
      for (let i = 0; i < 18; i++) {
        burst({ type: 'highpass', frequency: 1800, peak: 0.12 + Math.random() * 0.1, decay: 0.03, at: at + 0.1 + Math.random() * 1.2 });
      }
    },
    muted: () => muted,
    setMuted(value) {
      muted = value;
      saveMuted(muted);
    },
  };
}
