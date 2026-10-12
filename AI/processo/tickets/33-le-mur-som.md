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

**Status:** ready-for-agent

- [ ] O `AudioContext` só nasce na primeira rebatida (sem aviso de autoplay no console)
- [ ] Playwright: o botão alterna o som e a escolha sobrevive ao recarregar; o botão tem nome acessível e estado (`aria-pressed`)
- [ ] Verificado de ouvido no navegador, no computador e no celular
- [ ] Log da etapa em `processo/prompts/`
