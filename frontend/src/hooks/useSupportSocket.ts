import { useCallback, useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';
import type {
  AtendenteConectadoPayload,
  ClienteEmitEvents,
  ClienteListenEvents,
  MensagemSuporte,
  SupportEncerradoPayload,
} from '@/interfaces/ISupportEvents';

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3000';
const TYPING_DEBOUNCE_MS = 2000;

export type SupportStatus = 'idle' | 'aguardando' | 'ativo' | 'encerrado';

type ClienteSocket = Socket<ClienteListenEvents, ClienteEmitEvents>;

interface UseSupportSocketResult {
  status: SupportStatus;
  mensagens: MensagemSuporte[];
  parceiroDigitando: boolean;
  atendenteNome: string | null;
  encerradoPor: SupportEncerradoPayload['encerradoPor'] | null;
  solicitarAtendente: (params: { userId: string; motivo: string | null; nome?: string | null }) => void;
  enviarMensagem: (texto: string) => void;
  notificarDigitando: () => void;
  encerrar: () => void;
  resetar: () => void;
}

export function useSupportSocket(): UseSupportSocketResult {
  const socketRef = useRef<ClienteSocket | null>(null);
  const roomIdRef = useRef<string | null>(null);
  const digitandoTrueEnviadoRef = useRef(false);
  const digitandoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [status, setStatus] = useState<SupportStatus>('idle');
  const [mensagens, setMensagens] = useState<MensagemSuporte[]>([]);
  const [parceiroDigitando, setParceiroDigitando] = useState(false);
  const [atendenteNome, setAtendenteNome] = useState<string | null>(null);
  const [encerradoPor, setEncerradoPor] = useState<SupportEncerradoPayload['encerradoPor'] | null>(null);

  const limparDigitandoTimer = useCallback(() => {
    if (digitandoTimerRef.current !== null) {
      clearTimeout(digitandoTimerRef.current);
      digitandoTimerRef.current = null;
    }
  }, []);

  const desconectar = useCallback(() => {
    limparDigitandoTimer();
    digitandoTrueEnviadoRef.current = false;
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    roomIdRef.current = null;
  }, [limparDigitandoTimer]);

  useEffect(() => {
    return () => {
      desconectar();
    };
  }, [desconectar]);

  const conectar = useCallback((): ClienteSocket => {
    if (socketRef.current) return socketRef.current;

    const socket: ClienteSocket = io(API_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    socket.on('atendente:aguardando', () => {
      setStatus('aguardando');
    });

    socket.on('atendente:conectado', (payload: AtendenteConectadoPayload) => {
      roomIdRef.current = payload.roomId;
      setAtendenteNome(payload.atendenteNome);
      setStatus('ativo');
    });

    socket.on('support:msg', (msg: MensagemSuporte) => {
      setMensagens((prev) => [...prev, msg]);
    });

    socket.on('support:digitando', ({ digitando }) => {
      setParceiroDigitando(digitando);
    });

    socket.on('support:encerrado', ({ encerradoPor: por }) => {
      setEncerradoPor(por);
      setStatus('encerrado');
      setParceiroDigitando(false);
      limparDigitandoTimer();
      digitandoTrueEnviadoRef.current = false;
    });

    socketRef.current = socket;
    return socket;
  }, [limparDigitandoTimer]);

  const solicitarAtendente = useCallback(
    ({ userId, motivo, nome }: { userId: string; motivo: string | null; nome?: string | null }) => {
      const socket = conectar();
      setMensagens([]);
      setEncerradoPor(null);
      setAtendenteNome(null);
      setStatus('aguardando');
      socket.emit('atendente:solicitar', { userId, motivo, nome });
    },
    [conectar],
  );

  const enviarMensagem = useCallback((texto: string) => {
    const socket = socketRef.current;
    const roomId = roomIdRef.current;
    if (!socket || !roomId || !texto.trim()) return;

    socket.emit('support:msg', { roomId, texto });

    if (digitandoTrueEnviadoRef.current) {
      socket.emit('support:digitando', { roomId, digitando: false });
      digitandoTrueEnviadoRef.current = false;
    }
    limparDigitandoTimer();
  }, [limparDigitandoTimer]);

  const notificarDigitando = useCallback(() => {
    const socket = socketRef.current;
    const roomId = roomIdRef.current;
    if (!socket || !roomId) return;

    if (!digitandoTrueEnviadoRef.current) {
      socket.emit('support:digitando', { roomId, digitando: true });
      digitandoTrueEnviadoRef.current = true;
    }

    limparDigitandoTimer();
    digitandoTimerRef.current = setTimeout(() => {
      if (socketRef.current && roomIdRef.current) {
        socketRef.current.emit('support:digitando', {
          roomId: roomIdRef.current,
          digitando: false,
        });
      }
      digitandoTrueEnviadoRef.current = false;
      digitandoTimerRef.current = null;
    }, TYPING_DEBOUNCE_MS);
  }, [limparDigitandoTimer]);

  const encerrar = useCallback(() => {
    const socket = socketRef.current;
    const roomId = roomIdRef.current;
    if (!socket || !roomId) return;
    socket.emit('support:encerrar', { roomId });
  }, []);

  const resetar = useCallback(() => {
    desconectar();
    setStatus('idle');
    setMensagens([]);
    setParceiroDigitando(false);
    setAtendenteNome(null);
    setEncerradoPor(null);
  }, [desconectar]);

  return {
    status,
    mensagens,
    parceiroDigitando,
    atendenteNome,
    encerradoPor,
    solicitarAtendente,
    enviarMensagem,
    notificarDigitando,
    encerrar,
    resetar,
  };
}
