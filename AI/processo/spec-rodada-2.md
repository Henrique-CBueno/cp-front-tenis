# Spec rodada 2: o rali que joga, o Face-à-face e o Palmarès

Status: ready-for-agent

> Fontes: `processo/02-grilling-rodada-2.md` (decisões Q1–Q21), `DESIGN.md` (sistema La Trace já construído),
> `processo/pesquisa/landonorris.md` e `processo/pesquisa/fotos-rodada-2.md`. Prazo: +1 semana a partir de 2026-10-10.

## Problem Statement

A página entrega o saque e a história, mas, depois do hero, a bola do rali corre encostada na borda da tela e some na
Histoire. Ela deixa de ser a protagonista e parece um detalhe técnico. Comparada a referências como o landonorris.com,
falta animação de "momento": não há um duelo entre as lendas nem uma galeria de campeões que convide a explorar com o mouse.
O fã brasileiro chega ao Guga, mas não o vê lado a lado com o maior campeão do torneio.

## Solution

- **O rali que joga:** a página reserva espaço para a bola. Entre as seções há **respiros**, em que ela cruza a página em arco e
  **quica**: cada quique deixa uma mini marca, levanta pó, achata a bola e tem sombra no chão. **Dentro de cada seção** há um vazio
  reservado, do lado oposto ao texto (nunca na borda), por onde ela faz uma curva em S. O movimento é suave, com inércia.
  Na **Histoire**, a bola rola sobre a linha do tempo de data em data. Nas **camadas** da quadra ela passa por trás
  ("atravessa o chão"), e os **placares** abrem um vão central para ela.
- **Face-à-face:** antes do coração, uma seção presa em que **Guga e Nadal** entram de lados opostos, recortados e de perfil,
  em duotone de saibro. Eles se aproximam da linha central; quando "se encaram", ganham cor e a rede pulsa.
  Os títulos contam (3 | 14) e aparece a frase "Dois reis do saibro. Um brasileiro.".
- **Palmarès:** uma galeria de campeões. Cada card mostra o troféu (Mousquetaires ou Suzanne-Lenglen), o ano e o nome. No hover, uma
  máscara de saibro sobe como onda e revela a foto do campeão com o troféu (duotone → cor). No celular, a revelação vem pelo scroll e pelo toque.
- **Mais vida:** títulos que se revelam letra a letra, esticando na largura; um marquee em francês que acompanha a
  velocidade do scroll; e a **raquete-cursor** no desktop, que segue o mouse, dá um swing no clique e **rebate a bola** do rali.
- **Imagens reais com licença livre** (Commons/Flickr CC), com créditos e procedência embutida. O Getty fica só como referência.

## User Stories

### O rali
1. Como fã, quero que a bola volte a correr pela página, e não encostada na borda, para senti-la como protagonista.
2. Como fã, quero que o caminho da bola seja uma curva suave e natural, e não uma linha reta, para que pareça um rali de verdade.
3. Como fã, quero que a bola atravesse a página de um lado ao outro nos respiros entre as seções, como uma troca de bolas de fundo de quadra.
4. Como fã, quero ver a bola quicar nos respiros, achatando no impacto, para sentir o peso dela no saibro.
5. Como fã, quero que cada quique deixe uma pequena marca e levante pó no saibro, para que o rali "escreva" a página.
6. Como fã, quero ver a sombra da bola no chão crescendo e encolhendo, para perceber a altura do arco.
7. Como fã, quero que a bola nunca passe por cima de um texto, para ler sem ser atrapalhado.
8. Como fã, quero que cada seção tenha um espaço próprio por onde a bola passa, para que texto e bola dividam a quadra.
9. Como fã, quero que a bola acompanhe o scroll com uma leve inércia, para que o movimento seja fluido mesmo quando rolo aos trancos.
10. Como fã, quero que a bola continue visível na Histoire, rolando sobre a linha do tempo de data em data, para que ela não "suma".
11. Como fã, quero que a bola passe por trás das camadas da quadra, para entender que ela "atravessa o chão".
12. Como fã, quero que os placares abram um vão central por onde a bola passa, para continuar vendo a bola.
13. Como fã, quero que cada Marca ainda "afunde" quando a bola chega, para manter o sistema de marcas.
14. Como visitante sensível a movimento, quero que, com reduced-motion, o traço do rali apareça completo e estático, sem quiques nem inércia.

### Face-à-face
15. Como fã brasileiro, quero ver Guga e Nadal frente a frente, para sentir que o Brasil tem um rei do saibro.
16. Como fã, quero que os dois entrem de lados opostos conforme eu rolo, para que o encontro seja um momento.
17. Como fã, quero que eles comecem em tom de saibro e ganhem cor ao se encontrar na linha central, para marcar o clímax.
18. Como fã, quero ver os nomes grandes atrás de cada um, para saber quem é quem sem ler legenda.
19. Como fã, quero ver os títulos contarem (3 | 14), para dimensionar cada carreira.
20. Como fã, quero a frase "Dois reis do saibro. Um brasileiro.", para fechar o momento com emoção.
21. Como fã no celular, quero ver os dois lado a lado e se encarando, mesmo menores.
22. Como fã, quero que o coração do Guga venha logo depois, para que o Face-à-face leve à memória mais forte.
23. Como visitante com reduced-motion, quero ver o estado final (os dois em cor, frente a frente) sem a sequência presa.

### Palmarès
24. Como fã, quero uma galeria de campeões com os troféus, para conhecer quem venceu cada ano.
25. Como fã, quero ver o troféu certo de cada campeão (Mousquetaires para os homens, Suzanne-Lenglen para as mulheres).
26. Como fã no desktop, quero passar o mouse sobre um troféu e ver a foto do campeão com ele, para "abrir" cada ano.
27. Como fã, quero que a foto apareça com uma máscara de saibro subindo como onda, para que a revelação tenha a identidade da página.
28. Como fã no celular, quero que o card no meio da tela revele a foto sozinho, e que o toque também funcione.
29. Como fã, quero ver os campeões em ordem cronológica, para acompanhar o tempo.
30. Como usuário de teclado, quero que o foco num card revele a foto como o hover, para não depender do mouse.
31. Como fã, quero chegar ao Palmarès pela navegação, para ir direto aos campeões.
32. Como fotógrafo, quero meu crédito e minha licença no rodapé, para cada foto usada.

### Mais animações
33. Como fã, quero que os títulos das seções se revelem letra a letra, esticando na largura, para que cada capítulo "entre em quadra".
34. Como leitor de tela, quero que os títulos animados continuem sendo lidos como uma palavra só, para que a animação não quebre a leitura.
35. Como fã, quero uma faixa de texto em francês correndo entre as seções, que acelera quando rolo rápido e inverte quando volto, para sentir o ritmo do torneio.
36. Como fã no desktop, quero que o cursor seja uma raquete, para me sentir jogando.
37. Como fã no desktop, quero que a raquete dê um swing quando clico, para que o clique tenha resposta física.
38. Como fã no desktop, quero que a raquete rebata a bola do rali quando encosta nela (a bola dá um pulinho e solta pó), como um easter egg.
39. Como fã no desktop, quero que a raquete fique em posição de espera sobre links e botões, para saber que posso clicar.
40. Como usuário de toque ou com reduced-motion, quero o cursor normal do sistema, sem raquete.
41. Como visitante, quero que todas essas animações mantenham a página fluida (60 fps no celular médio), para não travar.

### Processo
42. Como professor, quero ver o grilling da rodada 2, a pesquisa das referências e das fotos e as decisões, para avaliar a evolução.
43. Como aluno, quero que cada ticket da rodada 2 tenha log de prompt e evidências, como na rodada 1.

## Implementation Decisions

- **Módulo "Trajeto do Rali" (novo, puro, seam de teste 1):** recebe a lista de **pontos de passagem** (marcas das seções,
  pontos de quique nos respiros, entrada e saída dos vazios reservados) e a largura da página, e devolve:
  - uma **spline suave** contínua (Catmull-Rom → Béziers) monótona em y, para a ponta seguir o scroll;
  - os **pontos de quique**, para as mini marcas e o pó;
  - para cada posição da ponta, a **altura da bola** acima do chão (0 no quique, máxima no meio do arco), que alimenta a sombra e o achatamento.
  Substitui o roteamento atual pela borda (`railPath` em `src/rally.js`). A medição dos alvos no DOM continua na camada de rali.
- **Layout:** cada seção ganha um **vazio reservado** do lado oposto ao texto (~65–75% da largura, nunca na borda), declarado
  no HTML como uma zona que o rali usa como ponto de passagem. Entre as seções há **respiros** (faixas de saibro sem conteúdo) com 1 ou 2 quiques.
  Placares: grade com **vão central**. Camadas: a bola passa por trás (z-index), como hoje.
- **Inércia:** a ponta do traço persegue a posição-alvo do scroll com amortecimento (lerp por frame), sem estourar o traço desenhado.
- **Histoire:** durante o pin horizontal, a bola fica presa à linha do tempo. A posição x vem do progresso do pin; o y é a linha.
  A bola salta entre os dots das datas. Na saída do pin, ela devolve o controle ao trajeto.
- **Física visual:** mini marca (oval pequeno que afunda) e pó (algumas partículas de saibro, em canvas 2D ou SVG com vida curta)
  em cada quique. A bola achata (`scaleY`) perto da altura 0. A sombra (elipse que escala e esmaece com a altura) fica no plano do chão.
- **Face-à-face:** seção nova presa, dentro de Les Légendes, antes do coração. Fotos recortadas com rembg (venv já existente), espelhadas se preciso,
  em duotone de saibro por CSS (filtro/mix-blend) que transiciona para cor. Timeline conduzida pelo scroll (GSAP ScrollTrigger): entrada, aproximação,
  encontro (cor + pulso da linha central), contagem, frase. Celular: lado a lado. Reduced-motion: estado final.
- **Palmarès:** lista semântica de campeões (ano, nome, troféu), um card por campeão com foto livre, mais os que o Flickr cobrir.
  O troféu recortado é a base. A foto fica numa camada com **máscara** (clip-path/mask animado de baixo para cima, numa forma de onda)
  disparada por hover, foco e toque. No celular, um ScrollTrigger revela o card que está no centro.
- **Títulos letra a letra:** os títulos das seções são divididos em letras com `aria-label` no título e `aria-hidden` nas letras.
  Cada letra entra com `font-stretch` e opacidade escalonados, uma vez, quando o título entra na tela.
- **Marquee:** duas faixas, uma entre o hero e Terre Battue e outra antes de Jeu, Set et Match, com o texto francês repetido em Anybody larga.
  A velocidade base cresce com a velocidade do scroll (Lenis `velocity`) e o sentido inverte ao rolar para cima. Fica parado em reduced-motion.
- **Raquete-cursor:** um SVG próprio da raquete (geometria), em posição fixa, seguindo o mouse com mola. O hotspot é o centro das cordas.
  O swing no clique é uma rotação rápida com retorno. Sobre links e botões ela fica em "posição de espera" (inclinação e escala).
  Ao colidir com a bola do rali (distância < raio), dispara o pulinho + pó na bola. `cursor: none` só com `(hover: hover) and (pointer: fine)` e sem reduced-motion.
- **Imagens:** fotos do Commons e do Flickr CC baixadas e tratadas por script (extensão de `tools/imagens.sh`); recortes com rembg num script próprio;
  procedência embutida via `tools/procedencia.sh`; créditos no rodapé. O Getty só como referência.
- **DESIGN.md:** a regra "One Ball" é reescrita (a raquete é o jogador; a bola continua única), e entram os componentes novos e os tokens de motion.

## Testing Decisions

- **Bons testes verificam comportamento pela interface pública**, sem testar CSS nem timings.
- **Seam 1: módulo "Trajeto do Rali" (Vitest):**
  - o trajeto passa por todos os pontos de passagem, na ordem;
  - ele é monótono em y (para a ponta seguir o scroll);
  - nenhum ponto da curva entra numa caixa de texto declarada como proibida;
  - a altura da bola é 0 nos quiques e máxima no meio de cada arco;
  - a saída é estável para a mesma entrada.
- **Seam 2: página construída (Playwright):**
  - a bola fica visível durante a Histoire;
  - o Palmarès revela a foto no hover, no foco por teclado e no toque;
  - o Face-à-face chega ao estado final (os dois em cor, 3 | 14);
  - os títulos animados mantêm o nome acessível;
  - a raquete-cursor existe com mouse e não existe com toque nem com reduced-motion;
  - nenhum elemento transborda em 360/390.
- **Visual:** screenshots desktop 1440 e mobile 390 em cada ticket; revisão final da impeccable no ticket 21.
- **Desempenho:** `tools/medicoes/fluidez.mjs`, com meta de 60 fps no mobile com a CPU 4× mais lenta.
- **Prior art:** `src/serve-sequence.test.js` (unitário com dependência injetada) e `tests/e2e/*.spec.js`.

## Out of Scope

- Fotos do Getty (nem baixadas nem em embed).
- Som (o "toc" da raquete) e WebGL/3D.
- Novos fatos no texto além do que as fotos e os títulos já sustentam (as datas e os títulos vêm de `pesquisa/fatos.md`).
- Deploy (continua pendente, por decisão do aluno).

## Further Notes

- **Lacunas do Palmarès:** Federer 2009, Wawrinka, Djokovic 2021, Świątek 2020/22/24 e 2025 dependem da busca no Flickr CC (ticket 13). Se não houver foto livre, o ano fica de fora (decisão Q9).
- **Direção do olhar no Face-à-face:** confirmar nas miniaturas para que lado cada um olha; espelhar quando preciso (a licença CC BY-SA permite, e a versão editada segue CC BY-SA).
- **Usabilidade da raquete:** o aluno escolheu manter a raquete também sobre os links, mesmo com o aviso. A "posição de espera" precisa ser clara, e o foco por teclado continua com outline visível.
