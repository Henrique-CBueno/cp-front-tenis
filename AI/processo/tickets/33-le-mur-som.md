# 33: O som do Le Mur

**What to build:** o som do jogo, escolhido pelo aluno contra a recomendação de deixar a página muda (decisão 019).
- **Sintetizado** com a Web Audio API (`src/le-mur-sound.js`), sem arquivos de áudio e sem créditos a dar:
  - rebatida: um "toc" das cordas, mais forte quanto mais forte o gesto;
  - quique: um baque abafado no saibro;
  - erro: um som curto e mais grave;
  - recorde: uma reação curta da torcida, com ruído filtrado.
- **Ligado na primeira rebatida** (os navegadores só liberam áudio depois de uma interação). Um botão de som fica no canto do Le Mur; silenciar fica guardado no navegador.
- Fora do Le Mur, a página continua muda.

**Blocked by:** 28

**Status:** ready-for-human (falta ouvir)

- [x] O `AudioContext` só nasce na primeira rebatida (sem aviso de autoplay no console)
- [x] Playwright: o botão alterna o som e a escolha sobrevive ao recarregar; o botão tem nome acessível e estado (`aria-pressed`)
- [ ] Verificado de ouvido no navegador, no computador e no celular
- [x] Log da etapa em `processo/prompts/`

## Comment

Implementado em 2026-10-12 (prompt 52). **Falta o item de ouvido:** a IA não ouve, então quem verifica no computador e no celular é o aluno.
- **`src/le-mur-sound.js`:** um ruído branco reaproveitado, filtros e osciladores.
  - rebatida: estalo a 2,4 kHz e corpo em triângulo, com volume e altura pela força;
  - quique: seno de 140 → 55 Hz com ruído grave;
  - erro: dois toques graves descendo;
  - recorde: um "ahh" de ruído filtrado e 18 palmas espalhadas.
- **O `AudioContext`:** nasce na primeira rebatida, mas só se `navigator.userActivation.hasBeenActive`. Encostar a raquete com o mouse não conta como gesto para o navegador; sem um clique, toque ou tecla antes, o jogo segue mudo, sem aviso.
- **Botão "Som":** no canto do Le Mur, com `aria-pressed` = som ligado. O mudo fica em `localStorage['la-trace:le-mur:mudo']`. Escondido com reduced-motion.
- **Quiques do estado parado não soam** (seriam um baque sem fim); só os da partida.
- **E2E:** o contexto só nasce depois da ativação e da rebatida, sem aviso no console (a ativação é simulada, porque o `page.evaluate` do Playwright conta como gesto). O botão alterna e lembra a escolha. O teste do teclado agora passa pelo "Som" antes do "Jogar".
