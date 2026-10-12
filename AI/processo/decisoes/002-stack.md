# 002 · Stack

**Status:** decidida (grilling Q7) · **Data:** 2026-10-10

## Opções
- **(a)** Vite + HTML/CSS/JS puro + GSAP ScrollTrigger + Lenis
- **(b)** React/Next + Framer Motion
- **(c)** HTML/CSS/JS sem build, com GSAP via CDN

## Escolha
**(a).** O GSAP ScrollTrigger é o padrão de mercado para scrub de frames e pin de seções, e o Lenis deixa o scroll suave.
O Vite dá hot reload e build otimizado. Numa página só, sem estado complexo, o React não acrescenta nada.
Deploy na Vercel (assumido; revisar).
