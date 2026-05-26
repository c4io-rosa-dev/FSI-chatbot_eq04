import { fluxoPrincipal } from "./fluxoPrincipal.js";

export function isMenuRequest(mensagem) {
    if (!mensagem) return false;

    const texto = mensagem.trim().toLowerCase();
    const palavras = ["menu", "voltar", "menu principal", "principal", "início", "inicio"];

    return palavras.some((palavra) => texto === palavra || texto.includes(palavra));
}