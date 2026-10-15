# 54: as cordas da raquete para fora do aro

## Prompt

> exelente! no svg da raquete, a corda esta para fora do aro da raquete

## O que a IA fez

- **Causa:** o `clip-path` em CSS do grupo das cordas media a elipse a partir da caixa das próprias cordas, e não do desenho, e ficava deslocado (correção de rota #43).
- **Correção:** cada corda agora começa e termina no aro, com as pontas calculadas em `src/racket.js`. O `clip-path` saiu do `style.css`.
- Print da raquete ampliado 4× conferido; os testes da raquete e do Le Mur continuam verdes.
