import { calcularTotal } from "../services/adicionarServicoService.js";
import { criarAgendamento } from "../services/agendamentoService.js";
import { isMenuRequest, isAttendentRequest } from "./fluxoVoltarMenu.js";
import { responder } from "../services/chatbotService.js";
import { formatarTelefone, validarTelefone, normalizarTelefone } from "../utils/telefone.js";
import { resetUsuario } from "../state/userState.js";


export async function fluxoAgendamento(
    usuario,
    mensagem,
    userId
) {
    // Verificar se é um comando de menu ou atendente
    if (isMenuRequest(mensagem)) {
        usuario.etapa = "menu.principal";
        return responder(usuario, "oi");
    }

    if (isAttendentRequest(mensagem) && usuario.etapa !== "atendente.fila" && usuario.etapa !== "atendente.ativo") {
        usuario.etapa = "fluxo.atendente";
        return `Entendido! Vamos conectar você com um atendente.\nPara facilitar, qual é o motivo do contato?\n1 - Dúvidas\n2 - Problemas com agendamento\n3 - Reclamação\n4 - Outro`;
    }

    if (usuario.etapa === "pedir.nome") {
        usuario.nome = mensagem;
        usuario.etapa = "pedir.telefone";

        return `Digite seu telefone (apenas números, com DDD):\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém)`;
    }

    if (usuario.etapa === "pedir.telefone") {
        if (!validarTelefone(mensagem)) {
            return "Telefone inválido. Digite apenas números, com DDD (10 ou 11 dígitos).\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém)";
        }

        usuario.telefone = normalizarTelefone(mensagem);
        usuario.etapa = "confirmacao";

        let agendamento;
        try {
            agendamento = await criarAgendamento(usuario);
        } catch (err) {
            console.error("[agendamento] erro ao criar:", err.message);
            usuario.etapa = "menu.principal";
            return "Não foi possível salvar seu agendamento agora. Tente novamente em instantes ou fale com um atendente.";
        }

        const listaServicos = agendamento.servicos
            .map((servico) => `${servico.nome} - R$ ${servico.valor}`)
            .join("\n");

        const total = calcularTotal(agendamento.servicos);

        // Resetar usuário após agendamento confirmado
        resetUsuario(userId);

        return `Agendado!\nNome: ${agendamento.nome}\nServiço(s) escolhido(s):\n${listaServicos}\nValor total: R$ ${total}\nTelefone: ${formatarTelefone(agendamento.telefone)}\n\nObrigado! Você será contatado em breve.`;
    }

    return "Por favor, forneça as informações solicitadas.\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém | Digite 'sair' para encerrar).";
}
