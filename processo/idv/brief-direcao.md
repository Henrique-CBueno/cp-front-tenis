# Brief de design: direção "La Trace"

**Origem:** impeccable `shape`, 2026-10-10. Sorteio `concept-seed` (seed `25cf5024`). Escolhida na página de decisão:
**IMPECCABLE'S PICK, "La Trace"**, e não a direção sorteada ("Ordre de Jeu"). Todas as opções e esboços estão em `rodada-direcao/`.
**Status:** ✅ confirmado por mim em 2026-10-10 ("confirmo"), incluindo as ideias trazidas das opções descartadas.

## 1. Público e trabalho
O fã brasileiro de tênis, no notebook, revivendo Roland Garros. Modo **Persuade**: ele precisa *sentir* o torneio e sair com vontade de estar lá.

## 2. Resultado e prova
- **Ação principal:** "Garanta seu ingresso", que leva ao site oficial.
- **Prova:** o gesto real (o saque em quadros), o saibro real (fotos com licença) e fatos verificados. A prova que só esta página tem é a memória brasileira: o **coração que o Guga desenhou no saibro em 2001**, uma "marca" literal na quadra. *(Verificar a fonte antes de publicar.)*

## 3. Direção escolhida
- **Tese:** a página é a quadra. As linhas brancas formam o grid, e cada seção é uma **marca** que a bola deixa no saibro, como as que o árbitro desce da cadeira para conferir.
- **Mundo:** pó de tijolo com grão em tela cheia (o saibro é o fundo da página, não um detalhe), fitas de linha brancas como estrutura e marcas ovais da bola como sistema de navegação e numeração ("Marca 01…").
- **Paleta (do esboço):** saibro `#b9532c`, linha/creme `#f6efe2`, saibro escuro `#8f3a18` e verde Roland Garros `#1f5c3a` (raro, só como acento). A estratégia de cor é **Drenched**: a superfície É a cor.
- **Momento focal:** o jogador saca conduzido pelo scroll. No impacto, a bola sai do quadro e a **primeira marca** aparece ao lado da linha, abrindo a página.
- **Ideias que vêm das opções descartadas** (para eu aprovar):
  - *da Película 16mm:* o grão do saibro reage ao quadro do saque, em vez de ser um filtro genérico por cima;
  - *do Circuito de neon:* a trajetória da bola é **um traço contínuo** que liga as marcas de seção em seção;
  - *do Minihompy e da Tabela em lâminas:* placares, anos e números aparecem como marcas pequenas e honestas, num único tamanho de tipo, com hierarquia só por peso e caixa.

## 4. Sequência (cada seção = uma marca)
1. **Le Service** (primeira dobra): saibro, linhas, o jogador saca e aparece a Marca 01. O CTA de ingresso já fica visível e discreto.
2. **Terre Battue:** close macro (a marca vista de perto). As camadas do saibro em corte, com parallax.
3. **Histoire** *(extra)*: a linha de base vira a linha do tempo, com as datas como marcas ao longo dela.
4. **Les Légendes:** Nadal, Evert, Borg… e **Guga**, com o coração desenhado no saibro como clímax emocional.
5. **Números** *(extra)*: placares como marcas.
6. **CTA final, "Jeu, Set et Match":** a última marca é o ingresso.

## 5. Escopo e anti-objetivos
- MVP: 1, 2, 4 e 6. Extras: 3 e 5. Página única, PT-BR com títulos em francês.
- **Não pode:** virar "site de esporte genérico" (foto grande + cards), usar neon ou modo escuro "hype", usar o logo oficial ou imitar o site oficial.
- **Tipografia:** decidida no build. Nada de Georgia nem das fontes padrão de IA. A fonte tem que ter ponto de vista.

## 6. Interação e layout
- O scroll conduz o saque (o hero fica fixo/pinned). Depois, o traço da bola guia o olho entre as marcas.
- No mobile: menos quadros, layout empilhado, linhas da quadra em uma coluna.
- Com `prefers-reduced-motion`: um quadro estático do impacto e as marcas já presentes.

## 7. Em aberto
- Vídeo do saque (eu assisto e escolho) → define a composição exata do hero.
- Fontes (no build).
- O `DESIGN.md` é escrito **no fim**, a partir da página construída (regra da impeccable).
