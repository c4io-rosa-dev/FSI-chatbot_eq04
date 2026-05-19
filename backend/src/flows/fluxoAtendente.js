import { fluxoPrincipal } from "./fluxoPrincipal.js";
import { isMenuRequest } from "./fluxoVoltarMenu.js";

export function fluxoAtendente(usuario, mensagem) {
    if (isMenuRequest(mensagem)) {
        usuario.etapa = "menu.principal";
        return fluxoPrincipal(usuario, mensagem);
    }

    switch (mensagem) {
        case "1":
            usuario.etapa = "menu.principal";
            return `Um atendente irá entrar em contato em breve para tirar suas dúvidas.\nSe quiser, digite "menu" para voltar ao menu principal.`;
        case "2":
            usuario.etapa = "menu.principal";
            return `Entendido. Um atendente irá ajudar com o seu agendamento.\nSe quiser, digite "menu" para voltar ao menu principal.`;
        case "3":
            usuario.etapa = "menu.principal";
            return `Sua reclamação foi registrada e um atendente entrará em contato.\nSe quiser, digite "menu" para voltar ao menu principal.`;
        case "4":
            usuario.etapa = "menu.principal";
            return `Ok, vou encaminhar sua mensagem para um atendente.\nSe quiser, digite "menu" para voltar ao menu principal.`;
        default:
            return `Escolha um motivo válido para o atendente:\n1 - Dúvidas\n2 - Problemas com agendamento\n3 - Reclamação\n4 - Outro\n\nSe quiser voltar ao menu principal, digite "menu".\nSe quiser encerrar o atendimento, digite 'sair'.`;
    }
}
