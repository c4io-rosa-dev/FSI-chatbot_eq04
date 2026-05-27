import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useSupportSocket } from "@/hooks/useSupportSocket";
import type { MensagemSuporte } from "@/interfaces/ISupportEvents";
import { mascararTelefone, normalizarTelefone } from "@/utils/telefone";

const ETAPAS_TELEFONE = new Set([
  "pedir.telefone",
  "fluxo.consultar.telefone",
  "fluxo.cancelar.telefone",
]);

type TipoMensagem = "usuario" | "bot" | "atendente" | "sistema";

interface Mensagem {
  id: string;
  tipo: TipoMensagem;
  conteudo: string;
  timestamp: number;
}

const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:3000";

function gerarId(prefix = "msg") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

const MOTIVO_LABEL: Record<string, string> = {
  "1": "Dúvidas",
  "2": "Problemas com agendamento",
  "3": "Reclamação",
  "4": "Outro",
};

export default function Chat() {
  const [texto, setTexto] = useState("");
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [carregando, setCarregando] = useState(false);
  const [etapa, setEtapa] = useState<string>("inicio");
  const motivoEscolhidoRef = useRef<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    status: supportStatus,
    mensagens: supportMensagens,
    parceiroDigitando: supportParceiroDigitando,
    atendenteNome: supportAtendenteNome,
    encerradoPor: supportEncerradoPor,
    solicitarAtendente,
    enviarMensagem: enviarMensagemSocket,
    notificarDigitando,
    encerrar: encerrarSocket,
  } = useSupportSocket();

  const supportMensagensRenderizadasRef = useRef(0);
  const statusAnteriorRef = useRef<typeof supportStatus>("idle");
  const solicitacaoAtendenteIniciadaRef = useRef(false);

  // -- Helpers ----------------------------------------------------------------

  const adicionarMensagemSistema = useCallback((conteudo: string) => {
    setMensagens((prev) => [
      ...prev,
      {
        id: gerarId("sys"),
        tipo: "sistema",
        conteudo,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const adicionarMensagemUsuario = useCallback((conteudo: string) => {
    setMensagens((prev) => [
      ...prev,
      {
        id: gerarId("user"),
        tipo: "usuario",
        conteudo,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const enviarViaHttp = useCallback(
    async (mensagem: string) => {
      setCarregando(true);
      try {
        const response = await fetch(`${API_URL}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, message: mensagem }),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data: { response: string; etapa?: string } = await response.json();

        setMensagens((prev) => [
          ...prev,
          {
            id: gerarId("bot"),
            tipo: "bot",
            conteudo: data.response,
            timestamp: Date.now(),
          },
        ]);
        if (data.etapa) setEtapa(data.etapa);
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        setMensagens((prev) => [
          ...prev,
          {
            id: gerarId("err"),
            tipo: "bot",
            conteudo:
              "Desculpe, houve um erro ao processar sua mensagem. Tente novamente.",
            timestamp: Date.now(),
          },
        ]);
      } finally {
        setCarregando(false);
      }
    },
    [userId],
  );

  const enviarMensagem = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const valor = texto.trim();
      if (!valor || !userId) return;

      setTexto("");

      // Modo socket: durante o atendimento ativo o cliente fala com o atendente
      if (supportStatus === "ativo") {
        enviarMensagemSocket(valor);
        return;
      }

      // Ao escolher o motivo (etapa "fluxo.atendente"), guarda a label
      if (etapa === "fluxo.atendente" && MOTIVO_LABEL[valor]) {
        motivoEscolhidoRef.current = MOTIVO_LABEL[valor];
      }

      const valorEnviar = ETAPAS_TELEFONE.has(etapa) ? normalizarTelefone(valor) : valor;

      adicionarMensagemUsuario(valor);
      await enviarViaHttp(valorEnviar);
      inputRef.current?.focus();
    },
    [
      texto,
      userId,
      supportStatus,
      enviarMensagemSocket,
      etapa,
      enviarViaHttp,
      adicionarMensagemUsuario,
    ],

  );

  const handleEncerrar = useCallback(() => {
    encerrarSocket();
  }, [encerrarSocket]);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const bruto = e.target.value;
      const proximo = ETAPAS_TELEFONE.has(etapa) ? mascararTelefone(bruto) : bruto;
      setTexto(proximo);
      if (supportStatus === "ativo") {
        notificarDigitando();
      }
    },
    [supportStatus, notificarDigitando, etapa],
  );

  // -- Effects ----------------------------------------------------------------

  // Inicializar userId e mensagem de boas-vindas
  useEffect(() => {
    let id = localStorage.getItem("chatbot_userId");
    if (!id) {
      id = `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      localStorage.setItem("chatbot_userId", id);
    }
    setUserId(id);

    setMensagens([
      {
        id: gerarId(),
        tipo: "bot",
        conteudo:
          "Bem-vindo! Digite uma saudação para começar a conversa (ex: Olá, Oi, Bom dia).",
        timestamp: Date.now(),
      },
    ]);
  }, []);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens, supportMensagens, supportParceiroDigitando, carregando]);

  // Quando o backend transiciona para "atendente.fila" via HTTP, abrir socket
  useEffect(() => {
    if (etapa !== "atendente.fila") return;
    if (supportStatus !== "idle" && supportStatus !== "encerrado") return;
    if (solicitacaoAtendenteIniciadaRef.current) return;

    solicitacaoAtendenteIniciadaRef.current = true;

    solicitarAtendente({
      userId,
      motivo: motivoEscolhidoRef.current,
    });
  }, [etapa, userId, supportStatus, solicitarAtendente]);

  // Mensagens de sistema conforme o status do suporte muda
  useEffect(() => {
    const anterior = statusAnteriorRef.current;
    if (anterior === supportStatus) return;
    statusAnteriorRef.current = supportStatus;

    if (supportStatus === "aguardando") {
      adicionarMensagemSistema("Procurando um atendente disponível...");
      return;
    }

    if (supportStatus === "ativo" && supportAtendenteNome) {
      adicionarMensagemSistema(
        `Você está conversando com ${supportAtendenteNome}. Diga olá!`,
      );
      return;
    }

    if (supportStatus === "encerrado") {
      setEtapa("pergunta_continuar");
      solicitacaoAtendenteIniciadaRef.current = false;
      
      const labelMotivo =
        supportEncerradoPor === "cliente"
          ? "Atendimento encerrado por você."
          : supportEncerradoPor === "atendente"
            ? "O atendente encerrou o atendimento."
            : "Conexão com o atendente foi perdida.";

      adicionarMensagemSistema(labelMotivo);
      adicionarMensagemSistema("Posso ajudar com mais alguma coisa? (s/n)");
    }

    
  }, [
    supportStatus,
    supportAtendenteNome,
    supportEncerradoPor,
    adicionarMensagemSistema,
  ]);

  // Espelhar mensagens novas do socket no histórico local
  useEffect(() => {
    const total = supportMensagens.length;
    const jaRenderizadas = supportMensagensRenderizadasRef.current;
    if (total <= jaRenderizadas) {
      supportMensagensRenderizadasRef.current = total;
      return;
    }

    const novas = supportMensagens.slice(jaRenderizadas);
    const convertidas: Mensagem[] = novas.map((msg: MensagemSuporte) => ({
      id: gerarId(msg.autor),
      tipo: msg.autor === "cliente" ? "usuario" : "atendente",
      conteudo: msg.texto,
      timestamp: msg.ts,
    }));

    setMensagens((prev) => [...prev, ...convertidas]);
    supportMensagensRenderizadasRef.current = total;
  }, [supportMensagens]);

  // -- Derivados --------------------------------------------------------------

  const inputDesabilitado =
    carregando || etapa === "encerrado" || supportStatus === "aguardando";

  const placeholder =
    supportStatus === "aguardando"
      ? "Aguardando atendente conectar..."
      : supportStatus === "ativo"
        ? `Mensagem para ${supportAtendenteNome ?? "atendente"}...`
        : etapa === "encerrado"
          ? "Atendimento encerrado"
          : "Digite sua mensagem...";

  const subtitulo =
    supportStatus === "ativo" && supportAtendenteNome
      ? `Conversando com ${supportAtendenteNome}`
      : supportStatus === "aguardando"
        ? "Procurando atendente..."
        : "Online";


  useEffect(() =>{
    if(!inputDesabilitado)
      inputRef.current?.focus();
  }, [inputDesabilitado]);
  
  // -- Render -----------------------------------------------------------------

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-(--copper) bg-(--paper) shrink-0 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 border border-(--copper) rounded-full flex items-center justify-center flex-col text-(--copper-deep) shrink-0">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2 V5 M12 19 V22 M2 12 H5 M19 12 H22 M4.9 4.9 L7 7 M17 17 L19.1 19.1 M4.9 19.1 L7 17 M17 7 L19.1 4.9" />
            </svg>
          </div>
          <div className="min-w-0">
            <h3 className="text-[14px] font-medium text-(--ink) truncate">
              {supportStatus === "ativo"
                ? (supportAtendenteNome ?? "Atendente")
                : "Assistente ACDKS"}
            </h3>
            <p className="text-[11px] text-(--copper-deep) truncate">
              {subtitulo}
            </p>
          </div>
        </div>

        {supportStatus === "ativo" && (
          <button
            type="button"
            onClick={handleEncerrar}
            className="text-[11px] uppercase tracking-[0.18em] px-3 py-2 border border-(--copper) text-(--copper-deep) hover:bg-(--copper) hover:text-white transition-colors shrink-0"
          >
            Encerrar
          </button>
        )}
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-(--cream) min-h-0">
        {mensagens.map((msg) => {
          if (msg.tipo === "sistema") {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="text-[10px] font-mono tracking-[0.18em] uppercase text-(--ink-mute) bg-(--paper) px-3 py-1 border border-(--line-soft)">
                  {msg.conteudo}
                </div>
              </div>
            );
          }

          const isUsuario = msg.tipo === "usuario";
          const isAtendente = msg.tipo === "atendente";
          const bubbleClass = isUsuario
            ? "bg-(--copper) text-white"
            : isAtendente
              ? "bg-(--ink) text-(--cream) border border-(--copper)"
              : "bg-(--paper) text-(--ink) border border-(--copper)";

          return (
            <div
              key={msg.id}
              className={`flex ${isUsuario ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-xs px-4 py-3 rounded-lg ${bubbleClass}`}>
                {isAtendente && (
                  <p className="text-[9px] font-mono tracking-[0.18em] uppercase opacity-70 mb-1">
                    {supportAtendenteNome ?? "Atendente"}
                  </p>
                )}
                <p className="text-[14px] leading-relaxed whitespace-pre-line">
                  {msg.conteudo}
                </p>
              </div>
            </div>
          );
        })}

        {(carregando || supportParceiroDigitando) && (
          <div className="flex justify-start">
            <div className="bg-(--paper) text-(--ink) border border-(--copper) px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 bg-(--copper) rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2 h-2 bg-(--copper) rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 bg-(--copper) rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-(--copper) bg-(--paper) p-6 shrink-0">
        <form onSubmit={enviarMensagem} className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={texto}
            onChange={handleChangeInput}
            placeholder={placeholder}
            disabled={inputDesabilitado}
            className="flex-1 px-4 py-3 border border-(--copper) rounded-lg outline-none text-[14px] disabled:opacity-50 disabled:cursor-not-allowed focus:border-(--copper-deep) transition-colors"
          />
          <button
            type="submit"
            disabled={inputDesabilitado || !texto.trim()}
            className="px-6 py-3 bg-(--copper) text-white rounded-lg font-medium text-[14px] hover:bg-(--copper-deep) disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            {carregando ? "..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
}
