// administra em memória o estado da fila de espera + sessões ativas de atendimento humano

const filaAtendimento = [];
const sessoesAtivas = new Map();

export function enfileirar({ userId, motivo, nome }) {
    if (filaAtendimento.some((item) => item.userId === userId)) {
        return null;
    }

    const item = {
        userId,
        motivo,
        nome: nome ?? null,
        criadoEm: Date.now(),
    };

    filaAtendimento.push(item);
    return item;
}

export function removerDaFila(userId) {
    const idx = filaAtendimento.findIndex((item) => item.userId === userId);

    if (idx === -1) {
        return null;
    }

    const [item] = filaAtendimento.splice(idx, 1);
    return item;
}

export function listarFila() {
    return filaAtendimento.map((item) => ({ ...item }));
}

export function criarSessao({
    roomId,
    userId,
    clientSocketId,
    attendantSocketId,
    attendantNome,
    atendimentoId,
}) {
    const sessao = {
        roomId,
        userId,
        clientSocketId,
        attendantSocketId,
        attendantNome,
        atendimentoId,
        iniciadoEm: Date.now(),
    };

    sessoesAtivas.set(roomId, sessao);
    return sessao;
}

export function encerrarSessao(roomId) {
    const sessao = sessoesAtivas.get(roomId);

    if (!sessao) {
        return null;
    }

    sessoesAtivas.delete(roomId);
    return sessao;
}

export function getSessao(roomId) {
    return sessoesAtivas.get(roomId) ?? null;
}

export function getSessaoPorSocket(socketId) {
    for (const sessao of sessoesAtivas.values()) {
        if (sessao.clientSocketId === socketId || sessao.attendantSocketId === socketId) {
            return sessao;
        }
    }

    return null;
}

export function getSessaoPorUserId(userId) {
    for (const sessao of sessoesAtivas.values()) {
        if (sessao.userId === userId) {
            return sessao;
        }
    }

    return null;
}

export function atendenteEmSessao(attendantSocketId) {
    for (const sessao of sessoesAtivas.values()) {
        if (sessao.attendantSocketId === attendantSocketId) {
            return sessao;
        }
    }

    return null;
}
