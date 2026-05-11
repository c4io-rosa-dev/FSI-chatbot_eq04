

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

            `;

        case "4":
            usuario.etapa = "fluxo.planos";

            // ADICIONAR PLANOS
            return `
            
            `;
        
        case "5":
            usuario.etapa = "fluxo.atendente";

            // ADICIONAR ATENDENTE
            return `
            
            `;
    }

    return "Escolha uma opção válida";
}