# Prompt 38 · identidade do torneio, rodapé, favicon (ticket 26)

**Data:** 2026-10-10 · **Ferramenta:** Claude Code (Claude Opus 5.5), em plan mode antes de implementar

## O que eu pedi (literal)
> boa! agora quero o seguinte, o footer esta muito feio, muito grande e queria o site com identidade e logos do torneio roland garros, favicon, etc

## Perguntas da IA e minhas respostas
- **Logo:**
  - a IA lembrou que na rodada 1 eu tinha decidido **não** usar o logo oficial;
  - mostrou que ele é marca registrada da FFT, sem licença livre;
  - recomendou uma identidade própria inspirada no torneio.

  **Escolhi usar o logo oficial** (decisão 016, correção de rota #35).
- **Rodapé:** compacto, com os créditos numa **página própria** (recomendação da IA).
- **Extras:** favicon e ícone de celular, o logo no topo e o cartão de compartilhamento.

## O que a IA fez
- **O logo oficial, baixado do próprio site de Roland-Garros, em duas versões:**
  - em giz (uma cor), sobre o saibro, no topo e no rodapé;
  - em cor (anel verde, centro laranja), no favicon, nos ícones e no cartão.
- **Topo:** o logo, "la trace" e o rótulo "tributo de fã". No celular, o rótulo sai e o wordmark e o ingresso encolhem (antes de encolherem, o ingresso saía da tela).
- **Rodapé compacto:**
  - desktop: a marca, as seções, o ingresso e o aviso numa linha ("Tributo de fã · Projeto acadêmico (FIAP) · Sem vínculo com a FFT nem com Roland-Garros, cujo logo é marca registrada da FFT") com o link "Créditos e fontes";
  - altura: 225 px no desktop (25% da tela) e 325 px no celular (39%; antes do ajuste, 52%);
  - no celular, o ingresso do rodapé sai, porque ele já está sempre no topo.
- **Página `creditos.html`:** todos os créditos e as fontes que ficavam no rodapé, mais o crédito do logo, numa coluna de leitura. Entrou no build como segunda página.
- **Favicon e ícones** (SVG, 32, 180, 192 e 512), o `site.webmanifest` e o **cartão de compartilhamento** (`og.jpg`, 1200×630, o hero), gerados por `tools/identidade.mjs`, com procedência embutida.
- **Correções no caminho:**
  - a navegação do rodapé tinha um nome parecido com a do topo e quebrou 2 testes antigos. Ganhou um nome próprio;
  - na página de créditos, o creme sujo sobre o saibro claro dava 3,9:1. Agora o texto é em giz.
- **Testes:** 4 E2E novos:
  - o rodapé com no máximo 40% da tela;
  - a página de créditos com todos os créditos;
  - o logo com `alt` e o aviso de tributo;
  - favicon, ícone, manifest e cartão respondendo 200, com as metas og.

  Total: 62 E2E e 26 unitários.
- **Verificação:** detector com os mesmos 6 avisos de antes; procedência em 161 imagens, 0 pendentes. DESIGN.md atualizado.
- **Pendente:**
  - a URL de `og:image` precisa ser absoluta depois do deploy;
  - o `.impeccable/design.json` não foi regerado;
  - a recomendação de **não publicar com o logo oficial** continua de pé.
- Evidências em `processo/evidencias/26/`.
