import { FormEvent, useState, useEffect, useRef } from "react";

interface Mensagem {
  id: string;
  tipo: "usuario" | "bot";
  conteudo: string;
  timestamp: number;
}

export default function Chat() {
  const [texto, setTexto] = useState("");
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [carregando, setCarregando] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const API_URL = "http://localhost:3000/chat";

  // Inicializar userId do localStorage ou gerar um novo
  useEffect(() => {
    let id = localStorage.getItem("chatbot_userId");
    if (!id) {
      id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("chatbot_userId", id);
    }
    setUserId(id);

    // Mensagem inicial de boas-vindas
    const mensagemInicial: Mensagem = {
      id: `msg_${Date.now()}`,
      tipo: "bot",
      conteudo:
        "Bem-vindo! Digite uma saudação para começar a conversa (ex: Olá, Oi, Bom dia).",
      timestamp: Date.now(),
    };
    setMensagens([mensagemInicial]);
  }, []);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  const enviarMensagem = async (e: FormEvent) => {
    e.preventDefault();

    if (!texto.trim() || !userId) return;

    // Adicionar mensagem do usuário
    const novaMsg: Mensagem = {
      id: `msg_${Date.now()}`,
      tipo: "usuario",
      conteudo: texto,
      timestamp: Date.now(),
    };

    setMensagens((prev) => [...prev, novaMsg]);
    setTexto("");
    setCarregando(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          message: texto,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();

      // Adicionar resposta do bot
      const msgBot: Mensagem = {
        id: `msg_${Date.now()}_bot`,
        tipo: "bot",
        conteudo: data.response,
        timestamp: Date.now(),
      };

      setMensagens((prev) => [...prev, msgBot]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);

      const msgErro: Mensagem = {
        id: `msg_${Date.now()}_erro`,
        tipo: "bot",
        conteudo:
          "Desculpe, houve um erro ao processar sua mensagem. Tente novamente.",
        timestamp: Date.now(),
      };

      setMensagens((prev) => [...prev, msgErro]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-(--copper) bg-(--paper) shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-(--copper) rounded-full flex items-center justify-center flex-col text-(--copper-deep)">
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
          <div>
            <h3 className="text-[14px] font-medium text-(--ink)">
              Assistente ACDKS
            </h3>
            <p className="text-[11px] text-(--copper-deep)">Online</p>
          </div>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-(--cream) min-h-0">
        {mensagens.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.tipo === "usuario" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-lg ${
                msg.tipo === "usuario"
                  ? "bg-(--copper) text-white"
                  : "bg-(--paper) text-(--ink) border border-(--copper)"
              }`}
            >
              <p className="text-[14px] leading-relaxed whitespace-pre-line">
                {msg.conteudo}
              </p>
            </div>
          </div>
        ))}
        {carregando && (
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
            type="text"
            value={texto}
            autoFocus
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Digite sua mensagem..."
            disabled={carregando}
            className="flex-1 px-4 py-3 border border-(--copper) rounded-lg outline-none text-[14px] disabled:opacity-50 disabled:cursor-not-allowed focus:border-(--copper-deep) transition-colors"
          />
          <button
            type="submit"
            disabled={carregando || !texto.trim()}
            className="px-6 py-3 bg-(--copper) text-white rounded-lg font-medium text-[14px] hover:bg-(--copper-deep) disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            {carregando ? "..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
}
