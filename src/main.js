import '@fontsource-variable/anybody/standard.css';
import '@fontsource/schibsted-grotesk/400.css';
import '@fontsource/schibsted-grotesk/700.css';
import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { OFFICIAL_TICKETS_URL } from './config.js';
import manifest from './frames-manifest.json';
import { createServeSequence } from './serve-sequence.js';
import { createServeCanvas, loadImage } from './serve-canvas.js';
import { createHero } from './hero.js';

for (const link of document.querySelectorAll('[data-cta]')) {
  link.href = OFFICIAL_TICKETS_URL;
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const sequence = createServeSequence({
  manifest,
  loader: loadImage,
  viewport: { width: window.innerWidth, reducedMotion },
});
const serveCanvas = createServeCanvas(document.querySelector('[data-serve-canvas]'));
sequence.preload();

const hero = createHero({ section: document.querySelector('#le-service'), manifest, serveCanvas });
window.addEventListener('resize', hero.relayout);

// Com reduced-motion, o estado final: o quadro estático, a bola já pousada, a marca no saibro.
let progress = reducedMotion ? 1 : 0;
gsap.ticker.add(() => {
  const frameProgress = hero.render(progress);
  serveCanvas.draw(sequence.frameAt(frameProgress));
});

if (!reducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.create({
    trigger: '#le-service',
    start: 'top top',
    end: '+=180%',
    pin: true,
    scrub: true,
    onUpdate: (self) => (progress = self.progress),
  });
}
