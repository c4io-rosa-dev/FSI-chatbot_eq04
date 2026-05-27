import {
    cancelarPeloCliente,
    consultarAgendamentos,
} from '../services/agendamentoService.js';
import { formatarTelefone } from '../utils/telefone.js';

function descreverAgendamento(ag, indice) {
    const nomes = ag.servicos.map((s) => s.nome).join(' + ') || 'Sem serviços';
    return `${indice} - ${nomes} (R$ ${ag.valorTotal.toFixed(2)})`;
}

export async function fluxoCancelarAgendamento(usuario, mensagem) {
    if (usuario.etapa === 'fluxo.cancelar.telefone') {
        const { valido, agendamentos } = await consultarAgendamentos(mensagem);

        if (!valido) {
            return "Telefone inválido. Digite apenas números, com DDD (10 ou 11 dígitos).\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém)";
        }

        if (agendamentos.length === 0) {
            usuario.etapa = 'menu.principal';
            return `Não encontramos agendamentos ativos para o telefone ${formatarTelefone(mensagem)}.\n\nDigite uma opção do menu:\n1 - Cabelo\n2 - Barba\n3 - Combos\n4 - Planos\n5 - Falar com um atendente\n6 - Consultar meus agendamentos\n7 - Cancelar um agendamento`;
        }

        usuario.agendamentosCarregados = agendamentos.map((ag) => ({
            id: ag.id,
            servicos: ag.servicos,
            valorTotal: ag.valorTotal,
        }));
        usuario.etapa = 'fluxo.cancelar.selecao';

        const lista = agendamentos.map((ag, i) => descreverAgendamento(ag, i + 1)).join('\n');
        return `Qual agendamento você quer cancelar?\n${lista}\n\nDigite o número do agendamento.\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém)`;
    }

    if (usuario.etapa === 'fluxo.cancelar.selecao') {
        const indice = parseInt(mensagem.trim(), 10);
        const carregados = usuario.agendamentosCarregados ?? [];

        if (Number.isNaN(indice) || indice < 1 || indice > carregados.length) {
            return `Escolha um número válido entre 1 e ${carregados.length}.`;
        }

        const escolhido = carregados[indice - 1];
        usuario.agendamentoSelecionadoId = escolhido.id;
        usuario.etapa = 'fluxo.cancelar.confirmacao';

        const nomes = escolhido.servicos.map((s) => s.nome).join(' + ') || 'Sem serviços';
        return `Confirma o cancelamento de "${nomes}" (R$ ${escolhido.valorTotal.toFixed(2)})?\nDigite 'sim' para confirmar ou 'não' para voltar ao menu.`;
    }

    if (usuario.etapa === 'fluxo.cancelar.confirmacao') {
        const resp = mensagem.trim().toLowerCase();

        if (resp === 's' || resp === 'sim') {
            const id = usuario.agendamentoSelecionadoId;
            const ok = id != null ? await cancelarPeloCliente({ id }) : false;
            usuario.agendamentoSelecionadoId = null;
            usuario.agendamentosCarregados = [];
            usuario.etapa = 'menu.principal';

            const msgBase = ok
                ? 'Agendamento cancelado com sucesso!'
                : 'Não foi possível cancelar o agendamento (pode já estar cancelado).';

            return `${msgBase}\n\nDigite uma opção do menu:\n1 - Cabelo\n2 - Barba\n3 - Combos\n4 - Planos\n5 - Falar com um atendente\n6 - Consultar meus agendamentos\n7 - Cancelar um agendamento`;
        }

        if (resp === 'n' || resp === 'não' || resp === 'nao') {
            usuario.agendamentoSelecionadoId = null;
            usuario.agendamentosCarregados = [];
            usuario.etapa = 'menu.principal';
            return `Ok, cancelamento abortado.\n\nDigite uma opção do menu:\n1 - Cabelo\n2 - Barba\n3 - Combos\n4 - Planos\n5 - Falar com um atendente\n6 - Consultar meus agendamentos\n7 - Cancelar um agendamento`;
        }

        return "Não entendi. Digite 'sim' para confirmar o cancelamento ou 'não' para voltar.";
    }

    return "Estado inválido no fluxo de cancelamento. Digite 'menu' para voltar.";
}
