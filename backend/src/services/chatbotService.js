import manager from "../bot/manager";
import { fluxoAgendamento } from "../flows/fluxoAgendamento";
import { fluxoBarba } from "../flows/fluxoBarba";
import { fluxoCabelo } from "../flows/fluxoCabelo";
import { fluxoPrincipal } from "../flows/fluxoPrincipal";
import { getUsuario } from "../state/userState";




export async function responder(
    userId,
    mensagem
) {
    const usuario = getUsuario(userId);

    if (usuario.etapa === "inicio") {
        const response = await manager.process(
            "pt",
            mensagem
        );

        if (response.intent === "saudacao") {
            usuario.etapa = "menu.principal";

            return `
                Olá! Seja bem-vindo a Barbearia ACDKS!\n
                Explore os nossos seriços e marque um horário conosco.\n
                Para começar, escolha o que você pretende fazer em nossa barbearia: \n
                1 - Cabelo\n
                2 - Barba\n
                3 - Combos\n
                4 - Planos\n
                5 - Falar com um atendente\n
            `
        }
    }

    switch(usuario.etapa) {
        
        case "menu.principal":
            return fluxoPrincipal(usuario, mensagem);
        
        case "menu.cabelo":
            return fluxoCabelo(usuario, mensagem);

        case "menu.barba":
            return fluxoBarba(usuario, mensagem);

        case "pedir.nome":
            case "pedir.telefone":
                return fluxoAgendamento(usuario, mensagem);
    }
}