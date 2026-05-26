import { responder } from "../services/chatbotService.js";
import { adicionarServico } from "../services/adicionarServicoService.js";
import { fluxoPrincipal } from "./fluxoPrincipal.js";
import { isMenuRequest } from "./fluxoVoltarMenu.js";

export function fluxoCabelo(
    usuario,
    mensagem
) {
    if (isMenuRequest(mensagem)) {
        usuario.etapa = "menu.principal";
        return responder(usuario, "oi");
    }
    switch (mensagem) {
       
        case "1":
            adicionarServico(
                usuario,
                "Corte Simples",
                35
            );
            usuario.etapa = "confirmar.servico";

            return `Ótima escolha!\nDeseja adicionar mais algum serviço? (Digite 'sim' para adicionar outro ou 'não' para finalizar)\n\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém)`;
       
        case "2":
            adicionarServico(
                usuario,
                "Corte com acabamento",
                45
            );
            usuario.etapa = "confirmar.servico";

            return `Boa escolha!\nDeseja adicionar mais algum serviço? (Digite 'sim' para adicionar outro ou 'não' para finalizar)\n\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém)`;
       
        case "3":
            adicionarServico(
                usuario,
                "Corte Degradê",
                50
            );
            usuario.etapa = "confirmar.servico";

            return `Escolha incrível!\nDeseja adicionar mais algum serviço? (Digite 'sim' para adicionar outro ou 'não' para finalizar)\n\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém)`;
       
        case "4":
            adicionarServico(
                usuario,
                "Corte Social",
                40
            );
            usuario.etapa = "confirmar.servico";

            return `Ótima escolha!\nDeseja adicionar mais algum serviço? (Digite 'sim' para adicionar outro ou 'não' para finalizar)\n\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém)`;
        
        case "5":
            return `A duração média dos cortes é de 50 min.\nNossos profissionais são:\nGuilherme Dino\nCaio Rosa\nSamuel Goes\nTodos com mais de 5 anos de experiência em todos os tipos de corte. Nossos produtos são da maior qualidade, como máquinas da Wahl e Rovra.\n\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém)`;
        default:
            return `Escolha uma opção válida (1 a 5) para os cortes ou digite o número correspondente.\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém | Digite 'sair' para encerrar)`;
    }
}
