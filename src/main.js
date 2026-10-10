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
import { createRally } from './rally.js';
import { animateTerre } from './terre.js';
import { drawHeart } from './legendes.js';
import { runTimeline, runCounters } from './extras.js';
import { runFaceOff } from './face.js';
import { runPalmares } from './palmares.js';
import { revealTitles } from './titles.js';
import { runMarquees } from './marquee.js';

gsap.registerPlugin(ScrollTrigger);

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
const rallyContainer = document.querySelector('[data-rally]');
const rally = createRally({
  container: rallyContainer,
  // o traço continua de onde a Marca 01 ficou no hero (que, depois do pin, fica logo acima do rali);
  // no celular, o CTA do hero fica embaixo da marca, então o traço nasce na borda do hero
  start: () => {
    const oval = document.querySelector('.mark--hero .mark__oval');
    const mark = oval.offsetParent;
    const x = mark.offsetLeft + oval.offsetLeft + oval.offsetWidth * 0.4;
    if (window.innerWidth <= 720) return { x, y: 0 };
    return { x, y: mark.offsetTop + oval.offsetTop + oval.offsetHeight / 2 - mark.offsetParent.offsetHeight };
  },
});
function remeasure() {
  hero.relayout();
  rally.measure();
  if (reducedMotion) rally.render(Infinity);
}
window.addEventListener('resize', remeasure);

// Com reduced-motion, o estado final: o quadro estático, a bola já pousada, a marca no saibro.
let progress = reducedMotion ? 1 : 0;
gsap.ticker.add(() => {
  const frameProgress = hero.render(progress);
  serveCanvas.draw(sequence.frameAt(frameProgress));
});

// Fontes e imagens mudam a altura das seções: mede o traço de novo quando tudo carregou.
window.addEventListener('load', remeasure);

drawHeart(document.querySelector('#guga'), { animate: !reducedMotion });
runPalmares(document.querySelector('#palmares'));

if (reducedMotion) {
  rally.render(Infinity);
} else {

  const lenis = new Lenis({ anchors: true });
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

  animateTerre(document.querySelector('#terre-battue'));
  runTimeline(document.querySelector('#histoire'));
  runFaceOff(document.querySelector('#face-a-face'));
  runCounters(document.querySelector('#numeros'));
  revealTitles([...document.querySelectorAll('.rally section h2')]);
  runMarquees([...document.querySelectorAll('[data-marquee]')]);

  // a ponta do traço acompanha o meio da tela
  gsap.ticker.add(() => {
    const top = rallyContainer.getBoundingClientRect().top;
    rally.render(window.innerHeight / 2 - top);
  });
}
