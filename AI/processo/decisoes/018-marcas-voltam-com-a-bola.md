# 018 · As marcas voltam com a bola

**Status:** decidida por mim · **Data:** 2026-10-12

- **Contexto:** desde a rodada 1, "uma vez feita, a marca fica": rolando para cima, a bola voltava, mas as marcas continuavam no saibro (DESIGN.md e o teste "as marcas ficam").
- **O que eu pedi:** "agora quero que as marcas voltem junto a bola e nao fiquem 'na quadra'".
- **Opções:**
  - (a) manter: as marcas são o registro do caminho;
  - (b) as marcas acompanham a bola: se desfazem quando ela volta para antes delas e renascem na descida.
- **Escolha: (b), para todas as marcas que a bola deixa:**
  - a Marca 01 do hero, junto com o "esticão" do título "Le Service";
  - as marcas dos capítulos, com as legendas ("Marca 02 · …");
  - as mini marcas dos quiques nos respiros;
  - as datas da Histoire;
  - as duas marcas do Sous la Terre (o pouso no tijolo e o topo do corte).
- **Como:**
  - `erase()` em `src/impact.js`, o inverso do `stamp()`: a marca se recolhe a `scale(0)` em 0,3 s, e a legenda some;
  - cada cena decide pela posição da bola;
  - as cenas presas (docas) ganharam um `before()`, chamado quando a bola volta para cima da cena.
- **O que não muda:** com reduced-motion, todas as marcas continuam feitas, porque nesse modo a página é o estado final.
- **Por quê:** a página é a quadra, e a bola é quem escreve nela. Voltar o scroll é voltar o ponto, e a quadra volta junto.
