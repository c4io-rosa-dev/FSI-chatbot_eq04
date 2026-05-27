import { connection } from '../../database.js';

const db = connection.promise();

function parseLinha(row) {
    let servicos = [];
    try {
        servicos = row.servicos_json ? JSON.parse(row.servicos_json) : [];
    } catch {
        servicos = [];
    }

    return {
        id: row.id,
        telefone: row.telefone,
        nome: row.nome,
        servicos,
        valorTotal: Number(row.valor_total),
        status: row.status,
        criadoEm: row.criado_em,
        canceladoEm: row.cancelado_em,
        canceladoPor: row.cancelado_por,
        motivoCancelamento: row.motivo_cancelamento,
    };
}

export async function criarAgendamento({ telefone, nome, servicos, valorTotal }) {
    const [result] = await db.execute(
        'INSERT INTO agendamento (telefone, nome, servicos_json, valor_total) VALUES (?, ?, ?, ?)',
        [telefone, nome, JSON.stringify(servicos), valorTotal],
    );
    return result.insertId;
}

export async function listarAtivosPorTelefone(telefone) {
    const [rows] = await db.execute(
        "SELECT * FROM agendamento WHERE telefone = ? AND status = 'ativo' ORDER BY criado_em DESC",
        [telefone],
    );
    return rows.map(parseLinha);
}

export async function listarTodos({ status } = {}) {
    let sql = 'SELECT * FROM agendamento';
    const params = [];

    if (status === 'ativo' || status === 'cancelado') {
        sql += ' WHERE status = ?';
        params.push(status);
    }

    sql += ' ORDER BY criado_em DESC';

    const [rows] = await db.execute(sql, params);
    return rows.map(parseLinha);
}

export async function getPorId(id) {
    const [rows] = await db.execute('SELECT * FROM agendamento WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) return null;
    return parseLinha(rows[0]);
}

export async function cancelarAgendamento({ id, canceladoPor, motivo }) {
    const [result] = await db.execute(
        `UPDATE agendamento
            SET status = 'cancelado',
                cancelado_em = CURRENT_TIMESTAMP,
                cancelado_por = ?,
                motivo_cancelamento = ?
          WHERE id = ? AND status = 'ativo'`,
        [canceladoPor, motivo ?? null, id],
    );
    return result.affectedRows > 0;
}
