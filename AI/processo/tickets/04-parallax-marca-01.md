# 04: Parallax e Marca 01

**What to build:** enquanto o saque acontece, o fundo ganha profundidade: o saibro com grão, o estádio (foto Wikimedia "Court Philippe Chatrier 2024", CC BY-SA 4.0) e as linhas da quadra se movem em velocidades diferentes do jogador. No quadro do impacto, a bola sai do quadro e a **Marca 01** (oval no saibro) aparece ao lado da linha. O grão do saibro reage ao quadro do saque, em vez de ser um filtro estático. Funciona com os quadros provisórios e é afinado quando chegam os recortados.

**Blocked by:** 02

**Status:** done

- [x] Pelo menos 3 camadas com velocidades distintas no scroll do hero
- [x] A Marca 01 aparece sincronizada com o quadro do impacto
- [x] O grão do saibro varia com o progresso do saque
- [x] Foto do estádio com atribuição CC BY-SA no rodapé
- [x] Indicação sutil de "role" na primeira dobra
- [x] Screenshot desktop 1440 da primeira dobra em `processo/` como evidência
- [x] Log da etapa em `processo/prompts/`

## Comments

- 2026-10-10 (Claude): concluído. A bola é rastreada no vídeo e segue o traço até a Marca 01. Camadas: arquibancada (CC BY-SA, sem logos), grão do saibro e linhas. O grão se adensa no contato. Os testes continuam verdes. Evidências em `processo/evidencias/04/`.
