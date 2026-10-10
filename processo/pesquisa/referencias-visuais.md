# Referências visuais e técnicas

## As affiches de Roland Garros
- Desde 1980, um artista diferente cria o pôster oficial a cada ano. O de 2025 é de Marc-Antoine Mathieu (quadrinhos); o de 2026, de JR (colagem fotográfica).
- Arquivo completo de 1980 a 2025: https://www.garros.gallery/
- [Pôster de 2025](https://www.rolandgarros.com/en-us/article/2025-official-poster-marc-antoine-mathieu-comics-tennis) · [Pôster de 2026](https://www.rolandgarros.com/en-us/article/2026-edition-roland-garros-official-poster-jr-clay-eye-photo-collage)
- Têm direitos autorais: servem **só como referência** de linguagem (grão, textura de papel, tipografia expressiva), sem reproduzir.

## Cores
- Não existe hex oficial publicado. O site oficial cita como cores tradicionais **laranja saibro, azul-marinho, bege e branco**.
- Laranja saibro em fontes de terceiros (não oficiais): `#BB5522` ou `#B6552F`.
- Verde: nenhuma fonte encontrada. Vou pegar a cor do logo oficial com conta-gotas.
- A paleta final vai ser definida em `idv/` e `DESIGN.md` (impeccable shape).

## Técnica: "Apple scroll sequence"
- É o padrão das páginas de produto da Apple (AirPods Pro, MacBook): um `<canvas>` desenha o frame N de uma sequência de imagens pré-carregadas, e N vem do progresso do scroll dentro de uma seção fixada (pin).
- Com GSAP ScrollTrigger: `scrub` liga o progresso ao índice do frame e `pin` segura a seção enquanto o saque acontece.
- Cuidados: preload progressivo (primeiro frame imediatamente, o resto em seguida), conjunto menor no mobile, desenhar com `requestAnimationFrame`, `prefers-reduced-motion` mostrando um frame estático do impacto.
