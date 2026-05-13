

export function fluxoCabelo(
    usuario,
    mensagem
) {
    switch (mensagem) {
        case "1":
            usuario.servico = "Corte Simples";
            usuario.etapa = "pedir.nome";

            return `Ótima escolha!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)`;
        case "2":
            usuario.servico = "Corte com acabamento";
            usuario.etapa = "pedir.nome";

            return `Boa escolha!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)`;
        case "3":
            usuario.servico = "Corte Degradê";
            usuario.etapa = "pedir.nome";

            return `Escolha incrível!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)`;
        case "4":
            usuario.servico = "Corte Social";
            usuario.etapa = "pedir.nome";

            return `Ótima escolha!\nAgora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)`;
        case "5":
            return `A duração média dos cortes é de 50 min.\nNossos profissionais são:\nGuilherme Dino\nCaio Rosa\nSamuel Goes\nTodos com mais de 5 anos de experiência em todos os tipos de corte. Nossos produtos são da maior qualidade, como máquinas da Wahl e Rovra.`;
    }
}