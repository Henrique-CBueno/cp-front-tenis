import { gsap } from 'gsap';

// A tela de carregamento: o logo de Roland-Garros se enche de giz e a linha de base é pintada conforme o
// essencial chega, com a bola quicando na ponta. O quique é CSS puro (roda no compositor), então segue liso
// mesmo com a thread principal ocupada decodificando os quadros. Na saída, o logo voa até o seu lugar no topo
// e o saibro da tela se desfaz por cima da página.
export function createLoader(root, { reducedMotion, minDuration = 2400 }) {
  const started = performance.now();
  const count = root.querySelector('[data-loader-count]');
  const logo = root.querySelector('[data-loader-logo]');
  // o tempo mínimo é uma curva, não uma espera: numa rede rápida, o logo enche num gesto contínuo de
  // `minDuration`; numa rede lenta, acompanha o que de fato chegou
  const timeCurve = gsap.parseEase('power2.inOut');
  let real = 0;
  let shown = 0;
  let filled = null; // resolve quando o exibido chega a 100%
  const play = (target, vars) => new Promise((resolve) => gsap.to(target, { ...vars, onComplete: resolve }));

  // "la trace" e o contador só aparecem com a fonte certa, para não trocar de fonte na frente de quem olha
  document.fonts.ready.then(() => root.classList.add('loader--fonts'));

  function tick() {
    const elapsed = Math.min(1, (performance.now() - started) / minDuration);
    const target = Math.min(real, reducedMotion ? 1 : timeCurve(elapsed));
    // o exibido persegue o alvo com velocidade limitada: quando muita coisa chega de uma vez, o logo não salta
    shown += Math.min((target - shown) * 0.12, 0.014);
    if (target - shown < 0.002) shown = target;
    root.style.setProperty('--p', shown);
    count.textContent = Math.round(shown * 100);
    if (shown >= 1 && filled) filled();
  }
  gsap.ticker.add(tick);

  function progress(p) {
    real = Math.max(real, p);
  }

  // o logo da tela sai do centro e pousa exatamente sobre o logo do topo, que só então aparece
  function flyToBrand() {
    const brand = document.querySelector('.brand__logo');
    const from = logo.getBoundingClientRect();
    const to = brand.getBoundingClientRect();
    gsap.set(brand, { opacity: 0 });
    const tl = gsap.timeline();
    tl.to('[data-loader-base]', { opacity: 0, y: 12, duration: 0.3, ease: 'power2.in' })
      .to(
        logo,
        { x: to.left - from.left, y: to.top - from.top, scale: to.width / from.width, duration: 1, ease: 'expo.inOut' },
        0.15,
      )
      .to('[data-loader-clay]', { opacity: 0, duration: 0.7, ease: 'power2.inOut' }, 0.4)
      .set(brand, { opacity: 1 })
      .set(logo, { opacity: 0 });
    return new Promise((resolve) => tl.eventCallback('onComplete', resolve));
  }

  async function done() {
    real = 1;
    await new Promise((resolve) => (filled = resolve));
    gsap.ticker.remove(tick);
    await (reducedMotion ? play(root, { opacity: 0, duration: 0.3 }) : flyToBrand());
    root.remove();
    document.documentElement.classList.remove('is-loading');
  }

  return { progress, done };
}
