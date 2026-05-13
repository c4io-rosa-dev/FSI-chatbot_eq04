import { criarAgendamento } from "../services/agendamentoService";


export async function fluxoAgendamento(
    usuario,
    mensagem
) {
    if (usuario.etapa === "pedir.nome") {
        usuario.nome = mensagem;
        usuario.etapa = "pedir.telefone";

        return `
            Digite seu telefone: 
        `
    }

    if (usuario.etapa === "pedir.telefone") {
        usuario.telefone = mensagem;
        usuario.etapa = "confirmacao";

        const agendamento = await criarAgendamento(usuario);

        return `
            Agendado!\n
            Nome: ${agendamento.nome}\n
            Serviço: ${agendamento.servico}\n
            Telefone: ${agendamento.telefone}\n
        `
    }
}