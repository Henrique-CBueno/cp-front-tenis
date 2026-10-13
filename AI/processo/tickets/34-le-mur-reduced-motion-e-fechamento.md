# 34: Reduced-motion e fechamento do Le Mur

**What to build:** o Le Mur acessível a quem não quer movimento, e a revisão final da rodada.
- **Reduced-motion:** o Le Mur vira um estado parado, com a frase "o jogo aparece com as animações ligadas" e o recorde, se houver. Sem Bola em movimento e sem som.
- **Fechamento:** revisão de design da seção (desktop 1440 e celular 390); o `DESIGN.md` com o Le Mur; o glossário conferido contra o que foi construído; a suíte inteira verde.

**Blocked by:** 29, 30, 31, 32, 33

**Status:** done

- [x] Playwright (reduced-motion): o estado parado aparece, com o recorde guardado, e nenhuma Bola anda
- [x] `DESIGN.md` atualizado com a seção Le Mur
- [x] `CONTEXT.md` conferido contra o código (Marca, Le Mur, Partida, Rebatida, Erro)
- [x] Suíte Vitest e Playwright inteira verde
- [x] Log da etapa em `processo/prompts/`

## Comment

Feito em 2026-10-12 (prompt 53).
- **Reduced-motion:** o estado parado mostra o recorde guardado ("Recorde: 18 rebatidas"), sem Bola do Le Mur, sem controles e sem som. O teste também confere que a bola do rali não anda.
- **Revisão de design** (1440, 390 e 360): o painel foi para baixo da linha de base, o amarelo saiu do recorde e o `hidden` passou a valer (correção #42).
- **`DESIGN.md`:**
  - componente "O Le Mur";
  - a raquete no Le Mur;
  - o Do das marcas atualizado: elas acompanham a bola desde a rodada das marcas reversíveis, e o texto antigo dizia que não se desfaziam;
  - o reduced-motion com o Le Mur parado.
- **`CONTEXT.md`:** a Marca no Le Mur fica até a próxima partida; a Rebatida inclui o espaço e só vale com a bola descendo.
- **Suítes:** 51 testes de unidade e 86 de 86 E2E, todos verdes.
