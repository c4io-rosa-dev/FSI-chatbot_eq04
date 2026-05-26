import { calcularTotal } from "../services/adicionarServicoService.js";
import { criarAgendamento } from "../services/agendamentoService.js";
import { isMenuRequest, isAttendentRequest } from "./fluxoVoltarMenu.js";
import { responder } from "../services/chatbotService.js";


export async function fluxoAgendamento(
    usuario,
    mensagem
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

        return `Digite seu telefone (apenas números):\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém)`;
    }

    if (usuario.etapa === "pedir.telefone") {
        usuario.telefone = mensagem;
        usuario.etapa = "confirmacao";

        const agendamento = await criarAgendamento(usuario);

        // para listar os serviços escolhidos
        const listaServicos = usuario.servicos
            .map(
                servico =>
                    `${servico.nome} - R$ ${servico.valor}`
            )
            .join("\n");

        // somar o valor total
        const total = calcularTotal(
            usuario.servicos
        );


        return `Agendado!\nNome: ${agendamento.nome}\nServiço(s) escolhido(s): ${listaServicos}\nValor total: R$ ${total}\nTelefone: ${agendamento.telefone}\n\nObrigado! Você será contatado em breve.`;
    }

    return "Por favor, forneça as informações solicitadas.\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém | Digite 'sair' para encerrar).";
}
