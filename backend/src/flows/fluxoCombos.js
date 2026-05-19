import { responder } from "../services/chatbotService.js";
import { adicionarServico } from "../services/adicionarServicoService.js";
import { fluxoPrincipal } from "./fluxoPrincipal.js";
import { isMenuRequest } from "./fluxoVoltarMenu.js";
   
export function fluxoCombos(usuario, mensagem) {
    if (isMenuRequest(mensagem)) {
        usuario.etapa = "menu.principal";
        return responder(usuario, "oi");
    }
    switch (mensagem.toString()) {
        case "1":
            adicionarServico(
                usuario,
                "Combo básico: cabelo + barba",
                85
            );
            usuario.etapa = "confirmar.servico";
            return `Excelente escolha!\nDeseja adicionar mais algum serviço? (Digite 'sim' para adicionar outro ou 'não' para finalizar)\n\n(Digite 'menu' para voltar ao menu principal)`;
          
        case "2":
            adicionarServico(
                usuario,
                "Combo básico: barba + sobrancelha",
                65
            );
            usuario.etapa = "confirmar.servico";
            return `Ótima escolha!\nDeseja adicionar mais algum serviço? (Digite 'sim' para adicionar outro ou 'não' para finalizar)\n\n(Digite 'menu' para voltar ao menu principal)`;
          
        case "3":
            adicionarServico(
                usuario,
                "Combo básico: cabelo + hidratação",
                75
            );
            usuario.etapa = "confirmar.servico";
            return `Perfeito!\nDeseja adicionar mais algum serviço? (Digite 'sim' para adicionar outro ou 'não' para finalizar)\n\n(Digite 'menu' para voltar ao menu principal)`;
          
        case "4":
            adicionarServico(
                usuario,
                "Combo intermediário: cabelo + barba + sobrancelha",
                85
            );
            usuario.etapa = "confirmar.servico";
            return `Ótima escolha!\nDeseja adicionar mais algum serviço? (Digite 'sim' para adicionar outro ou 'não' para finalizar)\n\n(Digite 'menu' para voltar ao menu principal)`;

        case "5":
            adicionarServico(
                usuario,
                "Combo intermediário: cabelo + lavagem + finalização",
                80
            );
            usuario.etapa = "confirmar.servico";
            return `Ótima escolha!\nDeseja adicionar mais algum serviço? (Digite 'sim' para adicionar outro ou 'não' para finalizar)\n\n(Digite 'menu' para voltar ao menu principal)`;
          
        case "6":
            adicionarServico(
                usuario,
                "Combo completo: cabelo + barba + hidratação + toalha quente",
                130
            );
            usuario.etapa = "confirmar.servico";
            return `Excelente escolha!\nDeseja adicionar mais algum serviço? (Digite 'sim' para adicionar outro ou 'não' para finalizar)\n\n(Digite 'menu' para voltar ao menu principal)`;
          
        case "7":
            adicionarServico(
                usuario,
                "Combo completo: cabelo + barba + sobrancelha + hidratação + lavagem",
                150
            );
            usuario.etapa = "confirmar.servico";
            return `Ótimo!\nDeseja adicionar mais algum serviço? (Digite 'sim' para adicionar outro ou 'não' para finalizar)\n\n(Digite 'menu' para voltar ao menu principal)`;
          
        case "8":
            adicionarServico(
                usuario,
                "Combo completo: barba + limpeza de pele + sobrancelha",
                85
            );
            usuario.etapa = "confirmar.servico";
            return `Boa escolha!\nDeseja adicionar mais algum serviço? (Digite 'sim' para adicionar outro ou 'não' para finalizar)\n\n(Digite 'menu' para voltar ao menu principal)`;
          
        case "9":
            return `Nossos combos combinam serviços com preço especial e atendimento completo.\nOs valores são estimados e podem variar conforme a necessidade do serviço.\nPara agendar, escolha uma das opções listadas e informe seu nome.\n\n(Digite 'menu' para voltar ao menu principal)`;
        default:
            return `Escolha uma opção válida (1 a 8) para os combos ou digite o número correspondente.\n(Digite 'menu' para voltar ao menu principal).\n(Digite 'sair' para encerrar o atendimento).`;
    }   
}

