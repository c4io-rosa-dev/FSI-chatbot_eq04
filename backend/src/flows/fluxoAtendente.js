const MOTIVOS = {
    "1": "Dúvidas",
    "2": "Problemas com agendamento",
    "3": "Reclamação",
    "4": "Outro",
};

const MENU_PRINCIPAL = `Olá novamente! Escolha o que você pretende fazer em nossa barbearia:\n1 - Cabelo\n2 - Barba\n3 - Combos\n4 - Planos\n5 - Falar com um atendente`;

export function fluxoAtendente(usuario, mensagem) {
    if (usuario.etapa === "fluxo.atendente") {
        const motivoTexto = MOTIVOS[mensagem.trim()];

        if (!motivoTexto) {
            return "Escolha um motivo válido (1, 2, 3 ou 4).";
        }

        usuario.motivo = motivoTexto;
        usuario.etapa = "atendente.fila";

        return `Entendido! Encaminhamos seu pedido (${motivoTexto}) a um atendente. Aguarde um instante, normalmente respondemos em poucos segundos.`;
    }

    if (usuario.etapa === "atendente.pergunta_continuar") {
        const resposta = mensagem.trim().toLowerCase();

        if (resposta === "s" || resposta === "sim") {
            usuario.etapa = "menu.principal";
            usuario.servico = null;
            usuario.motivo = null;
            return MENU_PRINCIPAL + "\n\n(Digite 'atendente' a qualquer momento para falar com alguém)";
        }

        if (resposta === "n" || resposta === "não" || resposta === "nao") {
            usuario.etapa = "encerrado";
            return "Obrigado por usar nosso atendimento! Tenha um ótimo dia.";
        }

        return "Não entendi. Posso ajudar com mais alguma coisa? (s/n)";
    }

    return "Estado de atendimento inválido. Tente novamente.";
}
