// Tipos compartilhados entre cliente e atendente para os eventos Socket.IO
// do fluxo de atendimento humano. Devem espelhar os payloads emitidos pelo
// backend em backend/src/sockets/atendimentoSocket.js.

import type { Agendamento } from './IAgendamento';

export type EncerradoPor = 'cliente' | 'atendente' | 'desconexao';
export type AutorMensagem = 'cliente' | 'atendente';

export interface ItemFila {
  userId: string;
  motivo: string | null;
  nome: string | null;
  criadoEm: number;
}

export interface MensagemSuporte {
  autor: AutorMensagem;
  texto: string;
  ts: number;
}

export interface AtendenteConectadoPayload {
  roomId: string;
  atendenteNome: string;
  motivo: string | null;
  userId: string;
}

export interface AtendenteAguardandoPayload {
  posicao: number;
}

export interface SupportEncerradoPayload {
  encerradoPor: EncerradoPor;
}

export interface SupportDigitandoPayload {
  autor: AutorMensagem;
  digitando: boolean;
}

// Eventos emitidos PELO cliente -> servidor
export interface ClienteEmitEvents {
  'atendente:solicitar': (
    payload: { userId: string; motivo: string | null; nome?: string | null },
    ack?: (resp: { ok: boolean; erro?: string }) => void,
  ) => void;
  'support:msg': (payload: { roomId: string; texto: string }) => void;
  'support:digitando': (payload: { roomId: string; digitando: boolean }) => void;
  'support:encerrar': (payload: { roomId: string }) => void;
}

// Eventos emitidos PELO servidor -> cliente
export interface ClienteListenEvents {
  'atendente:aguardando': (payload: AtendenteAguardandoPayload) => void;
  'atendente:conectado': (payload: AtendenteConectadoPayload) => void;
  'support:msg': (payload: MensagemSuporte) => void;
  'support:digitando': (payload: SupportDigitandoPayload) => void;
  'support:encerrado': (payload: SupportEncerradoPayload) => void;
}

// Eventos emitidos PELO atendente -> servidor
export interface AdminEmitEvents {
  'atendente:aceitar': (
    payload: { userId: string },
    ack?: (resp: { ok: boolean; erro?: string; roomId?: string }) => void,
  ) => void;
  'support:msg': (payload: { roomId: string; texto: string }) => void;
  'support:digitando': (payload: { roomId: string; digitando: boolean }) => void;
  'support:encerrar': (payload: { roomId: string }) => void;
}

// Eventos emitidos PELO servidor -> atendente
export interface AdminListenEvents {
  'admin:fila:atual': (payload: ItemFila[]) => void;
  'admin:fila:update': (payload: ItemFila[]) => void;
  'admin:agendamentos:update': (payload: Agendamento[]) => void;
  'atendente:conectado': (payload: AtendenteConectadoPayload) => void;
  'support:msg': (payload: MensagemSuporte) => void;
  'support:digitando': (payload: SupportDigitandoPayload) => void;
  'support:encerrado': (payload: SupportEncerradoPayload) => void;
}
