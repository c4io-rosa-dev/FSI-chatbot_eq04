import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "atendente_nome";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const valor = nome.trim();
    if (!valor) {
      setErro("Informe um nome para entrar.");
      return;
    }
    localStorage.setItem(STORAGE_KEY, valor);
    navigate("/admin/chat", { replace: true });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--cream)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px var(--pad)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "var(--paper)",
          padding: 48,
          border: "1px solid var(--copper)",
          boxShadow: "0 24px 60px rgba(21,17,13,0.18)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--copper-deep)",
            marginBottom: 12,
          }}
        >
          ◆ Painel do atendente ◆
        </div>

        <h1
          className="display"
          style={{
            fontSize: 38,
            lineHeight: 1,
            letterSpacing: "0.02em",
            color: "var(--ink)",
            marginBottom: 24,
          }}
        >
          ACDKS · ATENDIMENTO
        </h1>

        <p
          style={{
            fontSize: 13,
            lineHeight: 1.7,
            color: "var(--ink-mute)",
            marginBottom: 28,
          }}
        >
          Identifique-se para começar a atender os clientes da casa.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
              }}
            >
              Como deseja ser identificado
            </span>
            <input
              type="text"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                if (erro) setErro(null);
              }}
              placeholder="ex.: Caio"
              autoFocus
              style={{
                padding: "12px 14px",
                border: "1px solid var(--copper)",
                background: "var(--cream)",
                fontSize: 15,
                color: "var(--ink)",
                outline: "none",
              }}
            />
          </label>

          {erro && (
            <div
              style={{
                fontSize: 12,
                color: "var(--copper-deep)",
                fontFamily: "var(--mono)",
                letterSpacing: "0.08em",
              }}
            >
              {erro}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: "12px 24px", marginTop: 8 }}
          >
            Entrar no painel
          </button>
        </form>
      </div>
    </div>
  );
}
