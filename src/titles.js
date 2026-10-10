import { gsap } from 'gsap';

// Os títulos das seções entram em quadra letra a letra: cada uma nasce espremida e se estica até a largura certa.
// O leitor de tela continua lendo a palavra inteira: o título leva aria-label e as letras ficam aria-hidden.
// As letras de cada palavra ficam juntas, para a quebra de linha continuar entre palavras.
export function splitTitle(title) {
  const text = title.textContent.trim();
  title.setAttribute('aria-label', text);
  title.replaceChildren();
  text.split(' ').forEach((word, i) => {
    if (i > 0) title.append(' ');
    const group = document.createElement('span');
    group.className = 'title__word';
    group.setAttribute('aria-hidden', 'true');
    for (const char of word) {
      const letter = document.createElement('span');
      letter.className = 'title__letter';
      letter.textContent = char;
      group.append(letter);
    }
    title.append(group);
  });
  return [...title.querySelectorAll('.title__letter')];
}

export function revealTitles(titles) {
  for (const title of titles) {
    const letters = splitTitle(title);
    gsap.from(letters, {
      scaleX: 0.15,
      opacity: 0,
      yPercent: 30,
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.035,
      scrollTrigger: { trigger: title, start: 'top 88%', once: true },
    });
  }
}
