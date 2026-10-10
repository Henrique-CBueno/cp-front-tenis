# Correções de rota

Registro do que mudou de direção, saiu errado ou foi corrigido ao revisar a entrega da IA.

---

## #1 · O enunciado mudou o foco do projeto (2026-10-10)
- **Antes:** meu pedido inicial era só sobre a página (parallax, saque, imagens reais).
- **O que aconteceu:** na primeira rodada do grilling, a IA perguntou pelas regras do checkpoint. Ao colar o enunciado, ficou claro que **o processo é avaliado tanto quanto o resultado**.
- **Correção:** a documentação virou parte do escopo desde o primeiro dia, com a pasta `processo/`, o log de prompts e as decisões registradas, em vez de ser escrita no fim.

## #2 · A recomendação de testes não foi aceita (2026-10-10)
- **IA recomendou:** só Vitest na lógica pura.
- **Eu escolhi:** incluir também um smoke test com Playwright (ver `decisoes/003-testes.md`).

## #3 · A expectativa sobre os vídeos não bateu com a realidade (2026-10-10)
- **Expectativa:** um vídeo gratuito de saque em câmera lenta, numa quadra de saibro, com corpo inteiro.
- **Realidade:** não existe (ver `pesquisa/assets.md`).
- **Ajuste:** priorizar um vídeo com **fundo preto** (fácil de recortar) e criar o "saibro" com as camadas do parallax.

## #4 · Edição atemporal em vez de 2027 (2026-10-10)
- **IA recomendou:** promover a edição de 2027, já que a de 2026 passou.
- **Eu escolhi:** página **atemporal**, celebrando o torneio como instituição.
- **Impacto:** nada de datas de edição nem contagem regressiva. O CTA de ingresso fica genérico e aponta para o site oficial.

## #5 · Skill impeccable não registrada (2026-10-10)
- **Problema:** `Skill impeccable` → `Unknown skill`. A skill está em `.agents/skills/` mas não está ligada ao Claude Code.
- **Contorno:** a IA leu os arquivos da skill e seguiu o fluxo à mão. Os scripts da skill (`impeccable context`) funcionaram normalmente.
- **Pendente:** criar o symlink em `~/.claude/skills/impeccable`, como já existe para `grill-me` e `to-spec`, se eu quiser invocá-la direto.

## #6 · O DESIGN.md não sai do shape (2026-10-10)
- **Plano original:** o `shape` geraria o `DESIGN.md` (paleta, tipo, motion) antes da spec.
- **O que a skill diz:** o `shape` só gera um **brief de direção**. O `DESIGN.md` é escrito **no fim**, a partir da página pronta, porque um manual escrito antes acaba sendo defendido contra a realidade.
- **Ajuste:** a direção e a paleta ficam em `idv/brief-direcao.md`, que alimenta o `to-spec`. O `DESIGN.md` entra na etapa final.

## #7 · Não fiquei com a direção sorteada (2026-10-10)
- **Sorteio:** "Ordre de Jeu" (a página como programa do dia).
- **Escolhi:** "La Trace" (a página como a quadra; cada seção é uma marca da bola).

## #8 · O top pick da pesquisa não era o melhor vídeo (2026-10-10)
- **Pesquisa (só pelas descrições):** o top pick era o cottonbro, pelo fundo preto que facilita o recorte.
- **Ao olhar os quadros** (folhas de contato geradas pela IA): o cottonbro corta a raquete e o golpe tem ~12 quadros. O Mixkit é câmera lenta, com ~100 quadros.
- **Correção:** escolhi o **Mixkit 873**. Lição: avaliar o material de verdade, e não a descrição. O critério certo era a fluidez do scrub, não a facilidade do recorte.

## #9 · A cor do brief reprovou no contraste (2026-10-10)
- O saibro `#b9532c` com texto creme dava 4,23:1 (< 4,5:1). Escureci a superfície para `#b04e29` (4,63:1). Ver `decisoes/007`.

## #10 · Primeiro screenshot: título tímido e linha cruzando o texto no mobile (2026-10-10)
- **1ª versão:** h1 fino (peso 300) e pequeno demais para o esboço, e no mobile a linha central da quadra passava por cima do parágrafo.
- **Correção:** peso 500 e tamanho maior; no mobile a linha foi para 88% da largura, com o texto limitado antes dela. Evidências em `evidencias/01/`.

## #11 · O detector da impeccable deu falso positivo (2026-10-10)
- O `impeccable detect` acusou uma "hierarquia tipográfica plana" (h1 = 16px), porque leu o HTML sem o CSS, que é importado via JS pelo Vite. Na página renderizada, o h1 tem ~168px. Achado ignorado, com justificativa.

## #12 · O canvas não respeitou top/bottom (2026-10-10)
- **Sintoma (screenshot):** o vídeo do saque parava no meio da quadra, longe da linha de base.
- **Causa:** `<canvas>` é um elemento substituído. Com `position: absolute`, `top` + `bottom` não esticam a altura dele, que segue a proporção intrínseca.
- **Correção:** altura explícita (`height: 71%`). No mobile, a linha de base desceu para não cobrir o texto. Evidências em `evidencias/02/`.

## #13 · Chroma/luma-key e "placa limpa" não servem para este vídeo (2026-10-10)
- **Plano da spec:** comparar luma-key do ffmpeg × rembg.
- **Resultado:** os keys removem o céu, mas a camisa branca some junto e o alambrado fica.
- **Tentativa extra da IA:** montar uma placa limpa do fundo (a câmera parecia parada) para recuperar raquete e bola pela diferença. **Falhou:** a câmera se move.
- **Ficou:** rembg (birefnet-lite). A bola vira elemento próprio da página. Ver `decisoes/008`.

## #14 · Ajustes do hero pelos screenshots (2026-10-10)
- A textura do saibro mostrava **emendas** retas (o tile não era contínuo). Corrigi espelhando em 2×2 e reduzindo a opacidade.
- A linha de base passava **por cima da legenda** da Marca 01. A marca subiu.
- No mobile, a arquibancada tinha uma **borda dura** em cima. Ganhou um degradê no topo.
- "MARCA 01" quebrava em duas linhas no reduced-motion → `nowrap`.
- A estimativa do instante do impacto (quadro 76) estava cedo: pela grade dos quadros, o contato é no quadro 82.
- **Bug achado na revisão:** a bola pousava na borda esquerda da marca, e não dentro dela. O ponto de pouso era medido com `getBoundingClientRect` numa marca que começa em `scale(0)` (largura medida = 0). Corrigido com as medidas de layout (`offset*`).

## #15 · O traço cortava o texto (2026-10-10)
- **Sintoma (screenshot):** curvas S entre as marcas passavam por cima de títulos e parágrafos, principalmente no celular, e o rali começava solto, sem sair da Marca 01.
- **Correção:** roteamento por tela. No desktop, o traço sai na horizontal e desce na coluna vazia; no celular, desce pela margem direita. O início foi ligado à Marca 01. Ver `decisoes/010`.
- **Também:** o texto passava por baixo da navegação transparente (o topo ganhou um degradê de saibro), e "MARCA 03" estourava a borda no celular (largura da legenda).

## #16 · Terre Battue: contraste e a "segunda bola" (2026-10-10)
- O creme-suave (`#ecd9c6`) do texto corrido sobre o saibro dava **3,86:1** (reprovado). O texto corrido voltou para o creme principal (4,63:1). O texto da camada de cascalho estava em 4,49:1; a camada foi clareada.
- **No screenshot**, a bola do rali passava por cima da foto da bola no saibro e parecia uma segunda bola. Agora bola e traço correm por trás dos blocos opacos.
- **Fato verificado antes de escrever:** o árbitro que desce da cadeira para conferir a marca. Confirmado, inclusive em 2026 (ver `pesquisa/fatos.md`).

## #17 · Les Légendes: o coração e o traço (2026-10-10)
- **O coração saiu "de giz", perfeito demais.** O Guga *riscou* o saibro com a raquete, então o traço virou um **sulco** (saibro escuro com um brilho fino na borda).
- **O traço do rali cruzava o coração e o placar.** O roteamento mudou de novo e ficou mais simples: o traço sempre corre pela **borda da página**, do lado da próxima marca (no celular, sempre a direita), e atravessa até a marca no respiro acima dela. Uma regra só, para qualquer tela.
- **Texto corrigido antes de publicar:** escrevi "semanas depois, era campeão", mas a final foi poucos dias depois das oitavas. Ficou "dias depois", que a fonte sustenta.
- **Teste quebrado por mudança anterior:** um teste do ticket 05 procurava `.mark__caption`, que desde o ticket 06 casa com 4 elementos. O seletor agora aponta para a marca do hero.

## #18 · Revisão final: recaptura e 8 correções (2026-10-10)
- A primeira evidência foi recusada (foto lazy vazia no mobile), porque eu só tinha validado o desktop. Ver `revisao-final.md`.
- O revisor pediu 8 correções. 6 ficaram resolvidas e 2 parciais por limitação de material. O lote causou 3 regressões novas (R1–R3).

## #19 · Não aceitei as camadas chapadas (2026-10-10)
- A IA tinha registrado "sem fotos com licença em mãos" como limitação. Eu aceitei só a limitação da raquete no mobile.
- A IA então pesquisou e encontrou fotos Pexels para as 4 camadas. A limitação era de esforço, não de material.

## #20 · Bugs de CSS criados pela IA, achados pelo documentador (2026-10-10)
- **O que aconteceu:** ao inserir blocos de CSS com `replace` em Python, todas as ocorrências foram trocadas, não só a primeira. Isso deixou a seta do CTA deslocada 4 px em repouso, criou um bloco duplicado e separou o `list-style` da lista das camadas.
- **Quem achou:** o documentador, ao ler o CSS para escrever o DESIGN.md. Os screenshots não mostravam o problema.
- **Correção:** os blocos foram limpos, o `--green` (nunca usado) e o `.cta--solid` (sem uso) foram removidos, e o halo dos rótulos das camadas virou uma etiqueta sólida (o detector acusou "dark glow").
- **Lição:** edição por substituição de texto precisa limitar a uma ocorrência e conferir o resultado.

## #21 · A bola volta para o meio (rodada 2, ticket 14) (2026-10-10)
- **Antes:** a bola corria pela borda (decisão da revisão final, para não cruzar o texto). Pedi que voltasse para o meio, natural e suave.
- **Agora:** o layout reserva espaço para a bola (faixas por seção + respiros) e a curva é monótona (não invade o texto).
- **O teste novo "o traço nunca atravessa um texto"** achou no celular o rótulo vertical da marca (mais largo do que parecia) e o título do fechamento. Os dois foram corrigidos.

## #22 · A bola da Histoire encostava no texto (2026-10-10)
- O primeiro arco do quique entre as datas (70 px no desktop, 36 px no celular) fazia a bola tocar o parágrafo e o texto das datas. Baixado para 30 / 18 px.

## #23 · Face-à-face: a rede riscava o texto e o celular ficou pequeno (2026-10-10)
- **Primeira versão:**
  - a linha central (a "rede") passava por cima de "FACE-À-FACE" e da frase;
  - "KUERTEN" saía cortado;
  - no celular, os dois ficavam minúsculos no rodapé, com o corpo terminando no ar.
- **Correção:**
  - fundo de saibro atrás do título e da frase (a rede passa por trás);
  - nomes menores;
  - no celular, jogadores a 60% da largura, sobrepostos na rede e erguidos;
  - borda de baixo das fotos dissolvida no saibro.
- **Testes ajustados com justificativa:** o teste "nenhum elemento passa da borda" acusava o nome e a foto do Nadal, que saem da tela de propósito mas são recortados pela seção. O teste agora ignora o que um ancestral com `overflow: hidden` já recorta.

## #24 · Palmarès: a bola voltou a descer reta (2026-10-10)
- **O que aconteceu:**
  - o espaço reservado da seção acompanha a grade dos 8 cards (mais de duas telas). Com só dois pontos (topo e base), a bola descia numa linha reta, justamente o que eu tinha recusado na Q13;
  - o 5º link quebrou a navegação em duas linhas a 1024 px;
  - no celular, os nomes quebravam em três linhas.
- **Quem achou:** a própria IA, nos screenshots. Os testes passavam, porque nenhum deles mede "reta".
- **Correção:**
  - espaços compridos ganham `data-sway`: a bola quica de um lado para o outro dentro da faixa (a ~28% da largura do centro), um quique a cada ~480 px, com marca e pó;
  - a navegação não quebra mais (`nowrap`). Abaixo de 1180 px sai o "Le Service" (o wordmark já leva ao saque); abaixo de 1000 px a navegação some, como no celular;
  - a foto do card no celular ficou menor.
- **Também:** um servidor `preview` antigo continuava rodando, e o Playwright o reaproveitou (`reuseExistingServer`). Os 7 testes novos falharam contra o build velho até o servidor ser reiniciado.

## #25 · Revisão final da rodada 2: a bola ainda passava perto da borda (2026-10-10)
- **O que o revisor achou:** no desktop, as faixas laterais deixavam a bola a 14–16% da borda: Les Légendes a 236 px, Palmarès a 201 px (com o balanço, até 120), Le Score a 229 px. A spec pedia algo entre 25 e 35% da largura, e era exatamente a minha queixa original.
- **Por que os testes não pegaram:** eles provam que o traço não cruza texto, mas nenhum mede a distância até a borda.
- **Correção:**
  - faixas mais largas em Les Légendes e Le Score;
  - em Les Légendes, o rótulo "MARCA 03" puxava o oval para a esquerda e saiu do fluxo;
  - o Palmarès mudou de 3 colunas para **2 colunas espelhadas em volta de um vão central**, e a bola desce **pelo meio**.
- **Isso muda a decisão Q17** ("grade de 3 colunas"). A IA priorizou o pedido 1 e a Q7 ("pelo meio", "não pelo lado da seção").
- **Fica para eu decidir:** no celular, a faixa da bola continua junto da borda (a ~30–60 px numa tela de 390 px).

## #26 · O Palmarès encolheu na primeira correção (2026-10-10)
- Ao abrir o vão central, a IA deixou os troféus com ~150 px e a foto revelada com ~200×220. O revisor apontou como regressão, justamente no momento troféu → campeão que ele tinha mandado preservar.
- **Correção:** vão mais estreito, célula da foto com ~288 px e troféus maiores (também no celular).
- **Também na revisão:**
  - a sombra do troféu (24 px de desfoque) era recortada pelo card e desenhava um retângulo escuro sobre o saibro; agora é curta;
  - no celular, a foto do Guga ficou grande demais e cortou o rosto dele na borda; foi ajustada para os dois rostos ficarem dentro da tela.

## #27 · Aceitei a faixa da bola no celular como limitação (2026-10-10)
- **O que foi:** na revisão final da rodada 2, o revisor manteve aberto um item: no celular, a bola desce a ~30–60 px da borda. A IA ofereceu duas saídas: (a) aceitar por escrito ou (b) uma terceira rodada, com o texto abrindo espaço para a bola no meio da tela.
- **Minha escolha:** (a). A queixa original era a bola no canto do **desktop**, que foi resolvida.
- **Por quê:** numa tela de 390 px não há largura para um vão central, e o traço nunca cruza texto.

## #28 · Histoire: o reduced-motion ficou como antes (2026-10-10)
- A spec pedia, para reduced-motion, o estado final com a bola parada na última data.
- **O que a IA fez:** sem movimento, a Histoire não prende e as datas ficam em várias linhas, então o caminho "entrar pela 1ª e sair pela última" não existe. Nesse modo, o traço segue passando por trás da seção, como na rodada 2, e as datas já aparecem como marcas feitas.
- **Por quê:** é um estado estático que continua legível e sem duas bolas. Inventar uma bola parada no meio de uma grade de datas exigiria um caminho só para esse modo.
- **Fica para eu revisar** se quiser a bola visível ali.

## #29 · Não gostei da Histoire nova e pedi para voltar ao layout antigo (2026-10-10)
- **O que a IA tinha feito no ticket 23:** levou 1891 para o meio da tela, para o traço descer direto até a data, e os pulos não deixavam rastro.
- **Minha reação:** "gostava de como era antes". Eu só queria que a bola chegasse e saísse da linha do tempo, com o rastro ficando para trás junto com o scroll lateral.
- **Correção:**
  - 1891 voltou para a esquerda;
  - o traço da chegada e um arco a cada pulo agora moram dentro da linha do tempo e correm com ela;
  - a linha ganhou um trecho a mais depois de 2020, para a bola sair.
- **Lição:** a IA mudou o layout para facilitar a geometria do traço, sem perguntar. Uma mudança de layout que não foi pedida precisa ser perguntada antes.
