# 14: Rali 2.0, o trajeto em S com espaços reservados

**What to build:** a bola volta para dentro da página. Cada seção ganha um vazio reservado do lado oposto ao texto (~65–75% da largura, nunca na borda), e entre as seções entram respiros de saibro. O traço vira uma curva suave em S que passa pelos vazios e cruza a página nos respiros; a bola segue o scroll com inércia leve. Ela passa por trás das camadas da quadra, e os placares (Légendes, Le Score) abrem um vão central para ela. Inclui o módulo puro **Trajeto do Rali**, que substitui o roteamento pela borda.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Vitest (TDD): o trajeto passa pelos pontos de passagem em ordem, é monótono em y, não entra em caixas proibidas e é estável
- [ ] Layout: vazios reservados por seção + respiros; nenhum texto cruzado pelo traço (screenshots 1440/390)
- [ ] Inércia: a ponta persegue o alvo do scroll de forma suave, sem saltos ao rolar aos trancos
- [ ] Camadas: a bola passa por trás; placares com vão central
- [ ] Reduced-motion: o traço completo e estático
- [ ] As marcas das seções continuam afundando quando a bola chega (os testes existentes continuam verdes)
- [ ] Fluidez com a CPU 4× mais lenta mantida (60 fps no mobile)
- [ ] Log da etapa em `processo/prompts/`
