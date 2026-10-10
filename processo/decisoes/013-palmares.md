# 013 · A interação do Palmarès

**Status:** decidida pela IA no ticket 18 (pendente de revisão minha) · **Data:** 2026-10-10

- **Contexto:** a referência é a seção de capacetes do landonorris.com (o hover troca o objeto por uma foto, com uma máscara colorida). Pedido: troféu → foto do campeão, no hover, no foco e no toque (Q9, Q10, Q17).
- **Opções para a revelação:**
  - (a) `clip-path` animado em JS;
  - (b) máscara SVG ondulada, movida só com CSS (`mask-position`);
  - (c) crossfade simples.
- **Escolha:** (b).
  - A onda é a "máscara de saibro" pedida.
  - Uma camada de saibro sobe primeiro e a foto vem 0,12 s depois, então a borda da onda aparece como uma faixa de saibro.
  - Por ser CSS, hover e foco funcionam sem JS. O JS só cuida do toque e do scroll no celular, com a classe `is-open`.
  - No reduced-motion, a troca é instantânea.
- **Elemento:** cada card é um `<figure tabindex="0">` dentro de um `<li>`, não um `<button>`.
  - Um botão juntaria o `alt` da foto, o ano, o nome e a taça num rótulo só, longo demais.
  - A foto é só um realce: todo o conteúdo (ano, nome, troféu e a descrição da foto) já está no texto e no `alt`.
- **Duotone:** a foto entra no mesmo tom de saibro do Face-à-face (mesma função de `filter`) e ganha cor, para as duas seções falarem a mesma língua.
- **Celular:** o card que cruza a faixa central da tela (10% do meio) abre sozinho, e o toque abre e fecha.
- **Navegação:** com 5 links ela não cabe entre 721 e 1180 px. Sai o "Le Service" (o wordmark faz o mesmo) e, abaixo de 1000 px, a navegação some.
