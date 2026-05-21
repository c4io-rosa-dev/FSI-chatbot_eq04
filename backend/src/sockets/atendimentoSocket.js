// handler socket.IO para o fluxo de atendimento humano (cliente <-> atendente).
//
// Namespaces:
//   /        -> sockets dos clientes (chatbot do site)
//   /admin   -> sockets dos atendentes logados no painel
// rooms: "support:<userId>" - um por sessao ativa.

import {
    atendenteEmSessao,
    criarSessao,
    encerrarSessao,
    enfileirar,
    getSessao,
    getSessaoPorSocket,
    getSessaoPorUserId,
    listarFila,
    removerDaFila,
} from "../state/atendimentoState.js";
import {
    criarAtendimento,
    encerrarAtendimento,
    salvarMensagem,
} from "../repositories/atendimentoRepository.js";
import { getUsuario } from "../state/userState.js";
import jwt from 'jsonwebtoken';

const clientesPorUserId = new Map();

function roomDe(userId) {
    return `support:${userId}`;
}

function findClientSocketByUserId(io, userId) {
    const socketId = clientesPorUserId.get(userId);
    if (!socketId) return null;
    return io.of("/").sockets.get(socketId) ?? null;
}

function broadcastFila(io) {
    io.of("/admin").emit("admin:fila:update", listarFila());
}

async function encerrarSessaoCompleta({ io, roomId, encerradoPor }) {
    const sessao = encerrarSessao(roomId);
    if (!sessao) return;

    try {
        await encerrarAtendimento({
            atendimentoId: sessao.atendimentoId,
            encerradoPor,
        });
    } catch (err) {
        console.error("[atendimento] erro ao encerrar no banco:", err);
    }

    const usuario = getUsuario(sessao.userId);
    usuario.etapa = "atendente.pergunta_continuar";

    io.of("/").to(roomId).emit("support:encerrado", { encerradoPor });
    io.of("/admin").to(roomId).emit("support:encerrado", { encerradoPor });

    io.of("/").in(roomId).socketsLeave(roomId);
    io.of("/admin").in(roomId).socketsLeave(roomId);
}

function registrarNamespaceCliente(io) {
    const nsp = io.of("/");

    nsp.on("connection", (socket) => {
        socket.on("atendente:solicitar", ({ userId, motivo, nome }, ack) => {
            if (!userId) {
                if (typeof ack === "function") ack({ ok: false, erro: "userId obrigatório" });
                return;
            }

            if (getSessaoPorUserId(userId)) {
                if (typeof ack === "function") ack({ ok: false, erro: "Já existe uma sessão ativa." });
                return;
            }

            const item = enfileirar({ userId, motivo, nome });
            if (!item) {
                if (typeof ack === "function") ack({ ok: false, erro: "Você já está na fila." });
                return;
            }

            socket.data.userId = userId;
            clientesPorUserId.set(userId, socket.id);

            socket.emit("atendente:aguardando", { posicao: listarFila().length });
            broadcastFila(io);

            if (typeof ack === "function") ack({ ok: true });
        });

        socket.on("support:msg", async ({ roomId, texto }) => {
            const sessao = getSessao(roomId);
            if (!sessao || sessao.clientSocketId !== socket.id) return;
            if (typeof texto !== "string" || !texto.trim()) return;

            const payload = {
                autor: "cliente",
                texto,
                ts: Date.now(),
            };

            nsp.to(roomId).emit("support:msg", payload);
            io.of("/admin").to(roomId).emit("support:msg", payload);

            try {
                await salvarMensagem({
                    atendimentoId: sessao.atendimentoId,
                    autor: "cliente",
                    texto,
                });
            } catch (err) {
                console.error("[atendimento] erro ao salvar mensagem do cliente:", err);
            }
        });

        socket.on("support:digitando", ({ roomId, digitando }) => {
            const sessao = getSessao(roomId);
            if (!sessao || sessao.clientSocketId !== socket.id) return;

            io.of("/admin").to(roomId).emit("support:digitando", {
                autor: "cliente",
                digitando: !!digitando,
            });
        });

        socket.on("support:encerrar", async ({ roomId }) => {
            const sessao = getSessao(roomId);
            if (!sessao || sessao.clientSocketId !== socket.id) return;

            await encerrarSessaoCompleta({ io, roomId, encerradoPor: "cliente" });
        });

        socket.on("disconnect", async () => {
            const userId = socket.data.userId;
            if (!userId) return;

            clientesPorUserId.delete(userId);

            const sessao = getSessaoPorSocket(socket.id);
            if (sessao) {
                await encerrarSessaoCompleta({
                    io,
                    roomId: sessao.roomId,
                    encerradoPor: "desconexao",
                });
                return;
            }

            const removido = removerDaFila(userId);
            if (removido) broadcastFila(io);
        });
    });
}

function registrarNamespaceAdmin(io) {
    const nsp = io.of("/admin");

    nsp.use((socket, next) => {
        const token = socket.handshake.auth?.token;
        if (!token) return next(new Error('Token ausente'));
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            socket.data.atendente = { id: payload.id, nome: payload.nome };
            next();
        } catch {
            next(new Error('Token inválido ou expirado'));
        }
    })

    nsp.on("connection", (socket) => {
        socket.emit("admin:fila:atual", listarFila());

        socket.on("atendente:aceitar", async ({ userId }, ack) => {
            if (!userId) {
                if (typeof ack === "function") ack({ ok: false, erro: "userId obrigatório" });
                return;
            }

            if (atendenteEmSessao(socket.id)) {
                if (typeof ack === "function") ack({ ok: false, erro: "Você já está em um atendimento." });
                return;
            }

            const itemFila = removerDaFila(userId);
            if (!itemFila) {
                if (typeof ack === "function") ack({ ok: false, erro: "Pedido não está mais na fila." });
                return;
            }

            const clienteSocket = findClientSocketByUserId(io, userId);
            if (!clienteSocket) {
                if (typeof ack === "function") ack({ ok: false, erro: "Cliente desconectou." });
                broadcastFila(io);
                return;
            }

            const roomId = roomDe(userId);
            const atendenteNome = socket.data.atendente.nome;

            let atendimentoId;
            try {
                atendimentoId = await criarAtendimento({
                    userId,
                    motivo: itemFila.motivo,
                    atendente: atendenteNome,
                });
            } catch (err) {
                console.error("[atendimento] erro ao criar atendimento no banco:", err);
                if (typeof ack === "function") ack({ ok: false, erro: "Erro ao iniciar atendimento." });
                broadcastFila(io);
                return;
            }

            criarSessao({
                roomId,
                userId,
                clientSocketId: clienteSocket.id,
                attendantSocketId: socket.id,
                attendantNome: atendenteNome,
                atendimentoId,
            });

            await clienteSocket.join(roomId);
            await socket.join(roomId);

            const usuario = getUsuario(userId);
            usuario.etapa = "atendente.ativo";

            const payload = {
                roomId,
                atendenteNome,
                motivo: itemFila.motivo,
                userId,
            };

            clienteSocket.emit("atendente:conectado", payload);
            socket.emit("atendente:conectado", payload);
            broadcastFila(io);

            if (typeof ack === "function") ack({ ok: true, roomId });
        });

        socket.on("support:msg", async ({ roomId, texto }) => {
            const sessao = getSessao(roomId);
            if (!sessao || sessao.attendantSocketId !== socket.id) return;
            if (typeof texto !== "string" || !texto.trim()) return;

            const payload = {
                autor: "atendente",
                texto,
                ts: Date.now(),
            };

            io.of("/").to(roomId).emit("support:msg", payload);
            nsp.to(roomId).emit("support:msg", payload);

            try {
                await salvarMensagem({
                    atendimentoId: sessao.atendimentoId,
                    autor: "atendente",
                    texto,
                });
            } catch (err) {
                console.error("[atendimento] erro ao salvar mensagem do atendente:", err);
            }
        });

        socket.on("support:digitando", ({ roomId, digitando }) => {
            const sessao = getSessao(roomId);
            if (!sessao || sessao.attendantSocketId !== socket.id) return;

            io.of("/").to(roomId).emit("support:digitando", {
                autor: "atendente",
                digitando: !!digitando,
            });
        });

        socket.on("support:encerrar", async ({ roomId }) => {
            const sessao = getSessao(roomId);
            if (!sessao || sessao.attendantSocketId !== socket.id) return;

            await encerrarSessaoCompleta({ io, roomId, encerradoPor: "atendente" });
        });

        socket.on("disconnect", async () => {
            const sessao = getSessaoPorSocket(socket.id);
            if (sessao) {
                await encerrarSessaoCompleta({
                    io,
                    roomId: sessao.roomId,
                    encerradoPor: "desconexao",
                });
            }
        });
    });
}

export function registrarSocketsAtendimento(io) {
    registrarNamespaceCliente(io);
    registrarNamespaceAdmin(io);
}
