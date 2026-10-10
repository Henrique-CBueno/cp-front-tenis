# 010 · O rali: o traço contínuo que liga as marcas

**Status:** decidida pela IA no ticket 06 (pendente de revisão minha) · **Data:** 2026-10-10

## Mecânica
- Depois do saque, um **único traço SVG** desce a página da Marca 01 até a última marca. A ponta do traço (a bola) fica **sempre na altura do meio da tela**: uma tabela altura → comprimento do traço é calculada a cada medição, e o scroll só consulta essa tabela.
- Cada seção abre com a sua **Marca** (02 o saibro, 03 as lendas, 04 a sua). Ela "afunda" no saibro quando a ponta do traço chega até ela.
- Com reduced-motion, o traço já aparece completo e todas as marcas visíveis.

## O traço não pode passar por cima do texto
- **1ª versão:** curvas S simples entre as marcas. No screenshot, o traço cortava títulos e parágrafos (pior no mobile) e começava solto, sem sair da Marca 01.
- **Desktop:** o texto alterna de lado, então o traço sai da marca **na horizontal** (ao lado do oval não há texto), desce na coluna da próxima marca (que está vazia) e chega a ela por cima.
- **Celular:** o texto ocupa a esquerda, então o traço corre pela **margem direita** e atravessa para cada marca no respiro acima dela. As marcas alternam de lado também no celular. O traço nasce na borda do hero, porque o CTA do hero fica embaixo da Marca 01.

## Navegação
Uma navegação mínima com os nomes das seções (Le Service, Terre Battue, Les Légendes, Jeu, Set et Match). Ela é escondida no celular, onde ficam o wordmark e o CTA. A rolagem por âncora usa o Lenis (`anchors: true`). Testada com clique e com teclado.
