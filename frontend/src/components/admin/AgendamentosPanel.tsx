import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Agendamento } from "@/interfaces/IAgendamento";
import { mascararTelefone } from "@/utils/telefone";

const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:3000";

type FiltroStatus = "ativo" | "cancelado" | "todos";

interface AgendamentosPanelProps {
  agendamentos: Agendamento[];
  onAgendamentosChange?: (lista: Agendamento[]) => void;
}

function formatarDataHora(dt: string | null): string {
  if (!dt) return "";
  const d = new Date(dt);
  if (Number.isNaN(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${dd}/${mm} ${hh}:${mi}`;
}

export default function AgendamentosPanel({
  agendamentos,
  onAgendamentosChange,
}: AgendamentosPanelProps) {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState<FiltroStatus>("ativo");
  const [cancelandoId, setCancelandoId] = useState<number | null>(null);
  const [motivo, setMotivo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const token = typeof window !== "undefined"
    ? localStorage.getItem("atendente_token")
    : null;

  const carregar = useCallback(async () => {
    if (!token) return;
    try {
      const resp = await fetch(`${API_URL}/agendamentos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resp.status === 401 || resp.status === 403) {
        navigate("/admin/login", { replace: true });
        return;
      }
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const lista: Agendamento[] = await resp.json();
      onAgendamentosChange?.(lista);
    } catch (err) {
      console.error("[agendamentos] erro ao carregar:", err);
    }
  }, [token, navigate, onAgendamentosChange]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const filtrados = useMemo(() => {
    if (filtro === "todos") return agendamentos;
    return agendamentos.filter((a) => a.status === filtro);
  }, [agendamentos, filtro]);

  const fecharModal = useCallback(() => {
    setCancelandoId(null);
    setMotivo("");
    setErro(null);
  }, []);

  const confirmarCancelamento = useCallback(async () => {
    if (cancelandoId == null || !motivo.trim()) return;
    setEnviando(true);
    setErro(null);
    try {
      const resp = await fetch(
        `${API_URL}/agendamentos/${cancelandoId}/cancelar`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ motivo: motivo.trim() }),
        },
      );
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        setErro(data.error ?? `Erro HTTP ${resp.status}`);
        return;
      }
      fecharModal();
      // o broadcast via socket vai atualizar automaticamente; refetch é fallback
    } catch (err) {
      console.error("[agendamentos] erro ao cancelar:", err);
      setErro("Erro ao cancelar. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }, [cancelandoId, motivo, token, fecharModal]);

  const contadorAtivos = useMemo(
    () => agendamentos.filter((a) => a.status === "ativo").length,
    [agendamentos],
  );

  return (
    <aside
      style={{
        background: "var(--paper)",
        borderLeft: "1px solid var(--line)",
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
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <h2 className="display" style={{ fontSize: 18, letterSpacing: "0.06em" }}>
            Agendamentos
          </h2>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.18em",
              color: "var(--ink-mute)",
            }}
          >
            {contadorAtivos} ativos
          </span>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {(["ativo", "cancelado", "todos"] as FiltroStatus[]).map((f) => {
            const ativo = filtro === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFiltro(f)}
                style={{
                  padding: "6px 12px",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontFamily: "var(--mono)",
                  background: ativo ? "var(--copper)" : "transparent",
                  color: ativo ? "white" : "var(--copper-deep)",
                  border: "1px solid var(--copper)",
                  cursor: "pointer",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {filtrados.length === 0 ? (
          <div
            style={{
              padding: 32,
              textAlign: "center",
              color: "var(--ink-mute)",
              fontSize: 13,
            }}
          >
            Nenhum agendamento {filtro === "todos" ? "" : `${filtro}`} no momento.
          </div>
        ) : (
          filtrados.map((ag) => {
            const isCancelado = ag.status === "cancelado";
            return (
              <article
                key={ag.id}
                style={{
                  padding: "16px 24px",
                  borderBottom: "1px solid var(--line-soft)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  opacity: isCancelado ? 0.7 : 1,
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
                    className="display"
                    style={{ fontSize: 15, color: "var(--ink)" }}
                  >
                    {ag.nome}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 9,
                      letterSpacing: "0.18em",
                      color: isCancelado ? "var(--ink-mute)" : "var(--copper-deep)",
                      textTransform: "uppercase",
                    }}
                  >
                    {isCancelado ? "cancelado" : "ativo"}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--ink)",
                    opacity: 0.8,
                  }}
                >
                  {mascararTelefone(ag.telefone)}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--ink-mute)",
                    lineHeight: 1.6,
                  }}
                >
                  {ag.servicos.map((s) => s.nome).join(" + ") || "Sem serviços"}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    color: "var(--ink-mute)",
                  }}
                >
                  <span>{formatarDataHora(ag.criadoEm)}</span>
                  <span style={{ color: "var(--copper-deep)" }}>
                    R$ {ag.valorTotal.toFixed(2)}
                  </span>
                </div>

                {isCancelado && (
                  <div
                    style={{
                      padding: 8,
                      background: "var(--cream)",
                      border: "1px solid var(--line-soft)",
                      fontSize: 11,
                      color: "var(--ink-mute)",
                      lineHeight: 1.5,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 9,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      Por {ag.canceladoPor ?? "—"} · {formatarDataHora(ag.canceladoEm)}
                    </div>
                    {ag.motivoCancelamento && <div>{ag.motivoCancelamento}</div>}
                  </div>
                )}

                {!isCancelado && (
                  <button
                    type="button"
                    onClick={() => setCancelandoId(ag.id)}
                    style={{
                      padding: "6px 12px",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      border: "1px solid var(--copper)",
                      background: "transparent",
                      color: "var(--copper-deep)",
                      cursor: "pointer",
                      alignSelf: "flex-start",
                    }}
                  >
                    Cancelar
                  </button>
                )}
              </article>
            );
          })
        )}
      </div>

      {cancelandoId != null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(21,17,13,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
            padding: 24,
          }}
          onClick={fecharModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--paper)",
              padding: 32,
              maxWidth: 480,
              width: "100%",
              border: "1px solid var(--copper)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <h3
              className="display"
              style={{ fontSize: 22, color: "var(--ink)" }}
            >
              Cancelar agendamento
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "var(--ink-mute)",
                lineHeight: 1.6,
              }}
            >
              Descreva o motivo do cancelamento. Esse campo é obrigatório e ficará registrado no histórico.
            </p>
            <textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Ex: cliente desistiu, conflito de horário, etc."
              rows={4}
              autoFocus
              style={{
                padding: "12px 14px",
                border: "1px solid var(--copper)",
                background: "var(--cream)",
                fontSize: 14,
                color: "var(--ink)",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
            {erro && (
              <div
                style={{
                  fontSize: 12,
                  color: "var(--copper-deep)",
                  fontFamily: "var(--mono)",
                }}
              >
                {erro}
              </div>
            )}
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={fecharModal}
                disabled={enviando}
                style={{
                  padding: "10px 18px",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  border: "1px solid var(--copper)",
                  background: "transparent",
                  color: "var(--copper-deep)",
                  cursor: enviando ? "not-allowed" : "pointer",
                }}
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={confirmarCancelamento}
                disabled={enviando || !motivo.trim()}
                className="btn btn-primary"
                style={{
                  padding: "10px 22px",
                  opacity: !motivo.trim() || enviando ? 0.5 : 1,
                  cursor:
                    !motivo.trim() || enviando ? "not-allowed" : "pointer",
                }}
              >
                {enviando ? "Cancelando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
