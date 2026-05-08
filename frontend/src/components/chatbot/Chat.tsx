import { FormEvent, useState } from "react";

export default function Chat() {
  const [texto, setTexto] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div
        className="flex-1 px-8 py-10 flex flex-col justify-center items-center text-center gap-[18px] bg-[var(--cream)]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(107,90,69,0.08) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="w-24 h-24 border-2 border-[var(--copper)] rounded-full flex items-center justify-center flex-col text-[var(--copper-deep)] bg-[var(--paper)] -rotate-[4deg] relative">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2 V5 M12 19 V22 M2 12 H5 M19 12 H22 M4.9 4.9 L7 7 M17 17 L19.1 19.1 M4.9 19.1 L7 17 M17 7 L19.1 4.9" />
          </svg>
          <span className="display text-[13px] mt-1 tracking-[0.08em]">
            Online
          </span>
        </div>

        <div className="font-[var(--mono)] text-[10px] tracking-[0.28em] uppercase text-[var(--copper-deep)]">
          ◆ Aviso da casa ◆
        </div>

        <h3 className="display text-[32px] leading-none tracking-[0.02em] text-[var(--ink)]">
          ATENDIMENTO
          <br />
          <span className="text-[var(--copper-deep)]">PRONTO</span>
        </h3>

        <p className="text-[13px] leading-[1.7] text-[var(--ink-mute)] max-w-[320px] font-light">
          Nosso assistente virtual está pronto para atendê-lo. Faça sua reserva
          ou consulta diretamente por aqui. Qualquer dúvida solicite um de
          nossos atendentes.
        </p>
      </div>
      <div id="chat" className="w-full h-full"></div>
      <div className="w-full flex flex-col justify-end p-4 h-full">
        <form
          id="form-chatbot"
          className="w-full flex justify-center gap-4 mb-6"
        >
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Digite uma mensagem"
            className="flex-1 p-2 border border-ink-mid outline-none"
          />
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
