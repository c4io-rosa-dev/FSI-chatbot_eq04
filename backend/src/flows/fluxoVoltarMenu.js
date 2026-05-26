import { fluxoPrincipal } from "./fluxoPrincipal.js";

export function isMenuRequest(mensagem) {
    if (!mensagem) return false;

    const texto = mensagem.trim().toLowerCase();
    const palavras = ["menu", "voltar", "menu principal", "principal", "início", "inicio"];

    return palavras.some((palavra) => texto === palavra || texto.includes(palavra));
}

export function isAttendentRequest(mensagem) {
    if (!mensagem) return false;

    const texto = mensagem.trim().toLowerCase();
    const palavras = ["atendente", "falar com atendente", "atendimento", "humano", "pessoa", "suporte", "help"];

    return palavras.some((palavra) => texto === palavra || texto.includes(palavra));
}