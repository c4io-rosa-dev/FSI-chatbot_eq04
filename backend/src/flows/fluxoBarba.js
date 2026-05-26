import { responder } from "../services/chatbotService.js";
import { adicionarServico } from "../services/adicionarServicoService.js";
import { fluxoPrincipal } from "./fluxoPrincipal.js";
import { isMenuRequest } from "./fluxoVoltarMenu.js";

export function fluxoBarba(
    usuario,
    mensagem
) {
    if (isMenuRequest(mensagem)) {
        usuario.etapa = "menu.principal";
        return responder(usuario, "oi");
    }
    switch(mensagem) {
        
        case "1": 
            
            adicionarServico(
                usuario,
                "Corte Simples Máquina",
                20
            );
            usuario.etapa = "confirmar.servico";

            return `Boa escolha!\nDeseja adicionar mais algum serviço? (Digite 'sim' para adicionar outro ou 'não' para finalizar)\n\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém)`;
            
        case "2":
            
             adicionarServico(
                usuario,
                "Corte Simples Navalha",
                25
            );

            usuario.etapa = "confirmar.servico";

            return `Ótima escolha!\nDeseja adicionar mais algum serviço? (Digite 'sim' para adicionar outro ou 'não' para finalizar)\n\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém)`;
            
        case "3":

            adicionarServico(
                usuario,
                "Micropigmentação",
                20
            );
            
            usuario.etapa = "confirmar.servico";

            return `Certa escolha!\nDeseja adicionar mais algum serviço? (Digite 'sim' para adicionar outro ou 'não' para finalizar)\n\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém)`;
        case "4":
            return `A duração média dos cortes é de 50 min.\nNossos profissionais são:\nGuilherme Dino\nCaio Rosa\nSamuel Goes\nTodos com mais de 5 anos de experiência em todos os tipos de corte. Nossos produtos são da maior qualidade, como máquinas da Wahl e Rovra.\n\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém)`;
        default:
            return `Escolha uma opção válida (1 a 4) para a barba ou digite o número correspondente.\n(Digite 'menu' para voltar | Digite 'atendente' para falar com alguém | Digite 'sair' para encerrar)`;
    }
}
