

export function fluxoPrincipal(
    usuario,
    mensagem
) {
    switch (mensagem) {
        case "1":
            usuario.etapa = "fluxo.cabelo";

            return `
                Beleza! Estes são os tipos de corte disponíveis: \n
                1 - Corte Simples - R$ 35,00\n
                2 - Corte com acabamento - R$ 45,00\n
                3 - Corte Degradê - R$ 50,00\n
                4 - Corte Social - R$ 40,00\n
                5 - Mais informações
            `;

        case "2": 

            usuario.etapa = "fluxo.barba";

            return `
                Certo! Aqui estão os estilos para barba disponíveis: \n
                1 - Corte Simples Máquina - R$ 20,00\n
                2 - Corte Simples Navalha - R$ 25,00\n
                3 - Micropigmentação - R$ 20,00\n
                4 - Mais informações\n
            `;

        case "3":
            usuario.etapa = "fluxo.combos";
            // ADICIONAR COMBOS
            return `
                Certo! Aqui estão os combos disponíveis para escolher. Os preços variam de acordo com o tipo de procedimento: \n
                1 - Combo básico: cabelo + barba - R$ 75,00 a R$ 85,00\n
                2 - Combo básico: barba + sobrancelha - R$ 45,00 a R$ 65,00\n
                3 - Combo básico: cabelo + hidratação - R$ 65,00\ a R$ 75,00\n
                4 - Combo básico: cabelo + lavagem + finalização - R$ 70,00 a R$ 80,00\n
                5 - Combo intermediário: cabelo + barba + sobrancelha - R$ 75,00 a R$ 85,00\n
                6 - Combo completo: cabelo + barba + hidratação + toalha quente - R$ 110,00 a R$ 130,00\n
                7 - Combo completo: cabelo + barba + sobrancelha + hidratação + lavagem - R$ 125,00 a R$ 150,00\n
                8 - Combo completo: barba + limpeza de pele + sobrancelha - R$ 75,00 a R$ 85,00\n
                9 - Mais informações\n
            `;

        case "4":
            usuario.etapa = "fluxo.planos";

            // ADICIONAR PLANOS
            return `
                Que tal pagar uma vez por mês e ter serviços ilimitados? Conheça nossos planos: \n
                1 - Cabelo + barba - R$ 229,99\n
                2 - Cabelo - R$ 149,99\n
                3 - Barba - R$ 119,99\n
                4 - Mais informações\n
            `;
        
        case "5":
            usuario.etapa = "fluxo.atendente";
            
            // ADICIONAR ATENDENTE
            return `
                Certo! Estamos redirecionando para um atendente. Para facilitar, escolha o motivo do contato: \n
                1 - Dúvidas\n
                2 - Problemas com agendamento\n
                3 - Reclamação\n
                4 - Outro\n
            `;
    }

    return "Escolha uma opção válida";
}
