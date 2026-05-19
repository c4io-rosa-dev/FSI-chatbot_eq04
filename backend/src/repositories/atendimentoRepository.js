// camada de acesso ao MySQL para o histórico de atendimentos humanos
// mysql12 com Promises

import { connection } from '../../database.js';

const db = connection.promise();

export async function criarAtendimento({ userId, motivo, atendente }) {
    const [result] = await db.execute(
        'INSERT INTO atendimento (user_id, motivo, atendente) VALUES (?, ?, ?)',
        [userId, motivo ?? null, atendente ?? null],
    );

    return result.insertId;
}

export async function salvarMensagem({ atendimentoId, autor, texto }) {
    await db.execute(
        'INSERT INTO mensagem_atendimento (atendimento_id, autor, texto) VALUES (?, ?, ?)',
        [atendimentoId, autor, texto],
    );
}

export async function encerrarAtendimento({ atendimentoId, encerradoPor }) {
    await db.execute(
        'UPDATE atendimento SET encerrado_em = CURRENT_TIMESTAMP, encerrado_por = ? WHERE id = ? AND encerrado_em IS NULL',
        [encerradoPor, atendimentoId],
    );
}

export async function listarHistorico({ userId }) {
    const [rows] = await db.execute(
        'SELECT id, user_id, motivo, atendente, iniciado_em, encerrado_em, encerrado_por FROM atendimento WHERE user_id = ? ORDER BY iniciado_em DESC',
        [userId],
    );

    return rows;
}

export async function listarMensagens({ atendimentoId }) {
    const [rows] = await db.execute(
        'SELECT id, autor, texto, enviada_em FROM mensagem_atendimento WHERE atendimento_id = ? ORDER BY enviada_em ASC, id ASC',
        [atendimentoId],
    );

    return rows;
}
