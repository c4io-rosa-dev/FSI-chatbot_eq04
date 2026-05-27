export type StatusAgendamento = 'ativo' | 'cancelado';
export type CanceladoPor = 'cliente' | 'atendente';

export interface ServicoAgendado {
  nome: string;
  valor: number;
}

export interface Agendamento {
  id: number;
  telefone: string;
  nome: string;
  servicos: ServicoAgendado[];
  valorTotal: number;
  status: StatusAgendamento;
  criadoEm: string;
  canceladoEm: string | null;
  canceladoPor: CanceladoPor | null;
  motivoCancelamento: string | null;
}
