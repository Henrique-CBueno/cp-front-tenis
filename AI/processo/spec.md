# Spec: Landing page "La Trace", tributo a Roland Garros

Status: ready-for-agent

> Fontes: grilling (`processo/01-grilling.md`), `PRODUCT.md`, brief de direção (`processo/idv/brief-direcao.md`),
> pesquisa de assets (`processo/pesquisa/assets.md`). Gerada com `/to-spec` em 2026-10-10.

## Problem Statement

O fã brasileiro de tênis só encontra Roland Garros em sites oficiais genéricos ("foto grande + cards") ou em
transmissões. Nada recria a sensação de estar na quadra de saibro, e nenhuma página fala com a memória
brasileira do torneio (Guga, 1997, 2000 e 2001, e o coração desenhado no saibro).

Para o aluno, o problema é duplo: entregar em 2 dias uma landing page com motion de alto nível e, ao mesmo tempo,
deixar todo o processo rastreável (prompts, decisões, correções de rota), porque é isso que o professor avalia.

## Solution

Uma landing page única, em PT-BR com títulos em francês, em que **a página é a quadra de saibro**:

- O visitante chega a um saibro em tela cheia, com grão e cortado pelas linhas brancas. Ao rolar, um jogador real **lança a bola e saca**: uma sequência de quadros recortados desenhada num canvas sobre camadas em parallax. No impacto, a bola sai do quadro e deixa a **Marca 01** no saibro.
- Cada seção seguinte é uma nova **Marca**, e um **traço contínuo** (a trajetória da bola) liga uma marca à outra.
- A página percorre o saibro (Terre Battue), as lendas (com o Guga e o coração como clímax) e termina em "Jeu, Set et Match", cuja última marca é o CTA **"Garanta seu ingresso"**, que leva ao site oficial.
- A página é um tributo não oficial e atemporal: sem logo da FFT, com aviso de projeto acadêmico e créditos das imagens no rodapé.
- O desktop tem a experiência completa. O mobile recebe menos quadros e layout empilhado. Com `prefers-reduced-motion`, aparece um quadro estático do impacto e as marcas já estão presentes.

## User Stories

### Primeira dobra: Le Service
1. Como fã, quero ver um saibro em tela cheia logo ao abrir a página, para reconhecer Roland Garros antes de ler qualquer texto.
2. Como fã, quero que as linhas brancas da quadra estruturem a tela, para sentir que estou *dentro* da quadra e não olhando uma foto dela.
3. Como fã, quero que o jogador lance a bola e saque conforme eu rolo, para controlar o gesto com a minha mão.
4. Como fã, quero que o saque seja fluido, sem saltos visíveis entre quadros, para que o movimento pareça real.
5. Como fã, quero que o saque aconteça com a seção fixa na tela, para não perder o gesto enquanto rolo.
6. Como fã, quero que o fundo (estádio, saibro) se mova em velocidades diferentes do jogador, para perceber profundidade.
7. Como fã, quero ver a bola deixar a Marca 01 no saibro no instante do impacto, para que o saque "abra" a página.
8. Como fã, quero ver um título em francês curto e marcante na primeira dobra, para entender o tema em um segundo.
9. Como fã, quero ver o CTA de ingresso já na primeira dobra, discreto, para poder agir sem rolar tudo.
10. Como fã com internet lenta, quero ver o primeiro quadro do saque quase imediatamente, para não encarar uma tela vazia enquanto o resto carrega.
11. Como fã, quero que, se eu rolar mais rápido do que os quadros carregam, a página mostre o quadro carregado mais próximo, para que o saque nunca "pisque" em branco.
12. Como fã, quero um indicativo sutil de que devo rolar, para descobrir que o saque é interativo.

### Navegação e traço
13. Como fã, quero que cada seção seja apresentada como uma Marca numerada, para sentir a página como uma sequência de pontos jogados.
14. Como fã, quero ver um traço contínuo (a trajetória da bola) ligando as marcas enquanto rolo, para que o olho seja guiado de seção em seção.
15. Como fã, quero uma navegação mínima com as seções, para pular direto às lendas ou ao ingresso.
16. Como fã, quero que o scroll seja suave mas não "sequestrado", para manter o controle da página.

### Terre Battue
17. Como fã, quero ver o saibro de perto (a marca vista de perto), para sentir a textura do pó de tijolo.
18. Como fã curioso, quero entender as camadas que formam a quadra de saibro, mostradas em corte com parallax, para aprender por que ela é única.
19. Como fã, quero entender em poucas linhas por que o saibro deixa o jogo mais lento, para valorizar o que vejo nas transmissões.

### Les Légendes
20. Como fã, quero ver as grandes lendas do torneio (Nadal, Evert, Borg e outras) com fatos verificados, para reviver a história.
21. Como fã brasileiro, quero que o Guga tenha destaque próprio, com os títulos de 1997, 2000 e 2001, para sentir que a página fala comigo.
22. Como fã brasileiro, quero ver o coração desenhado no saibro como clímax da seção, para me emocionar com a memória que só nós temos.
23. Como fã, quero que números, anos e placares apareçam como marcas pequenas e discretas, para ler os fatos sem poluição visual.

### Extras (se houver tempo)
24. Como fã, quero uma linha do tempo em que a linha de base da quadra vira o eixo das datas (Histoire), para entender a evolução do torneio desde 1891.
25. Como fã, quero números do torneio apresentados como marcas de placar (Números), para dimensionar sua grandeza.

### CTA e rodapé
26. Como fã, quero um fechamento "Jeu, Set et Match" em que a última marca é o ingresso, para terminar a rolagem com uma ação clara.
27. Como fã, quero que "Garanta seu ingresso" me leve ao site oficial, para comprar com segurança.
28. Como fã, quero saber que a página é um tributo não oficial, para não confundir com o site do torneio.
29. Como fotógrafo cujas imagens foram usadas, quero ser creditado com a licença correta no rodapé, para que meu trabalho seja respeitado.

### Mobile, acessibilidade e desempenho
30. Como fã no celular, quero que o saque funcione com menos quadros e sem travar, para ter a experiência mesmo no 4G.
31. Como fã no celular, quero que o celular baixe apenas o conjunto de quadros mobile, para não gastar dados com imagens de desktop.
32. Como fã no celular, quero as seções empilhadas e legíveis, sem scroll horizontal, para ler com uma mão.
33. Como visitante sensível a movimento, quero que, com `prefers-reduced-motion`, o saque vire uma imagem estática do impacto e o parallax seja desligado, para navegar sem desconforto.
34. Como visitante com leitor de tela, quero que o saque tenha uma descrição textual e as seções tenham títulos semânticos, para entender o conteúdo sem ver a animação.
35. Como visitante, quero texto com contraste legível sobre o saibro e as fotos, para ler sem esforço.
36. Como visitante só de teclado, quero navegar até o CTA e os links com foco visível, para usar a página sem mouse.
37. Como visitante, quero que a página carregue sem erros no console, para ter uma experiência estável.

### Processo (aluno e professor)
38. Como professor, quero encontrar na pasta do projeto os prompts, as decisões, as referências, a paleta e as correções de rota, para avaliar como o aluno pensou e corrigiu o caminho.
39. Como aluno, quero que cada etapa de implementação deixe um log de prompt com uma seção "Minha avaliação", para demonstrar olhar crítico sobre o que a IA entregou.
40. Como aluno, quero que a escolha do vídeo do saque e a comparação dos métodos de recorte fiquem registradas, para mostrar decisões baseadas em evidência.
41. Como aluno, quero que o `DESIGN.md` seja gerado no fim a partir da página pronta, para documentar a identidade visual real.

### Le Mur (epílogo, rodada 5)
42. Como fã que chegou ao fim, quero que a Bola salte do ingresso para um paredão e espere minha rebatida, para continuar brincando com a mesma bola que abriu a página.
43. Como fã no computador, quero rebater a Bola encostando o cursor-raquete nela, com mais força quando subo o mouse, para jogar com o gesto do tênis.
44. Como fã no celular, quero rebater tocando perto da Bola, sem perder o arrastar para rolar a página, para jogar com uma mão.
45. Como visitante só de teclado, quero um botão "Jogar" e o espaço para rebater, para que o jogo não seja a única parte da página fora do meu alcance.
46. Como jogador, quero a regra do tênis (a bola pode quicar uma vez; dois quiques ou fora é erro; três erros encerram a partida), para que o jogo pareça tênis e não um minigame genérico.
47. Como jogador, quero que acertar com o centro das cordas mande a Bola mais alto e que o jogo acelere a cada 5 rebatidas, para que a precisão conte e a partida tenha fim natural.
48. Como jogador, quero ver as Marcas dos quiques se acumulando no saibro da partida, o placar e o meu recorde guardado, para ter motivo de jogar de novo.
49. Como jogador, quero som de rebatida, quique, erro e recorde, com um botão para silenciar que lembre a minha escolha, para sentir o jogo sem ser incomodado.
50. Como fã, quero que o jogo pause se eu rolar para longe e que a Bola volte ao rali quando eu subir, para que a página continue tendo uma bola só.
51. Como visitante sensível a movimento, quero que, com `prefers-reduced-motion`, o Le Mur vire um estado parado com o meu recorde, para não receber um jogo de reflexo que não pedi.

## Implementation Decisions

- **Stack:** Vite + HTML/CSS/JS puro (sem framework de UI), GSAP com ScrollTrigger (pin e scrub do saque, parallax, desenho do traço) e Lenis (scroll suave). Deploy estático na Vercel.
- **Página única** com seções semânticas na ordem Le Service → Terre Battue → (Histoire) → Les Légendes → (Números) → Jeu, Set et Match + rodapé. Histoire e Números são extras do MVP.
- **Módulo "Sequência do Saque"** (lógica pura, sem DOM, é o seam de teste unitário). Interface única: é criado com o manifesto dos conjuntos de quadros e um carregador de imagens injetado, e responde *qual imagem desenhar para um progresso de scroll entre 0 e 1*. Ele encapsula:
  - a escolha do conjunto (**desktop**, **mobile** ou **estático**) a partir da largura do viewport, do device pixel ratio e de `prefers-reduced-motion`;
  - o mapeamento progresso → índice do quadro (com limite nas pontas);
  - a ordem de preload: primeiro quadro → quadros-chave espaçados → o resto;
  - o fallback para o **quadro carregado mais próximo** quando o alvo ainda não chegou.
- **Camada de desenho** (fina, fora do módulo): um canvas dimensionado ao viewport e ao DPR, que desenha a imagem devolvida pelo módulo dentro de `requestAnimationFrame` e só redesenha quando o quadro muda.
- **Camadas do parallax:** saibro com grão (fundo, a superfície da página), estádio (foto Wikimedia CC BY-SA), linhas da quadra e jogador (canvas). Velocidades distintas via ScrollTrigger.
- **Marcas e traço:** cada seção abre com uma Marca numerada (oval no saibro). O traço da bola é um path contínuo desenhado progressivamente com o scroll e liga as marcas. O grão do saibro reage ao quadro do saque em vez de ser um filtro estático.
- **Pipeline de assets** (script reproduzível, fora do bundle):
  1. o aluno escolhe o vídeo e o trecho (do lançamento ao follow-through);
  2. ffmpeg extrai cerca de 90 quadros para desktop e cerca de 45 para mobile;
  3. o fundo é removido, comparando luma-key do ffmpeg e rembg (venv local), com a escolha registrada;
  4. a exportação é em WebP com alpha;
  5. um manifesto lista os conjuntos (contagem, dimensões, caminho) e é consumido pelo módulo Sequência do Saque.

  Vídeo escolhido: **Mixkit 873** (câmera lenta, ~100 quadros no saque, trecho ~2,4–6,8 s, 720p). O fundo (céu, alambrado) é removido com rembg. Ver decisão 006.
- **Direção visual "La Trace":** estratégia de cor Drenched, com saibro `#b9532c` como superfície, linhas/creme `#f6efe2`, saibro escuro `#8f3a18` e verde `#1f5c3a` como acento raro. Números e anos aparecem num tamanho único, com hierarquia por peso e caixa. As fontes são escolhidas no build, com ponto de vista e fora da lista de fontes padrão de IA, servidas localmente.
- **Conteúdo:** fatos verificados em fonte antes de entrar (títulos, datas, o coração do Guga em 2001). Nada de estatística inventada. Os títulos são em francês e o texto corrido em PT-BR.
- **CTA:** "Garanta seu ingresso" → link externo para a área de ingressos do site oficial, em nova aba. Aparece discreto na primeira dobra e principal no fechamento.
- **Marca e legal:** wordmark tipográfico próprio (sem o logo da FFT), aviso "projeto acadêmico, sem vínculo com a Fédération Française de Tennis" e créditos/atribuições no rodapé (CC BY-SA do Wikimedia; Pexels e Unsplash com crédito de cortesia).
- **Reduced motion:** com `prefers-reduced-motion`, o módulo devolve o conjunto estático (um quadro do impacto), o pin e o parallax são desligados e as marcas e o traço aparecem já completos.
- **Processo:** toda etapa gera um log de prompt em `processo/prompts/`, decisões em `processo/decisoes/` e desvios em `processo/correcoes-de-rota.md`, conforme o `CLAUDE.md`. O `DESIGN.md` e `.impeccable/design.json` são escritos no fim, pelo documenter da impeccable.

- **Le Mur (epílogo, decisão 019):** uma seção depois de "Jeu, Set et Match" e antes do rodapé, fora do container do rali (o traço continua terminando no ingresso). Vista de lado: o saibro é o chão, e a Bola sobe e cai na vertical.
  - **Módulo "Regras do Le Mur"** (`src/le-mur-rules.js`, lógica pura, sem DOM, é o seam de teste): a máquina de estados parado → jogando → pausado → fim; `step(dt)` com gravidade, quique com perda de energia, quiques desde a última rebatida e saída pela lateral; `hit({ quality, power })`; os erros, o placar total, a dificuldade a cada 5 rebatidas e o recorde (recebido e devolvido, sem storage).
  - **Camada do jogo** (`src/le-mur.js`): o DOM, o loop no `gsap.ticker`, as Marcas (reusando `stamp`/`erase`/`dust`), o toque, o teclado, a pausa fora da tela e o recorde e o mute em localStorage.
  - **Som** (`src/le-mur-sound.js`): Web Audio sintetizada, sem arquivos.
  - **Cursor-raquete:** passa a aceitar uma lista de alvos, com a velocidade do ponteiro (força) e a distância ao sweet spot (qualidade). **Rali:** expõe `finished()`, o traço completo, que decide quando a Bola pertence ao jogo.

## Testing Decisions

- **Bons testes verificam comportamento externo pela interface pública**, não detalhes internos. Nada de testar CSS, timings de animação ou estrutura do DOM.
- **Seam 1: módulo Sequência do Saque (Vitest, unitário).** O carregador é falso e controlável (resolve imagens sob demanda) e não há DOM. Casos:
  - progresso 0 → primeiro quadro, progresso 1 → último, valores fora de [0,1] limitados às pontas;
  - mapeamento proporcional ao número de quadros do conjunto ativo;
  - viewport estreito escolhe o conjunto mobile, largo escolhe o desktop, reduced-motion escolhe o estático (independe da largura);
  - ordem de preload: primeiro quadro, depois quadros-chave, depois o resto;
  - alvo não carregado → devolve o quadro carregado mais próximo; nada carregado → devolve "nada a desenhar" sem erro.
- **Seam 2: página construída (Playwright, smoke test sobre o build de produção servido localmente).** Casos:
  - a página carrega sem erros no console;
  - depois de rolar pela seção do saque, o canvas contém pixels não transparentes;
  - o CTA "Garanta seu ingresso" tem `href` do site oficial;
  - com reduced-motion emulado, o quadro estático é exibido e nenhum quadro da sequência é requisitado além dele;
  - no viewport mobile, só arquivos do conjunto mobile são requisitados.
- **Seam 3: módulo Regras do Le Mur (Vitest, unitário),** com tempo simulado por `step(dt)`. Casos:
  - parado: quiques não contam erro;
  - a primeira rebatida começa a partida;
  - um quique depois da rebatida é válido, e o segundo é erro;
  - a Bola fora pela lateral é erro;
  - o terceiro erro encerra a partida com o placar total;
  - depois de um erro, espera a rebatida;
  - a qualidade do contato muda a altura e o desvio, e a força muda a velocidade;
  - a dificuldade sobe a cada 5 rebatidas;
  - o recorde só sobe;
  - pausado, `step` não avança.
- **Le Mur no Playwright:** a Bola chega com o traço completo; uma passada da raquete conta uma rebatida; três erros mostram o placar; o recorde sobrevive ao recarregar; o toque perto da Bola rebate no celular; o estado parado com reduced-motion; nunca há duas bolas à vista.
- **Fora dos testes automatizados:** parallax, tipografia, layout e motion. São verificados por screenshots desktop (1440) e mobile (390) nas etapas critique/audit/polish da impeccable e no finish review.
- **Prior art:** nenhum. O repo é greenfield. Esses testes estabelecem o padrão.

## Out of Scope

- Venda de ingressos, formulários, newsletter e qualquer backend.
- Multipáginas, i18n (outros idiomas além de PT-BR com títulos em francês) e CMS.
- Conteúdo de uma edição específica (datas, chaves, contagem regressiva): a página é atemporal.
- Logo, fotos e vídeos oficiais da FFT, ATP ou Getty.
- Regressão visual automatizada.
- WebGL/3D. O efeito é canvas 2D + parallax em camadas.
- No Le Mur: placar compartilhado entre jogadores (exigiria servidor), adversário, vista de frente para o paredão e arquivos de áudio.
- Histoire e Números ficam fora do MVP: entram só se sobrar tempo no dia 2.

## Further Notes

- **Vídeo do saque:** escolhido pelo aluno (Mixkit 873, decisão 006) após comparar as folhas de contato dos 3 candidatos.
- **Prazo de 2 dias:** o hero (saque + parallax + Marca 01) é o primeiro e mais arriscado ticket. Fallback combinado: se o recorte ou o parallax não ficarem bons, a sequência de quadros vai sozinha, com o fundo do próprio vídeo.
- **Fatos a verificar antes de publicar:** os títulos de Nadal, Evert e Borg; os anos do Guga; o coração desenhado em 2001; a data de fundação (1891) e a abertura a estrangeiros (1925).
- **Licenças:** o CC BY-SA do Wikimedia exige atribuição e que a versão editada mantenha a licença.
