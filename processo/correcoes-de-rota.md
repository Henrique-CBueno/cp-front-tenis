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
