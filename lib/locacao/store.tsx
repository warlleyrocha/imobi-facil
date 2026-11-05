import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
  contratosSeed,
  imoveisSeed,
  inquilinosSeed,
  pagamentosSeed,
  proprietariosSeed,
} from './seed';
import type {
  Contrato,
  Imovel,
  Inquilino,
  MesSigla,
  Pagamento,
  Proprietario,
  ResumoMes,
} from './types';

const STORAGE_KEY = '@imobi-facil/locacao/v1';

export const MESES: MesSigla[] = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
];

export const moeda = (valor: number) =>
  `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const mesAtual = (): MesSigla => MESES[new Date().getMonth()];

interface DadosLocacao {
  proprietarios: Proprietario[];
  inquilinos: Inquilino[];
  imoveis: Imovel[];
  contratos: Contrato[];
  pagamentos: Pagamento[];
}

interface LocacaoContexto extends DadosLocacao {
  carregando: boolean;
  alternarPagamento: (contratoId: string, mes: MesSigla) => void;
  atualizarContrato: (contrato: Contrato) => void;
  resumoDoMes: (mes: MesSigla) => ResumoMes;
  contratoPorId: (id: string) => Contrato | undefined;
  pagamentosDoContrato: (id: string) => Pagamento[];
  nomeProprietario: (id: string | null) => string;
  nomeInquilino: (id: string | null) => string;
  descricaoImovel: (id: string | null) => string;
}

const dadosIniciais: DadosLocacao = {
  proprietarios: proprietariosSeed,
  inquilinos: inquilinosSeed,
  imoveis: imoveisSeed,
  contratos: contratosSeed,
  pagamentos: pagamentosSeed,
};

const LocacaoContext = createContext<LocacaoContexto | null>(null);

export function LocacaoProvider({ children }: { children: React.ReactNode }) {
  const [dados, setDados] = useState<DadosLocacao>(dadosIniciais);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;
    (async () => {
      try {
        const salvo = await AsyncStorage.getItem(STORAGE_KEY);
        if (ativo && salvo) {
          const parseado = JSON.parse(salvo) as DadosLocacao;
          if (parseado?.contratos?.length) setDados(parseado);
        }
      } catch {
        // seed local continua valendo se o storage falhar
      } finally {
        if (ativo) setCarregando(false);
      }
    })();
    return () => {
      ativo = false;
    };
  }, []);

  const persistir = useCallback((proximo: DadosLocacao) => {
    setDados(proximo);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(proximo)).catch(() => undefined);
  }, []);

  const alternarPagamento = useCallback(
    (contratoId: string, mes: MesSigla) => {
      const pagamentos = dados.pagamentos.map((pagamento) => {
        if (pagamento.contratoId !== contratoId || pagamento.mes !== mes) return pagamento;
        const pago = pagamento.status === 'Pago';
        return {
          ...pagamento,
          status: (pago ? 'Pendente' : 'Pago') as Pagamento['status'],
          pagoEm: pago ? null : new Date().toISOString().slice(0, 10),
        };
      });
      persistir({ ...dados, pagamentos });
    },
    [dados, persistir]
  );

  const atualizarContrato = useCallback(
    (contrato: Contrato) => {
      const contratos = dados.contratos.map((item) => (item.id === contrato.id ? contrato : item));
      persistir({ ...dados, contratos });
    },
    [dados, persistir]
  );

  const resumoDoMes = useCallback(
    (mes: MesSigla): ResumoMes => {
      const doMes = dados.pagamentos.filter((pagamento) => pagamento.mes === mes);
      const pagos = doMes.filter((pagamento) => pagamento.status === 'Pago');
      const previsto = doMes.reduce((total, pagamento) => total + pagamento.valor, 0);
      const recebido = pagos.reduce((total, pagamento) => total + pagamento.valor, 0);
      return {
        previsto,
        recebido,
        pendente: previsto - recebido,
        repassePago: pagos.reduce((total, pagamento) => total + pagamento.repasse, 0),
        repassePendente: doMes
          .filter((pagamento) => pagamento.status !== 'Pago')
          .reduce((total, pagamento) => total + pagamento.repasse, 0),
        contratosAtivos: dados.contratos.filter((contrato) => contrato.status !== 'Encerrado')
          .length,
        inadimplentes: doMes.filter((pagamento) => pagamento.status !== 'Pago').length,
      };
    },
    [dados]
  );

  const valor = useMemo<LocacaoContexto>(
    () => ({
      ...dados,
      carregando,
      alternarPagamento,
      atualizarContrato,
      resumoDoMes,
      contratoPorId: (id) => dados.contratos.find((contrato) => contrato.id === id),
      pagamentosDoContrato: (id) =>
        dados.pagamentos.filter((pagamento) => pagamento.contratoId === id),
      nomeProprietario: (id) => dados.proprietarios.find((item) => item.id === id)?.nome ?? '—',
      nomeInquilino: (id) => dados.inquilinos.find((item) => item.id === id)?.nome ?? '—',
      descricaoImovel: (id) => dados.imoveis.find((item) => item.id === id)?.titulo ?? '—',
    }),
    [dados, carregando, alternarPagamento, atualizarContrato, resumoDoMes]
  );

  return <LocacaoContext.Provider value={valor}>{children}</LocacaoContext.Provider>;
}

export function useLocacao() {
  const contexto = useContext(LocacaoContext);
  if (!contexto) {
    throw new Error('useLocacao precisa estar dentro de <LocacaoProvider>');
  }
  return contexto;
}
