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
            usuario.etapa = "pedir.nome";

            return `Ótima escolha!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)\n\n(Digite 'menu' para voltar ao menu principal)`;
       
        case "2":
            adicionarServico(
                usuario,
                "Corte com acabamento",
                45
            );
            usuario.etapa = "pedir.nome";

            return `Boa escolha!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)\n\n(Digite 'menu' para voltar ao menu principal)`;
       
        case "3":
            adicionarServico(
                usuario,
                "Corte Degradê",
                50
            );
            usuario.etapa = "pedir.nome";

            return `Escolha incrível!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)\n\n(Digite 'menu' para voltar ao menu principal)`;
       
        case "4":
            adicionarServico(
                usuario,
                "Corte Social",
                40
            );
            usuario.etapa = "pedir.nome";

            return `Ótima escolha!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)\n\n(Digite 'menu' para voltar ao menu principal)`;
        
        case "5":
            return `A duração média dos cortes é de 50 min.\nNossos profissionais são:\nGuilherme Dino\nCaio Rosa\nSamuel Goes\nTodos com mais de 5 anos de experiência em todos os tipos de corte. Nossos produtos são da maior qualidade, como máquinas da Wahl e Rovra.\n\n(Digite 'menu' para voltar ao menu principal)`;
        default:
            return `Escolha uma opção válida (1 a 5) para os cortes ou digite o número correspondente.\n(Digite 'menu' para voltar ao menu principal).\n(Digite 'sair' para encerrar o atendimento).`;
    }
}
