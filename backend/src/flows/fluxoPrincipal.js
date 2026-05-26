

export function fluxoPrincipal(
    usuario,
    mensagem
) {
    switch (mensagem) {
        case "1":
            usuario.etapa = "fluxo.cabelo";

            return `Beleza! Estes são os tipos de corte disponíveis:\n1 - Corte Simples - R$ 35,00\n2 - Corte com acabamento - R$ 45,00\n3 - Corte Degradê - R$ 50,00\n4 - Corte Social - R$ 40,00\n5 - Mais informações\n\n(Digite 'menu' para voltar ao menu principal)`;

        case "2": 

            usuario.etapa = "fluxo.barba";

            return `Certo! Aqui estão os estilos para barba disponíveis:\n1 - Corte Simples Máquina - R$ 20,00\n2 - Corte Simples Navalha - R$ 25,00\n3 - Micropigmentação - R$ 20,00\n4 - Mais informações\n\n(Digite 'menu' para voltar ao menu principal)`;

        case "3":
            usuario.etapa = "fluxo.combos";
            return `Certo! Aqui estão os combos disponíveis:\n1 - Combo básico: cabelo + barba - R$ 85,00\n2 - Combo básico: barba + sobrancelha - R$ 65,00\n3 - Combo básico: cabelo + hidratação - R$ 75,00\n4 - Combo intermediário: cabelo + barba + sobrancelha - R$ 85,00\n5 - Combo intermediário: cabelo + lavagem + finalização - R$ 80,00\n6 - Combo completo: cabelo + barba + hidratação + toalha quente - R$ 130,00\n7 - Combo completo: cabelo + barba + sobrancelha + hidratação + lavagem - R$ 150,00\n8 - Combo completo: barba + limpeza de pele + sobrancelha - R$ 85,00\n9 - Mais informações\n\n(Digite 'menu' para voltar ao menu principal)`;

        case "4":
            usuario.etapa = "fluxo.planos";

            return `Que tal pagar uma vez por mês e ter serviços ilimitados? Conheça nossos planos:\n1 - Cabelo + barba - R$ 229\n2 - Cabelo - R$ 149\n3 - Barba - R$ 119\n4 - Mais informações\n\n(Digite 'menu' para voltar ao menu principal)`;
        
        case "5":
            usuario.etapa = "fluxo.atendente";
            
            return `Certo! Estamos redirecionando para um atendente. Para facilitar, escolha o motivo:\n1 - Dúvidas\n2 - Problemas com agendamento\n3 - Reclamação\n4 - Outro\n\n(Digite 'menu' para voltar ao menu principal)`;
    }

    return "Escolha uma opção válida (1, 2, 3, 4 ou 5).\n(Digite 'menu' para voltar ao menu principal).\n(Digite 'sair' para encerrar o atendimento)";
}
