import { consultarAgendamentos } from '../services/agendamentoService.js';
import { formatarTelefone } from '../utils/telefone.js';

function formatarData(dt) {
    if (!dt) return '';
    const d = new Date(dt);
    if (Number.isNaN(d.getTime())) return '';
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    return `${dd}/${mm} ${hh}:${mi}`;
}

function descreverAgendamento(ag, indice) {
    const nomes = ag.servicos.map((s) => s.nome).join(' + ') || 'Sem serviços';
    return `${indice} - ${nomes} (R$ ${ag.valorTotal.toFixed(2)}) — criado em ${formatarData(ag.criadoEm)}`;
}

export async function fluxoConsultarAgendamento(usuario, mensagem) {
    if (usuario.etapa === 'fluxo.consultar.telefone') {
        const { valido, agendamentos } = await consultarAgendamentos(mensagem);

        if (!valido) {
            return "Telefone inválido. Digite apenas números, com DDD (10 ou 11 dígitos).\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém)";
        }

        usuario.etapa = 'menu.principal';

        if (agendamentos.length === 0) {
            return `Não encontramos agendamentos ativos para o telefone ${formatarTelefone(mensagem)}.\n\nDigite uma opção do menu:\n1 - Cabelo\n2 - Barba\n3 - Combos\n4 - Planos\n5 - Falar com um atendente\n6 - Consultar meus agendamentos\n7 - Cancelar um agendamento`;
        }

        const lista = agendamentos.map((ag, i) => descreverAgendamento(ag, i + 1)).join('\n');
        return `Encontramos ${agendamentos.length} agendamento(s) ativo(s) para ${formatarTelefone(mensagem)}:\n${lista}\n\nDigite uma opção do menu:\n1 - Cabelo\n2 - Barba\n3 - Combos\n4 - Planos\n5 - Falar com um atendente\n6 - Consultar meus agendamentos\n7 - Cancelar um agendamento`;
    }

    return "Estado inválido no fluxo de consulta. Digite 'menu' para voltar.";
}
