import { calcularTotal } from './adicionarServicoService.js';
import {
    cancelarAgendamento as cancelarAgendamentoRepo,
    criarAgendamento as criarAgendamentoRepo,
    getPorId,
    listarAtivosPorTelefone,
    listarTodos,
} from '../repositories/agendamentoRepository.js';
import { normalizarTelefone, validarTelefone } from '../utils/telefone.js';
import { broadcastAgendamentos } from '../sockets/agendamentoNotifier.js';

export async function criarAgendamento(usuario) {
    const telefone = normalizarTelefone(usuario.telefone);
    if (!validarTelefone(telefone)) {
        throw new Error('Telefone inválido');
    }

    const servicos = usuario.servicos ?? [];
    const valorTotal = calcularTotal(servicos);

    const id = await criarAgendamentoRepo({
        telefone,
        nome: usuario.nome,
        servicos,
        valorTotal,
    });

    broadcastAgendamentos();

    return {
        id,
        nome: usuario.nome,
        telefone,
        servicos,
        valorTotal,
    };
}

export async function consultarAgendamentos(telefoneInput) {
    const telefone = normalizarTelefone(telefoneInput);
    if (!validarTelefone(telefone)) {
        return { valido: false, agendamentos: [] };
    }
    const agendamentos = await listarAtivosPorTelefone(telefone);
    return { valido: true, agendamentos };
}

export async function cancelarPeloCliente({ id }) {
    const agendamento = await getPorId(id);
    if (!agendamento || agendamento.status !== 'ativo') {
        return false;
    }
    const ok = await cancelarAgendamentoRepo({
        id,
        canceladoPor: 'cliente',
        motivo: null,
    });
    if (ok) broadcastAgendamentos();
    return ok;
}

export async function cancelarPeloAtendente({ id, motivo }) {
    const motivoTrim = (motivo ?? '').trim();
    if (!motivoTrim) {
        const err = new Error('Motivo do cancelamento é obrigatório.');
        err.code = 'MOTIVO_OBRIGATORIO';
        throw err;
    }
    const agendamento = await getPorId(id);
    if (!agendamento) {
        const err = new Error('Agendamento não encontrado.');
        err.code = 'NAO_ENCONTRADO';
        throw err;
    }
    if (agendamento.status !== 'ativo') {
        const err = new Error('Agendamento já está cancelado.');
        err.code = 'JA_CANCELADO';
        throw err;
    }
    const ok = await cancelarAgendamentoRepo({
        id,
        canceladoPor: 'atendente',
        motivo: motivoTrim,
    });
    if (ok) broadcastAgendamentos();
    return ok;
}

export { listarTodos };
