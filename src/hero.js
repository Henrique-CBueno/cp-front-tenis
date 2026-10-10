import { gsap } from 'gsap';

const { clamp, mapRange, interpolate } = gsap.utils;

// Fases do hero no progresso do pin (0–1): o saque, o voo da bola até o saibro, a marca.
const SERVE_END = 0.78;
const FLIGHT_END = 0.9;
const MARK_END = 0.96;

const phase = (p, start, end) => clamp(0, 1, mapRange(start, end, 0, 1, p));
const easeOut = gsap.parseEase('expo.out');

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
  let flight = null; // o arco contato → marca, recalculado quando o layout muda
  let traceLength = 0;

  function measureFlight() {
    const from = serveCanvas.pointAt(manifest.contact);
    if (!from) return false;
    const box = markOval.getBoundingClientRect();
    const origin = section.getBoundingClientRect();
    const to = { x: box.left - origin.left + box.width * 0.35, y: box.top - origin.top + box.height / 2 };
    const peak = { x: interpolate(from.x, to.x, 0.55), y: Math.min(from.y, to.y) - section.clientHeight * 0.08 };
    trace.setAttribute('viewBox', `0 0 ${section.clientWidth} ${section.clientHeight}`);
    tracePath.setAttribute('d', `M${from.x},${from.y} Q${peak.x},${peak.y} ${to.x},${to.y}`);
    traceLength = tracePath.getTotalLength();
    tracePath.style.strokeDasharray = `${traceLength} ${traceLength}`;
    flight = true;
    return true;
  }

  // A bola: rastreada no vídeo durante o lançamento; depois do contato, segue o traço até a marca.
  function placeBall(p, frameProgress) {
    if (p >= contactProgress) {
      const t = easeOut(phase(p, contactProgress, FLIGHT_END));
      const point = tracePath.getPointAtLength(t * traceLength);
      gsap.set(ball, { x: point.x, y: point.y, opacity: t < 1 ? 1 : 0 });
      return t;
    }
    const tracked = manifest.ball[Math.round(frameProgress * (manifest.ball.length - 1))];
    const point = tracked && serveCanvas.pointAt(tracked);
    gsap.set(ball, point ? { x: point.x, y: point.y, opacity: 1 } : { opacity: 0 });
    return 0;
  }

  function render(p) {
    const frameProgress = phase(p, 0, SERVE_END);
    if (!flight && !measureFlight()) return frameProgress;

    const flown = placeBall(p, frameProgress);
    tracePath.style.strokeDashoffset = traceLength * (1 - flown);
    tracePath.style.opacity = flown > 0 ? 0.85 : 0;

    const mark = easeOut(phase(p, FLIGHT_END - 0.02, MARK_END));
    gsap.set(markOval, { scale: mark });
    gsap.set(markCaption, { opacity: mark, y: (1 - mark) * 12 });

    // Parallax dentro do pin: a arquibancada recua devagar, o grão do saibro escorre mais rápido
    // e se adensa no instante do contato.
    gsap.set(stadium, { yPercent: -8 * p, scale: 1.06 - 0.06 * p });
    const dust = Math.exp(-(((p - contactProgress) / 0.05) ** 2));
    grain.style.backgroundPosition = `0 ${-160 * p}px`;
    grain.style.opacity = 0.38 + 0.3 * dust;

    // O título "estica" como a marca no saibro.
    title.style.fontStretch = `${62 + 10 * mark}%`;
    hint.style.opacity = 1 - phase(p, 0, 0.06);
    return frameProgress;
  }

  function relayout() {
    flight = null;
  }

  return { render, relayout };
}
