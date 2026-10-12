import { gsap } from 'gsap';
import { stamp, erase } from './impact.js';
import { completeBallTrack } from './ball-track.js';

const { clamp, mapRange, interpolate } = gsap.utils;

// Fases do hero no progresso do pin (0–1): o saque, o voo da bola até o saibro, a marca.
const SERVE_END = 0.78;
const FLIGHT_END = 0.9;

const phase = (p, start, end) => clamp(0, 1, mapRange(start, end, 0, 1, p));
const expoOut = gsap.parseEase('expo.out');
// o expo.out do GSAP termina em 0,999; no fim do trecho o estado precisa ser exatamente o final
const easeOut = (t) => (t >= 1 ? 1 : expoOut(t));

export function createHero({ section, manifest, serveCanvas }) {
  const stadium = section.querySelector('[data-stadium] img');
  const grain = section.querySelector('[data-grain]');
  const trace = section.querySelector('[data-trace]');
  const tracePath = section.querySelector('[data-trace-path]');
  const ball = section.querySelector('[data-ball]');
  const markOval = section.querySelector('.mark__oval');
  const markCaption = section.querySelector('.mark__caption');
  const hint = section.querySelector('[data-scroll-hint]');
  const title = section.querySelector('h1');

  const contactProgress = SERVE_END * manifest.impactProgress;
  let flight = null; // o arco contato → marca ({ to: a marca }), recalculado quando o layout muda
  let ballTrack = manifest.ball; // o rastreio do vídeo com os buracos preenchidos (também depende do layout)
  let traceLength = 0;
  let lastP = null;
  let markMade = false;

  function measureFlight() {
    const from = serveCanvas.pointAt(manifest.contact);
    if (!from) return false;
    // medidas de layout (offset*), não getBoundingClientRect: a marca começa em scale(0)
    const mark = markOval.offsetParent;
    const to = {
      x: mark.offsetLeft + markOval.offsetLeft + markOval.offsetWidth * 0.4,
      y: mark.offsetTop + markOval.offsetTop + markOval.offsetHeight / 2,
    };
    const peak = { x: interpolate(from.x, to.x, 0.55), y: Math.min(from.y, to.y) - section.clientHeight * 0.08 };
    // o lançamento sobe até 16% da altura da tela (em coordenadas do quadro do vídeo), para a bola não sair dela
    const top = serveCanvas.pointAt([0, 0]).y;
    const frameHeight = serveCanvas.pointAt([0, 1]).y - top;
    ballTrack = completeBallTrack(manifest.ball, {
      impactIndex: Math.round(manifest.impactProgress * (manifest.ball.length - 1)),
      contact: manifest.contact,
      // e sempre um pouco acima do contato, para a bola cair na raquete (e não subir até ela)
      peakY: Math.min((section.clientHeight * 0.16 - top) / frameHeight, manifest.contact[1] - 0.08),
    });
    trace.setAttribute('viewBox', `0 0 ${section.clientWidth} ${section.clientHeight}`);
    tracePath.setAttribute('d', `M${from.x},${from.y} Q${peak.x},${peak.y} ${to.x},${to.y}`);
    traceLength = tracePath.getTotalLength();
    tracePath.style.strokeDasharray = `${traceLength} ${traceLength}`;
    flight = { to };
    return true;
  }

  // Depois do quique, a bola espera na marca. No celular, o traço do rali nasce na borda de baixo do hero (o
  // ingresso fica embaixo da marca): depois do pin, a bola desce da marca até a borda num quique curto, e chega
  // lá quando a borda passa pelo meio da tela, que é quando o traço do rali começa.
  function afterMark() {
    const { to } = flight;
    if (window.innerWidth > 720) return to;
    const vh = window.innerHeight;
    const f = clamp(0, 1, mapRange(vh, vh / 2, 0, 1, section.getBoundingClientRect().bottom));
    const lift = 4 * f * (1 - f) * 40;
    return { x: to.x, y: interpolate(to.y, section.clientHeight, f * f) - lift };
  }

  // A bola: rastreada no vídeo durante o lançamento; depois do contato, segue o traço até a marca e fica
  // pousada nela até a bola do rali assumir (handedOff), no mesmo ponto: a bola nunca some no meio da marca.
  function placeBall(p, frameProgress, handedOff) {
    if (p >= contactProgress) {
      const t = easeOut(phase(p, contactProgress, FLIGHT_END));
      const point = t < 1 ? tracePath.getPointAtLength(t * traceLength) : afterMark();
      gsap.set(ball, { x: point.x, y: point.y, opacity: t < 1 || !handedOff ? 1 : 0 });
      return t;
    }
    const tracked = ballTrack[Math.round(frameProgress * (ballTrack.length - 1))];
    const point = tracked && serveCanvas.pointAt(tracked);
    gsap.set(ball, point ? { x: point.x, y: point.y, opacity: 1 } : { opacity: 0 });
    return 0;
  }

  // o título "estica" junto com a marca no saibro, e volta quando ela se desfaz
  const stretch = { value: 62 };
  function stretchTitle(value, live) {
    gsap.to(stretch, {
      value,
      duration: live ? 0.6 : 0,
      ease: 'expo.out',
      overwrite: true,
      onUpdate: () => (title.style.fontStretch = `${stretch.value}%`),
    });
  }

  function render(p, { handedOff = false } = {}) {
    const frameProgress = phase(p, 0, SERVE_END);
    if (!flight && !measureFlight()) return frameProgress;

    const flown = placeBall(p, frameProgress, handedOff);
    tracePath.style.strokeDashoffset = traceLength * (1 - flown);
    tracePath.style.opacity = flown > 0 ? 0.85 : 0;

    // A Marca 01 nasce no quique (o fim do voo). Se a página já abriu depois dele, ela já está feita.
    // Rolando de volta para antes do quique, ela se desfaz junto com o voo da bola.
    const live = lastP !== null && Math.abs(p - lastP) < 0.2;
    if (!markMade && p >= FLIGHT_END) {
      markMade = true;
      stamp(markOval, { caption: markCaption, instant: !live });
      stretchTitle(72, live);
    } else if (markMade && p < FLIGHT_END) {
      markMade = false;
      erase(markOval, { caption: markCaption, instant: !live });
      stretchTitle(62, live);
    }
    lastP = p;

    // Parallax dentro do pin: a arquibancada recua devagar, o grão do saibro escorre mais rápido
    // e se adensa no instante do contato.
    gsap.set(stadium, { yPercent: -8 * p, scale: 1.06 - 0.06 * p });
    const dust = Math.exp(-(((p - contactProgress) / 0.05) ** 2));
    grain.style.backgroundPosition = `0 ${-160 * p}px`;
    grain.style.opacity = 0.38 + 0.3 * dust;

    hint.style.opacity = 1 - phase(p, 0, 0.06);
    return frameProgress;
  }

  function relayout() {
    flight = null;
  }

  return { render, relayout };
}
