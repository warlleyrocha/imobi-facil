export type MesSigla =
  | 'JAN'
  | 'FEV'
  | 'MAR'
  | 'ABR'
  | 'MAI'
  | 'JUN'
  | 'JUL'
  | 'AGO'
  | 'SET'
  | 'OUT'
  | 'NOV'
  | 'DEZ';

export type StatusPagamento = 'Pago' | 'Pendente' | 'Atrasado' | 'Descontar de repasse';

export interface Proprietario {
  id: string;
  nome: string;
  cpf: string | null;
  telefone: string | null;
  email: string | null;
  banco: string | null;
  pix: string | null;
  titularPix: string | null;
}

export interface Inquilino {
  id: string;
  nome: string;
  cpf: string | null;
  telefone: string | null;
  email: string | null;
}

export interface Imovel {
  id: string;
  titulo: string;
  proprietarioId: string | null;
  endereco: string | null;
  cidade: string | null;
  uf: string | null;
  tipo: string | null;
  status: string | null;
  energia: string | null;
  agua: string | null;
  iptu: string | null;
}

export interface Contrato {
  id: string;
  proprietarioId: string | null;
  imovelId: string | null;
  inquilinoId: string | null;
  valor: number;
  condominio: number;
  iptu: number;
  compesa: number;
  taxaAdm: number;
  repasse: number;
  vencimento: number;
  inicio: string;
  fim: string;
  status: string;
}

export interface Pagamento {
  contratoId: string;
  mes: MesSigla;
  status: StatusPagamento;
  valor: number;
  repasse: number;
  pagoEm: string | null;
}

export interface ResumoMes {
  previsto: number;
  recebido: number;
  pendente: number;
  repassePago: number;
  repassePendente: number;
  contratosAtivos: number;
  inadimplentes: number;
}
