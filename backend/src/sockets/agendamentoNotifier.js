import { listarTodos } from '../repositories/agendamentoRepository.js';

let _io = null;

export function setIo(io) {
    _io = io;
}

export async function broadcastAgendamentos() {
    if (!_io) return;
    try {
        const lista = await listarTodos();
        _io.of('/admin').emit('admin:agendamentos:update', lista);
    } catch (err) {
        console.error('[agendamento] broadcast falhou:', err.message);
    }
}
