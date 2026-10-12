// Palmarès: o hover e o foco revelam a foto só com CSS. Aqui ficam o toque (abre e fecha o card) e, no celular,
// a revelação pelo scroll: o card que passa pelo meio da tela abre sozinho.
export function runPalmares(section) {
  const cards = [...section.querySelectorAll('.champion')];
  const mobile = window.matchMedia('(max-width: 720px)');

  for (const card of cards) {
    card.addEventListener('click', () => {
      const open = !card.classList.contains('is-open');
      for (const other of cards) other.classList.remove('is-open');
      card.classList.toggle('is-open', open);
    });
  }

  // uma faixa no meio da tela: só o card que a cruza fica aberto
  const centered = new IntersectionObserver(
    (entries) => {
      if (!mobile.matches) return;
      for (const entry of entries) entry.target.classList.toggle('is-open', entry.isIntersecting);
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );
  for (const card of cards) centered.observe(card);
}
