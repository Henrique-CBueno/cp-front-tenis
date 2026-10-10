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
