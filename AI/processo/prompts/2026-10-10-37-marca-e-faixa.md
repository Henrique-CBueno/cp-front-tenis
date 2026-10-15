# Prompt 37 · a bola sumindo na marca e a faixa laranja em Sous la Terre

**Data:** 2026-10-10 · **Ferramenta:** Claude Code (Claude Opus 5.5)

## O que eu pedi (literal)
> 1. A bolinha quicar por cima da marca e nn desaparecer
> 2. Ao entrar dentro das camadas da quadra, em baixo ainda fica um laranja da proxima secao, nao quero isso

## O que a IA fez
- **Mediu antes de mudar:**
  - no ponto onde a bola toca a Marca 02, o elemento de cima era a faixa da seção. A bola estava **por baixo** do conteúdo (z-index -1, para passar atrás das cenas opacas), e o oval da marca a cobria;
  - em Sous la Terre, a cena prendia com o topo 18 px acima da tela, porque a marca ficava a 52% da altura. Sobravam 18 px da seção seguinte embaixo.
- **Correção 1:**
  - a bola do rali e a sombra dela passaram para **acima** do conteúdo das seções, então ela quica por cima das marcas;
  - as cenas opacas (Histoire, Sous la Terre, Face-à-face e as faixas do marquee) subiram um nível, e a bola continua passando por trás delas.
- **Correção 2:** a marca do tijolo foi para o meio exato da altura (50%). Agora a cena prende rente ao topo e ocupa a tela inteira, no desktop e no celular.
- **Testes:** 2 E2E novos, que falham com o CSS antigo (validados por mutação):
  - a bola é o elemento de cima quando toca a Marca 02;
  - Sous la Terre ocupa a tela inteira enquanto cava, com menos de 1 px de folga.

  Total: 58 E2E e 26 unitários.
- Evidência: `processo/evidencias/25/marca-bola-por-cima.png`.
