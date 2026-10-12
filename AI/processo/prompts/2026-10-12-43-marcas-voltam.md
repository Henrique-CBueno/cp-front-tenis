# Prompt 43 · as marcas voltam com a bola

**Data:** 2026-10-12 · **Ferramenta:** Claude Code (Claude Opus 5.5)

## O que eu pedi
> boa! agora quero que as marcas voltem juto a bola e nao fiquem "na quadra"

## O que a IA fez
- **Interpretação:** rolando para cima, cada marca se desfaz quando a bola volta para antes dela, e renasce na descida. Isso vale para todas as marcas da bola. Reverte a regra "uma vez feita, fica" (decisão 018, correção #38).
- **Código:**
  - `erase()` em `src/impact.js`, o inverso do `stamp()`;
  - hero: a Marca 01 e o "esticão" do título;
  - rali: as marcas dos capítulos com as legendas, e as dos quiques;
  - Histoire e Sous la Terre: as datas e as marcas do tijolo, com o novo `before()` das docas.
- **Verificado no navegador**, rolando como uma pessoa até o Palmarès e de volta: as 8 datas, as 2 marcas do Sous la Terre e as 8 dos quiques nascem na descida e se desfazem todas na subida.
- **Testes:**
  - 1 E2E reescrito e 1 novo (a marca se desfaz quando a bola volta para 30 px acima do contato);
  - 65 de 66 verdes; a falha é a instabilidade da raquete, que já existia no `main`;
  - DESIGN.md atualizado.

## Minha avaliação
<!-- Preencher -->
