# 14: Rali 2.0, o trajeto em S com espaços reservados

**What to build:** a bola volta para dentro da página. Cada seção ganha um vazio reservado do lado oposto ao texto (~65–75% da largura, nunca na borda), e entre as seções entram respiros de saibro. O traço vira uma curva suave em S que passa pelos vazios e cruza a página nos respiros; a bola segue o scroll com inércia leve. Ela passa por trás das camadas da quadra, e os placares (Légendes, Le Score) abrem um vão central para ela. Inclui o módulo puro **Trajeto do Rali**, que substitui o roteamento pela borda.

**Blocked by:** None (can start immediately)

**Status:** done

- [x] Vitest (TDD): o trajeto passa pelos pontos de passagem em ordem, é monótono em y, não entra em caixas proibidas e é estável
- [x] Layout: vazios reservados por seção + respiros; nenhum texto cruzado pelo traço (screenshots 1440/390)
- [x] Inércia: a ponta persegue o alvo do scroll de forma suave, sem saltos ao rolar aos trancos
- [x] Camadas: a bola passa por trás; placares com vão central
- [x] Reduced-motion: o traço completo e estático
- [x] As marcas das seções continuam afundando quando a bola chega (os testes existentes continuam verdes)
- [x] Fluidez com a CPU 4× mais lenta mantida (60 fps no mobile)
- [x] Log da etapa em `processo/prompts/`

## Comments

- 2026-10-10 (Claude): concluído. Módulo `src/rally-path.js` (TDD), faixas reservadas + respiros, inércia, teste E2E de que o traço não cruza texto. A bola na Histoire fica para o ticket 16.
