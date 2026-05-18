import { criarAgendamento } from "../services/agendamentoService.js";


export async function fluxoAgendamento(
    usuario,
    mensagem
) {
    if (usuario.etapa === "pedir.nome") {
        usuario.nome = mensagem;
        usuario.etapa = "pedir.telefone";

        return `Digite seu telefone (apenas números):\n(Digite 'menu' para voltar ao menu principal)`;
    }

    if (usuario.etapa === "pedir.telefone") {
        usuario.telefone = mensagem;
        usuario.etapa = "confirmacao";

        const agendamento = await criarAgendamento(usuario);

        return `Agendado!\nNome: ${agendamento.nome}\nServiço: ${agendamento.servico}\nTelefone: ${agendamento.telefone}\n\nObrigado! Você será contatado em breve.`;
    }

    return "Por favor, forneça as informações solicitadas.\n(Digite 'menu' para voltar ao menu principal)";
}