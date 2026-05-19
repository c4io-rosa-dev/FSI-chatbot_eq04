import manager from "../bot/manager.js";
import { fluxoAgendamento } from "../flows/fluxoAgendamento.js";
import { fluxoBarba } from "../flows/fluxoBarba.js";
import { fluxoCabelo } from "../flows/fluxoCabelo.js";
import { fluxoCombos } from "../flows/fluxoCombos.js";
import { fluxoPlanos } from "../flows/fluxoPlanos.js";
import { fluxoPrincipal } from "../flows/fluxoPrincipal.js";
import { fluxoAtendente } from "../flows/fluxoAtendente.js";
import { getUsuario } from "../state/userState.js";



export async function responder(
    userId,
    mensagem
) {
    const usuario = getUsuario(userId);


    // colocando comando global para encerrar atendimento
    if (
        mensagem.toLowerCase() === "sair"
    ) {

        usuario.etapa = "inicio";
        usuario.nome = null;
        usuario.telefone = null;
        usuario.servicos = [];

        return `Atendimento encerrado com sucesso!\nQuando quiser iniciar novamente, envie "oi".`;
    }
    
    if (usuario.etapa === "inicio") {
        const response = await manager.process(
            "pt",
            mensagem
        );

        if (response.intent === "saudacao") {
            usuario.etapa = "menu.principal";

            // inicia atendimento com lista de serviços zerada
            usuario.servicos = [];

            return `Olá! Seja bem-vindo a Barbearia ACDKS!\nExplore os nossos serviços e marque um horário conosco.\nPara começar, escolha o que você pretende fazer em nossa barbearia:\n1 - Cabelo\n2 - Barba\n3 - Combos\n4 - Planos\n5 - Falar com um atendente`;
        }
    }

    switch(usuario.etapa) {
        
        case "menu.principal":
            return fluxoPrincipal(usuario, mensagem);
        
        case "fluxo.cabelo":
            return fluxoCabelo(usuario, mensagem);

        case "fluxo.barba":
            return fluxoBarba(usuario, mensagem);
        
        case "fluxo.combo":
            return fluxoCombos(usuario, mensagem);

        case "fluxo.planos":
            return fluxoPlanos(usuario, mensagem);

        case "fluxo.atendente":
            return fluxoAtendente(usuario, mensagem);

        case "confirmar.servico":
            const respostaMenu = mensagem.toLowerCase().trim();
            if (respostaMenu === "sim" || respostaMenu === "s") {
                usuario.etapa = "menu.principal";
                return responder(usuario, "oi");
            } else if (respostaMenu === "não" || respostaMenu === "nao" || respostaMenu === "n") {
                usuario.etapa = "pedir.nome";
                return "Perfeito! Agora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)";
            } else {
                return "Por favor, digite 'sim' para adicionar mais serviços ou 'não' para finalizar o agendamento.";
            }

        case "pedir.nome":
        case "pedir.telefone":
        case "confirmacao":
            return await fluxoAgendamento(usuario, mensagem);

        default:
            return "Desculpe, não entendi sua resposta. Pode tentar novamente ou escolher uma das opções numeradas?";
    }
}
