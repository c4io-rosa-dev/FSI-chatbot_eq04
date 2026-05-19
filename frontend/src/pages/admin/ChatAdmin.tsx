import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { io, type Socket } from "socket.io-client";
import type {
  AdminEmitEvents,
  AdminListenEvents,
  AtendenteConectadoPayload,
  ItemFila,
  MensagemSuporte,
} from "@/interfaces/ISupportEvents";

const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:3000";
const STORAGE_KEY = "atendente_nome";
const TYPING_DEBOUNCE_MS = 2000;

type AdminSocket = Socket<AdminListenEvents, AdminEmitEvents>;

interface ChatAtivo {
  roomId: string;
  userId: string;
  motivo: string | null;
  iniciadoEm: number;
}

function formatarTempoEspera(criadoEm: number, agora: number) {
  const segundos = Math.max(0, Math.floor((agora - criadoEm) / 1000));
  if (segundos < 60) return `${segundos}s`;
  const minutos = Math.floor(segundos / 60);
  return `${minutos}m`;
}

export default function ChatAdmin() {
  const navigate = useNavigate();
  const [nome] = useState<string>(() => localStorage.getItem(STORAGE_KEY) ?? "");

  const socketRef = useRef<AdminSocket | null>(null);
  const [conectado, setConectado] = useState(false);
  const [erroConexao, setErroConexao] = useState<string | null>(null);
  const [fila, setFila] = useState<ItemFila[]>([]);
  const [chatAtivo, setChatAtivo] = useState<ChatAtivo | null>(null);
  const [mensagens, setMensagens] = useState<MensagemSuporte[]>([]);
  const [clienteDigitando, setClienteDigitando] = useState(false);
  const [aceitandoUserId, setAceitandoUserId] = useState<string | null>(null);
  const [texto, setTexto] = useState("");
  const [agora, setAgora] = useState(() => Date.now());

  const digitandoTrueEnviadoRef = useRef(false);
  const digitandoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Redireciona pra login se não houver nome
  useEffect(() => {
    if (!nome) {
      navigate("/admin/login", { replace: true });
    }
  }, [nome, navigate]);

  // Atualiza o "agora" a cada 5s pra recalcular tempo de espera
  useEffect(() => {
    const t = setInterval(() => setAgora(Date.now()), 5000);
    return () => clearInterval(t);
  }, []);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens, clienteDigitando]);

  // Conexão Socket.IO
  useEffect(() => {
    if (!nome) return;

    const socket: AdminSocket = io(`${API_URL}/admin`, {
      auth: { nome },
      transports: ["websocket", "polling"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      setConectado(true);
      setErroConexao(null);
    });

    socket.on("connect_error", (err) => {
      setConectado(false);
      setErroConexao(err.message);
    });

    socket.on("disconnect", () => {
      setConectado(false);
    });

    socket.on("admin:fila:atual", (snapshot) => {
      setFila(snapshot);
    });

    socket.on("admin:fila:update", (snapshot) => {
      setFila(snapshot);
    });

    socket.on("atendente:conectado", (payload: AtendenteConectadoPayload) => {
      setChatAtivo({
        roomId: payload.roomId,
        userId: payload.userId,
        motivo: payload.motivo,
        iniciadoEm: Date.now(),
      });
      setMensagens([]);
      setClienteDigitando(false);
    });

    socket.on("support:msg", (msg) => {
      setMensagens((prev) => [...prev, msg]);
    });

    socket.on("support:digitando", ({ autor, digitando }) => {
      if (autor === "cliente") setClienteDigitando(digitando);
    });

    socket.on("support:encerrado", () => {
      setClienteDigitando(false);
      setChatAtivo(null);
      setTexto("");
      digitandoTrueEnviadoRef.current = false;
      if (digitandoTimerRef.current) {
        clearTimeout(digitandoTimerRef.current);
        digitandoTimerRef.current = null;
      }
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [nome]);

  const aceitar = useCallback((userId: string) => {
    const socket = socketRef.current;
    if (!socket || chatAtivo) return;

    setAceitandoUserId(userId);
    socket.emit("atendente:aceitar", { userId }, (resp) => {
      setAceitandoUserId(null);
      if (!resp.ok) {
        alert(resp.erro ?? "Não foi possível aceitar o atendimento.");
      }
    });
  }, [chatAtivo]);

  const enviarMensagem = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const valor = texto.trim();
      const socket = socketRef.current;
      if (!valor || !socket || !chatAtivo) return;

      socket.emit("support:msg", { roomId: chatAtivo.roomId, texto: valor });
      setTexto("");

      if (digitandoTrueEnviadoRef.current) {
        socket.emit("support:digitando", {
          roomId: chatAtivo.roomId,
          digitando: false,
        });
        digitandoTrueEnviadoRef.current = false;
      }
      if (digitandoTimerRef.current) {
        clearTimeout(digitandoTimerRef.current);
        digitandoTimerRef.current = null;
      }
    },
    [texto, chatAtivo],
  );

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTexto(e.target.value);
      const socket = socketRef.current;
      if (!socket || !chatAtivo) return;

      if (!digitandoTrueEnviadoRef.current) {
        socket.emit("support:digitando", {
          roomId: chatAtivo.roomId,
          digitando: true,
        });
        digitandoTrueEnviadoRef.current = true;
      }
      if (digitandoTimerRef.current) clearTimeout(digitandoTimerRef.current);
      digitandoTimerRef.current = setTimeout(() => {
        if (socketRef.current && chatAtivo) {
          socketRef.current.emit("support:digitando", {
            roomId: chatAtivo.roomId,
            digitando: false,
          });
        }
        digitandoTrueEnviadoRef.current = false;
        digitandoTimerRef.current = null;
      }, TYPING_DEBOUNCE_MS);
    },
    [chatAtivo],
  );

  const encerrar = useCallback(() => {
    const socket = socketRef.current;
    if (!socket || !chatAtivo) return;
    socket.emit("support:encerrar", { roomId: chatAtivo.roomId });
  }, [chatAtivo]);

  const sair = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    socketRef.current?.disconnect();
    navigate("/admin/login", { replace: true });
  }, [navigate]);

  const filaOrdenada = useMemo(
    () => [...fila].sort((a, b) => a.criadoEm - b.criadoEm),
    [fila],
  );

  if (!nome) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--cream)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "var(--ink)",
          color: "var(--cream)",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "2px solid var(--copper)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            className="display"
            style={{ fontSize: 22, letterSpacing: "0.08em" }}
          >
            ACDKS · ATENDIMENTO
          </span>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: conectado ? "#9BD17F" : "var(--copper-soft)",
            }}
          >
            {conectado ? "● online" : erroConexao ? "● erro" : "● conectando..."}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
            }}
          >
            {nome}
          </span>
          <button
            type="button"
            onClick={sair}
            style={{
              padding: "8px 16px",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              border: "1px solid var(--copper)",
              color: "var(--copper-soft)",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            Sair
          </button>
        </div>
      </header>

      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          minHeight: 0,
        }}
      >
        {/* Fila */}
        <aside
          style={{
            background: "var(--paper)",
            borderRight: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid var(--line-soft)",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <h2
              className="display"
              style={{ fontSize: 18, letterSpacing: "0.06em" }}
            >
              Fila
            </h2>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.18em",
                color: "var(--ink-mute)",
              }}
            >
              {filaOrdenada.length} aguardando
            </span>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {filaOrdenada.length === 0 ? (
              <div
                style={{
                  padding: 32,
                  textAlign: "center",
                  color: "var(--ink-mute)",
                  fontSize: 13,
                }}
              >
                Nenhum cliente aguardando no momento.
              </div>
            ) : (
              filaOrdenada.map((item) => {
                const desabilitado =
                  !!chatAtivo || aceitandoUserId === item.userId;
                return (
                  <article
                    key={item.userId}
                    style={{
                      padding: "16px 24px",
                      borderBottom: "1px solid var(--line-soft)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: 10,
                          letterSpacing: "0.18em",
                          color: "var(--copper-deep)",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.motivo ?? "Sem motivo"}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: 10,
                          color: "var(--ink-mute)",
                        }}
                      >
                        {formatarTempoEspera(item.criadoEm, agora)}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 11,
                        color: "var(--ink)",
                        opacity: 0.8,
                        wordBreak: "break-all",
                      }}
                    >
                      {item.userId}
                    </div>
                    <button
                      type="button"
                      disabled={desabilitado}
                      onClick={() => aceitar(item.userId)}
                      className="btn btn-primary"
                      style={{
                        padding: "8px 14px",
                        fontSize: 11,
                        opacity: desabilitado ? 0.4 : 1,
                        cursor: desabilitado ? "not-allowed" : "pointer",
                      }}
                    >
                      {aceitandoUserId === item.userId
                        ? "Conectando..."
                        : chatAtivo
                          ? "Em atendimento"
                          : "Atender"}
                    </button>
                  </article>
                );
              })
            )}
          </div>
        </aside>

        {/* Chat */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            background: "var(--cream)",
            minHeight: 0,
          }}
        >
          {!chatAtivo ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--ink-mute)",
                flexDirection: "column",
                gap: 12,
                padding: 24,
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "var(--ink-faint)",
                }}
              >
                ◆ Em espera ◆
              </span>
              <h3
                className="display"
                style={{ fontSize: 28, color: "var(--ink)" }}
              >
                Selecione um atendimento da fila
              </h3>
              <p style={{ fontSize: 13, maxWidth: 360 }}>
                Quando um cliente solicitar atendimento, ele aparecerá à
                esquerda. Clique em <em>Atender</em> para iniciar a conversa.
              </p>
            </div>
          ) : (
            <>
              <div
                style={{
                  padding: "16px 24px",
                  background: "var(--paper)",
                  borderBottom: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 9,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--ink-faint)",
                    }}
                  >
                    Cliente · {chatAtivo.userId.slice(0, 14)}
                  </div>
                  <div
                    className="display"
                    style={{ fontSize: 18, color: "var(--ink)", marginTop: 2 }}
                  >
                    {chatAtivo.motivo ?? "Atendimento"}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={encerrar}
                  style={{
                    padding: "8px 16px",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    border: "1px solid var(--copper)",
                    background: "transparent",
                    color: "var(--copper-deep)",
                    cursor: "pointer",
                  }}
                >
                  Encerrar
                </button>
              </div>

              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "24px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  minHeight: 0,
                }}
              >
                {mensagens.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      color: "var(--ink-mute)",
                      fontSize: 12,
                      padding: 24,
                    }}
                  >
                    Mande uma mensagem pra iniciar o atendimento.
                  </div>
                )}
                {mensagens.map((msg, idx) => {
                  const isAtendente = msg.autor === "atendente";
                  return (
                    <div
                      key={`${msg.ts}-${idx}`}
                      style={{
                        display: "flex",
                        justifyContent: isAtendente ? "flex-end" : "flex-start",
                      }}
                    >
                      <div
                        style={{
                          maxWidth: "70%",
                          padding: "10px 14px",
                          borderRadius: 8,
                          background: isAtendente
                            ? "var(--copper)"
                            : "var(--paper)",
                          color: isAtendente ? "white" : "var(--ink)",
                          border: isAtendente
                            ? "none"
                            : "1px solid var(--line)",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 14,
                            lineHeight: 1.6,
                            whiteSpace: "pre-line",
                          }}
                        >
                          {msg.texto}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {clienteDigitando && (
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div
                      style={{
                        padding: "10px 14px",
                        background: "var(--paper)",
                        border: "1px solid var(--line)",
                        borderRadius: 8,
                      }}
                    >
                      <div style={{ display: "flex", gap: 4 }}>
                        <span
                          className="w-2 h-2 bg-(--copper) rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-2 h-2 bg-(--copper) rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-2 h-2 bg-(--copper) rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form
                onSubmit={enviarMensagem}
                style={{
                  padding: "16px 24px",
                  borderTop: "1px solid var(--line)",
                  background: "var(--paper)",
                  display: "flex",
                  gap: 12,
                }}
              >
                <input
                  type="text"
                  value={texto}
                  onChange={handleChangeInput}
                  placeholder="Escreva uma mensagem ao cliente..."
                  style={{
                    flex: 1,
                    padding: "12px 14px",
                    border: "1px solid var(--copper)",
                    background: "var(--cream)",
                    fontSize: 14,
                    outline: "none",
                    color: "var(--ink)",
                  }}
                />
                <button
                  type="submit"
                  disabled={!texto.trim()}
                  className="btn btn-primary"
                  style={{
                    padding: "10px 22px",
                    opacity: texto.trim() ? 1 : 0.5,
                    cursor: texto.trim() ? "pointer" : "not-allowed",
                  }}
                >
                  Enviar
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
