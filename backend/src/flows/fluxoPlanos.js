import { responder } from "../services/chatbotService.js";
import { adicionarServico } from "../services/adicionarServicoService.js";
import { fluxoPrincipal } from "./fluxoPrincipal.js";
import { isMenuRequest } from "./fluxoVoltarMenu.js";

export function fluxoPlanos(usuario, mensagem) {
    if (isMenuRequest(mensagem)) {
        usuario.etapa = "menu.principal";
        return responder(usuario, "oi");
    }

    switch (mensagem) {
        case "1":
            adicionarServico(
                usuario,
                "Plano Cabelo + barba",
                229
            );
            usuario.etapa = "pedir.nome";
            return `Ótima opção!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)\n\n(Digite 'menu' para voltar ao menu principal)`;
            
        case "2":
            adicionarServico(
                usuario,
                "Plano Cabelo",
                149
            );
            usuario.etapa = "pedir.nome";
            return `Excelente escolha!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)\n\n(Digite 'menu' para voltar ao menu principal)`;
            
        case "3":
            adicionarServico(
                usuario,
                "Plano Barba",
                119
            );
            usuario.etapa = "pedir.nome";
            return `Perfeito!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)\n\n(Digite 'menu' para voltar ao menu principal)`;
        
        case "4":
            return `Os planos oferecem serviços mensais com facilidades e prioridade no agendamento.\n1 - Cabelo + barba - R$ 229/mês\n2 - Cabelo - R$ 149/mês\n3 - Barba - R$ 119/mês\nPara contratar, escolha um dos planos acima.\n\n(Digite 'menu' para voltar ao menu principal)`;
       
        default:
            return `Escolha uma opção válida (1 a 4) para os planos ou digite o número correspondente.\n(Digite 'menu' para voltar ao menu principal).\n(Digite 'sair' para encerrar o atendimento)`;
    }
}
