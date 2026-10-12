# 007 · Tipografia e ajuste de contraste do saibro

**Status:** decidida pela IA no ticket 01 (pendente de revisão minha) · **Data:** 2026-10-10

## Tipografia
- **Display: Anybody** (variável em peso **e largura**, OFL). Os títulos usam a largura condensada (~62%) e o wordmark, a expandida (150%).
  **Porquê:** "La Trace" é a marca que a bola deixa ao **esticar** no saibro. Uma fonte que estica é a única com esse ponto de vista,
  e o eixo de largura pode ser animado depois (o título "derrapando" como a bola).
- **Texto: Schibsted Grotesk** (OFL). Grotesca de jornal, robusta e legível em PT-BR, fora da lista de fontes padrão de IA.
- Descartadas: Georgia (era só placeholder do esboço), Playfair/Fraunces/Space Grotesk (padrões de IA), fontes do sistema (proibidas como display).
- Servidas **localmente** via Fontsource (npm), sem Google Fonts.

## Contraste
- O saibro do brief, `#b9532c`, com texto creme `#f6efe2`, dá **4,23:1**, abaixo do mínimo de 4,5:1 (WCAG AA) para texto corrido.
- **Ajuste:** a superfície passou a ser `#b04e29` (o mesmo saibro, um pouco mais escuro), com **4,63:1**. O `#8f3a18` continua como saibro escuro (rodapé, 6,59:1).

## Título da primeira dobra
- O esboço escolhido trazia "La Trace" como título, mas isso repetia o wordmark. O h1 virou **"Le Service"**, o nome da seção do saque, como na spec.
