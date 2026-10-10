# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + HTML/CSS/JS puro + GSAP ScrollTrigger + Lenis. Testes: Vitest (lógica pura) + smoke test Playwright.
Deploy na Vercel (assumido, não confirmado explicitamente). Decidido no grilling; ver `processo/decisoes/002-stack.md`.

## Users

**Primário:** fã brasileiro de tênis. Acompanha o circuito, lembra do Guga em Roland Garros e sonha em ir a Paris
ou cogita a viagem. Chega à página para reviver a mística do torneio no saibro e sai com vontade de estar lá.

**Contexto de avaliação (real):** o projeto é um Checkpoint da FIAP. O professor avalia a página **e** o processo
(prompts, pesquisa, decisões de IDV, correções de rota) documentado em `processo/`.

## Product Purpose

Uma landing page-tributo a Roland Garros que faz o visitante *sentir* o torneio: um saque real conduzido pelo
scroll abre a experiência, e a página percorre o saibro, a história e as lendas até levar ao site oficial de ingressos.
Sucesso = o fã termina a rolagem emocionado e clica no CTA; o avaliador vê técnica de motion e um processo de decisão rastreável.

## Positioning

Tributo **não oficial** de fã, com o olhar de um brasileiro sobre o torneio: o Guga (campeão em 1997, 2000 e 2001)
é o ponto emocional que uma página oficial ou internacional não teria. É **atemporal**: celebra o torneio como
instituição, sem promover uma edição específica.

## Operating Context

- Página única com scroll narrativo, vista sobretudo no desktop. No mobile a experiência é mais leve.
- O CTA leva para o site oficial (rolandgarros.com). Não há backend, formulário nem venda própria.
- Prazo de 2 dias, trabalho individual, com vibecoding (Claude Code + skills impeccable, to-spec, to-tickets, implement).

## Capabilities and Constraints

- **Hero:** sequência de frames de um saque real (vídeo de banco gratuito, jogador recortado) desenhada em `<canvas>` conforme o scroll, sobre camadas em parallax.
- **Seções planejadas:** Le Service → Terre Battue → Histoire → Les Légendes (Guga em destaque) → Números → CTA. O MVP é Hero, Terre Battue, Légendes e CTA; Histoire, Números e o polish mobile são extras.
- **Idioma:** PT-BR, com títulos em francês.
- **Imagens:** só com licença livre (Pexels, Mixkit, Unsplash, Wikimedia). Fotos e vídeos oficiais da FFT, ATP ou Getty não entram.
- **Performance:** os frames precisam de um conjunto reduzido no mobile e de preload progressivo.
- **Em aberto:** qual vídeo de saque usar (o usuário vai assistir aos candidatos de `processo/pesquisa/assets.md` e escolher).

## Brand Commitments

- **Sem o logo oficial nem a marca da FFT:** um wordmark tipográfico próprio.
- Aviso discreto de "projeto acadêmico, sem vínculo com a Fédération Française de Tennis".
- **Créditos/atribuições no rodapé**, obrigatórios pela licença CC BY-SA das fotos do Wikimedia.
- Restrição visual dada pelo usuário: cores tradicionais do torneio (laranja saibro, verde, azul-marinho, creme/bege, branco) com linguagem das affiches. O detalhamento fica no DESIGN.md.

## Evidence on Hand

- Pesquisa de assets com URLs e licenças: `processo/pesquisa/assets.md`.
- Referências (affiches, técnica de scroll sequence): `processo/pesquisa/referencias-visuais.md`.
- **Ainda não existe** texto final, nenhum frame extraído nem foto baixada.
- Fatos históricos e números (títulos, datas, público, quadras) precisam ser **verificados em fonte** antes de entrar na página. Não inventar estatísticas nem citações.

## Product Principles

1. **O saque é a promessa.** Tudo começa no gesto real do saque. Se o hero não impressiona, nada depois compensa.
2. **Real, não genérico.** Imagens reais com licença e fatos verificados, nada de stock genérico de "esporte".
3. **Olhar brasileiro.** O Guga e a memória do fã brasileiro dão à página uma voz que nenhuma página oficial teria.
4. **Motion com propósito.** Toda animação conta parte da história (saque, saibro, tempo), nunca é enfeite.
5. **Processo visível.** Cada decisão relevante fica registrada em `processo/`.

## Accessibility & Inclusion

Respeitar `prefers-reduced-motion`: a frame sequence vira uma imagem estática do impacto e o parallax é desligado.
O conteúdo precisa funcionar sem animação. Contraste legível sobre fotos e texturas.
