import { calcularTotal } from "../services/adicionarServicoService.js";
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

    return "Por favor, forneça as informações solicitadas.\n(Digite 'menu' para voltar ao menu principal).\n(Digite 'sair' para encerrar o atendimento).";
}
