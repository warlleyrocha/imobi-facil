# Módulo Locação (administração de aluguéis)

Módulo novo do ImobiFácil para quem administra carteira de locação — em vez de
só captar imóvel, o corretor acompanha contrato, mensalidade paga e repasse
devido ao proprietário.

Roda 100% no dispositivo (AsyncStorage), sem backend: os dados do seed são os
20 contratos reais do relatório mensal de administração.

## Como abrir

1. `npm install`
2. `npm run web` (ou `npm run android` / `npm run ios`)
3. Entrar como corretor → card **Locação** na home → `/corretor/locacao`

## Telas

- `locacao/index.tsx` — painel do mês: previsto, recebido, em aberto, repasse a
  pagar, lista de cobranças em aberto e seletor JAN–DEZ.
- `locacao/contratos.tsx` — carteira de contratos com busca por inquilino,
  imóvel ou código do contrato.
- `locacao/contrato/[id].tsx` — ficha do contrato (proprietário, inquilino,
  valores, vigência, PIX) e grade das 12 mensalidades; toque no mês para marcar
  pago/pendente.
- `locacao/cadastros.tsx` — abas de proprietários, inquilinos e imóveis.

## Dados

- `lib/locacao/types.ts` — modelo (Proprietario, Inquilino, Imovel, Contrato,
  Pagamento).
- `lib/locacao/seed.ts` — 17 proprietários, 20 inquilinos, 20 imóveis,
  20 contratos e 240 mensalidades, gerados a partir do relatório em PDF.
- `lib/locacao/store.tsx` — contexto com persistência local, `alternarPagamento`
  e `resumoDoMes`.

## Regras de repasse

O repasse por contrato já vem calculado do relatório. Ao marcar um mês como pago,
o painel move o valor do repasse de "a pagar" para "já repassado" daquele mês.

## Próximos passos sugeridos

- Cadastro/edição de contrato pela interface (hoje é somente leitura + status).
- Exportar recibo em PDF para o inquilino.
- Sincronizar com o backend do ImobiFácil quando houver endpoint de locação.
