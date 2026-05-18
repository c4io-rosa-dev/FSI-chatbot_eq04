import { fluxoPrincipal } from "./fluxoPrincipal.js";
import { isMenuRequest } from "./fluxoVoltarMenu.js";
   
export function fluxoCombos(usuario, mensagem) {
    if (isMenuRequest(mensagem)) {
        usuario.etapa = "menu.principal";
        return responder(usuario, "oi");
    }
    switch (mensagem) {
        case "1":
            usuario.servico = "Combo básico: cabelo + barba";
            usuario.etapa = "pedir.nome";
            return `Excelente escolha!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)\n\n(Digite 'menu' para voltar ao menu principal)`;
        case "2":
            usuario.servico = "Combo básico: barba + sobrancelha";
            usuario.etapa = "pedir.nome";
            return `Ótima escolha!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)\n\n(Digite 'menu' para voltar ao menu principal)`;
        case "3":
            usuario.servico = "Combo básico: cabelo + hidratação";
            usuario.etapa = "pedir.nome";
            return `Perfeito!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)\n\n(Digite 'menu' para voltar ao menu principal)`;
        case "4":
            usuario.servico = "Combo intermediário: cabelo + barba + sobrancelha";
            usuario.etapa = "pedir.nome";
            return `Ótima escolha!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)\n\n(Digite 'menu' para voltar ao menu principal)`;
        case "5":
            usuario.servico = "Combo completo: cabelo + barba + hidratação + toalha quente";
            usuario.etapa = "pedir.nome";
            return `Excelente escolha!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)\n\n(Digite 'menu' para voltar ao menu principal)`;
        case "6":
            usuario.servico = "Combo completo: cabelo + barba + sobrancelha + hidratação + lavagem";
            usuario.etapa = "pedir.nome";
            return `Ótimo!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)\n\n(Digite 'menu' para voltar ao menu principal)`;
        case "7":
            usuario.servico = "Combo completo: barba + limpeza de pele + sobrancelha";
            usuario.etapa = "pedir.nome";
            return `Boa escolha!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)\n\n(Digite 'menu' para voltar ao menu principal)`;
        case "8":
            return `Nossos combos combinam serviços com preço especial e atendimento completo.\nOs valores são estimados e podem variar conforme a necessidade do serviço.\nPara agendar, escolha uma das opções listadas e informe seu nome.\n\n(Digite 'menu' para voltar ao menu principal)`;
        default:
            return `Escolha uma opção válida (1 a 8) para os combos ou digite o número correspondente.\n(Digite 'menu' para voltar ao menu principal).`;
    }   
}

