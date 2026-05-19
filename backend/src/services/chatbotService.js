import manager from "../bot/manager.js";
import { fluxoAgendamento } from "../flows/fluxoAgendamento.js";
import { fluxoAtendente } from "../flows/fluxoAtendente.js";
import { fluxoBarba } from "../flows/fluxoBarba.js";
import { fluxoCabelo } from "../flows/fluxoCabelo.js";
import { fluxoPrincipal } from "../flows/fluxoPrincipal.js";
import { getUsuario } from "../state/userState.js";


export async function responder(userId, mensagem) {
    const usuario = getUsuario(userId);

    if (usuario.etapa === "inicio") {
        const response = await manager.process("pt", mensagem);

        if (response.intent === "saudacao") {
            usuario.etapa = "menu.principal";

            return `Olá! Seja bem-vindo a Barbearia ACDKS!\nExplore os nossos serviços e marque um horário conosco.\nPara começar, escolha o que você pretende fazer em nossa barbearia:\n1 - Cabelo\n2 - Barba\n3 - Combos\n4 - Planos\n5 - Falar com um atendente`;
        }
    }

    switch (usuario.etapa) {
        case "menu.principal":
            return fluxoPrincipal(usuario, mensagem);

        case "fluxo.cabelo":
            return fluxoCabelo(usuario, mensagem);

        case "fluxo.barba":
            return fluxoBarba(usuario, mensagem);

        case "fluxo.atendente":
        case "atendente.pergunta_continuar":
            return fluxoAtendente(usuario, mensagem);

        case "atendente.fila":
            return "Você já está na fila aguardando um atendente. Aguarde um instante.";

        case "atendente.ativo":
            return "Você já está conversando com um atendente. Use o painel de mensagens para continuar.";

        case "encerrado":
            return "Atendimento encerrado. Para iniciar uma nova conversa, recarregue a página.";

        case "pedir.nome":
        case "pedir.telefone":
        case "confirmacao":
            return await fluxoAgendamento(usuario, mensagem);

        default:
            return "Desculpe, não entendi sua resposta. Pode tentar novamente ou escolher uma das opções numeradas?";
    }
}
