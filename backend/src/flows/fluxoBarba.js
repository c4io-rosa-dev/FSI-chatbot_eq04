import { fluxoPrincipal } from "./fluxoPrincipal";
import { isMenuRequest } from "./fluxoVoltarMenu";

export function fluxoBarba(
    usuario,
    mensagem
) {
    if (isMenuRequest(mensagem)) {
            usuario.etapa = "menu.principal";
            return fluxoPrincipal(usuario, mensagem);
        }
    switch(mensagem) {
        
        case "1": 
            usuario.servico = "Corte Simples Máquina";
            usuario.etapa = "pedir.nome";

            return `Boa escolha!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)`;
        case "2":
            usuario.servico = "Corte Simples Navalha";
            usuario.etapa = "pedir.nome";

            return `Ótima escolha!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)`;
        case "3":
            usuario.servico = "Micropigmentação";
            usuario.etapa = "pedir.nome";

            return `Certa escolha!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)`;
        case "4":
            return `A duração média dos cortes é de 50 min.\nNossos profissionais são:\nGuilherme Dino\nCaio Rosa\nSamuel Goes\nTodos com mais de 5 anos de experiência em todos os tipos de corte. Nossos produtos são da maior qualidade, como máquinas da Wahl e Rovra.`;
        default:
            return `Escolha uma opção válida (1 a 4) para a barba ou digite o número correspondente.`;
    }
}