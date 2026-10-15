# Prompt 46 · grilling do joguinho (rodada 5): Le Mur

**Data:** 2026-10-12 · **Ferramenta:** Claude Code (Claude Opus 5.5), skills `grilling` e `domain-modeling`

## O que eu pedi
> /grill-with-docs eu estava pensando em fazer um joguinho interativo no final da pagina, mas estou sem ideias

Depois de aprovar o plano:
> quero que crie as specs e os tickets em uma nova branch para desenvolver

## O que a IA fez
- **Levantou os fatos antes de perguntar:** o fim da página (a Bola termina no ingresso), o cursor-raquete que já rebate a bola e o glossário ("uma Bola só"). Também achou uma definição desatualizada no glossário (Marca "uma vez feita, fica", contra a decisão 018).
- **Conduziu 6 rodadas de perguntas,** sempre com uma recomendação:
  1. papel, aparelhos, qual Bola, tamanho e o glossário;
  2. qual jogo (Le Juge, Le Mur, L'Ace ou mistura) e reduced-motion;
  3. posição, vista, recorde, scroll e dificuldade;
  4. o que é erro, a rebatida no computador e no celular, começo e fim, e o nome;
  5. uma Bola só, as Marcas do jogo, o visual, o som e o processo;
  6. de onde vem o som, quais sons, como silenciar, o que acontece depois de um erro e o que o placar conta.
- **Onde eu discordei da recomendação:**
  - papel: vitrine, em vez de servir ao ingresso;
  - som: com som, em vez de muda;
  - depois de um erro: esperar a rebatida, em vez de relançar sozinha.
- **Registrou** (sem código do jogo, na branch `feat/le-mur`):
  - histórias 42–51 e as decisões de implementação e de teste na spec;
  - os tickets 28 a 34, em fatias verticais com `Blocked by`;
  - a decisão 019;
  - o glossário atualizado.
