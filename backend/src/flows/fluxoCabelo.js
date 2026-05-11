

export function fluxoCabelo(
    usuario,
    mensagem
) {
    switch (mensagem) {
        case "1":
            usuario.servico = "Corte Simples";
            usuario.etapa = "pedir.nome";

            return `
                Ótima escolha!\n
                Agora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)
            `
        case "2":
            usuario.servico = "Corte com acabamento";
            usuario.etapa = "pedir.nome";

            return `
                Boa escolha!\n
                Agora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)
            `
        case "3":
            usuario.servico = "Corte Degradê";
            usuario.etapa = "pedir.nome";

            return `
                Escolha incrível!\n
                Agora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)
            `
        case "4":
            usuario.servico = "Corte Social";
            usuario.etapa = "pedir.nome";

            return `
                Ótima escolha!\n
                Agora, para finalizarmos o agendamento me diga seu nome (digite apenas seu nome)
            `
        case "5":
            return `
                A duração média dos cortes é de 50 min.\n
                Nossos profissionais são:\n
                Guilherme Dino\n
                Caio Rosa\n
                Samuel Goes\n
                Todos com mais de 5 anos de experiência em todos os tipos de corte. Nossos produtos são da maior qualidade, como maquinas da Wahl e Rovra. 
            `
    }
}