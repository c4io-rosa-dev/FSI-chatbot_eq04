import manager from "../bot/manager.js";
import { fluxoAgendamento } from "../flows/fluxoAgendamento.js";
import { fluxoAtendente } from "../flows/fluxoAtendente.js";
import { fluxoBarba } from "../flows/fluxoBarba.js";
import { fluxoCabelo } from "../flows/fluxoCabelo.js";
import { fluxoCancelarAgendamento } from "../flows/fluxoCancelarAgendamento.js";
import { fluxoCombos } from "../flows/fluxoCombos.js";
import { fluxoConsultarAgendamento } from "../flows/fluxoConsultarAgendamento.js";
import { fluxoPlanos } from "../flows/fluxoPlanos.js";
import { fluxoPrincipal } from "../flows/fluxoPrincipal.js";
import { getUsuario, resetUsuario } from "../state/userState.js";
import { isAttendentRequest, isMenuRequest } from "../flows/fluxoVoltarMenu.js";


export async function responder(userId, mensagem) {
    const usuario = getUsuario(userId);


    // encerra atendimento qualquer hora
    if (
        mensagem.toLowerCase() === "sair"
    ) {
        resetUsuario(userId);
        return `Atendimento encerrado com sucesso!\nQuando quiser iniciar novamente, envie "oi".`;
    }

    // comando para chamar atendente
    if (isAttendentRequest(mensagem) && usuario.etapa !== "atendente.fila" && usuario.etapa !== "atendente.ativo") {
        usuario.etapa = "fluxo.atendente";
        return `Entendido! Vamos conectar você com um atendente.\nPara facilitar, qual é o motivo do contato?\n1 - Dúvidas\n2 - Problemas com agendamento\n3 - Reclamação\n4 - Outro`;
    }
    
    if (usuario.etapa === "inicio") {
        const response = await manager.process("pt", mensagem);

        if (response.intent === "saudacao") {
            usuario.etapa = "menu.principal";

            // inicia atendimento com lista de serviços zerada
            usuario.servicos = [];

            return `Olá! Seja bem-vindo a Barbearia ACDKS!\nExplore os nossos serviços e marque um horário conosco.\nPara começar, escolha o que você pretende fazer em nossa barbearia:\n1 - Cabelo\n2 - Barba\n3 - Combos\n4 - Planos\n5 - Falar com um atendente\n6 - Consultar meus agendamentos\n7 - Cancelar um agendamento`;
        }
    }

    switch (usuario.etapa) {
        case "menu.principal":
            return fluxoPrincipal(usuario, mensagem);

        case "fluxo.cabelo":
            return fluxoCabelo(usuario, mensagem);

        case "fluxo.barba":
            return fluxoBarba(usuario, mensagem);
        
        case "fluxo.combos":
            return fluxoCombos(usuario, mensagem);

        case "fluxo.planos":
            return fluxoPlanos(usuario, mensagem);

        case "fluxo.consultar.telefone":
            return fluxoConsultarAgendamento(usuario, mensagem);

        case "fluxo.cancelar.telefone":
        case "fluxo.cancelar.selecao":
        case "fluxo.cancelar.confirmacao":
            return fluxoCancelarAgendamento(usuario, mensagem);

        case "fluxo.atendente":
            return fluxoAtendente(usuario, mensagem);

        case "confirmar.servico":
            const respostaMenu = mensagem.toLowerCase().trim();
            if (respostaMenu === "sim" || respostaMenu === "s") {
                usuario.etapa = "menu.principal";
                return responder(usuario, "oi");
            } else if (respostaMenu === "não" || respostaMenu === "nao" || respostaMenu === "n") {
                usuario.etapa = "pedir.nome";
                return "Perfeito! Agora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)\n\n(Digite 'menu' para voltar ao menu | Digite 'atendente' para falar com alguém)";
            } else {
                return "Por favor, digite 'sim' para adicionar mais serviços ou 'não' para finalizar o agendamento.";
            }

        case "fluxo.atendente":
        case "atendente.pergunta_continuar":
            return fluxoAtendente(usuario, mensagem);

        case "atendente.fila":
            return "Você já está na fila aguardando um atendente. Aguarde um instante.";

        case "atendente.ativo":
            return "Você já está conversando com um atendente. Use o painel de mensagens para continuar.";

        case "encerrado":
            // Resetar o usuário para que ele possa conversar novamente
            resetUsuario(userId);
            return await responder(userId, "oi");

        case "pedir.nome":
        case "pedir.telefone":
        case "confirmacao":
            return await fluxoAgendamento(usuario, mensagem, userId);

        default:
            return "Desculpe, não entendi sua resposta. Pode tentar novamente ou escolher uma das opções numeradas?";
    }
}
