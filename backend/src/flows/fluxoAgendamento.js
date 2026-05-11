

export function fluxoAgendamento(
    usuario,
    mensagem
) {
    if (usuario.etapa === "pedir.nome") {
        usuario.nome = mensagem;
        usuario.etapa = "pedir.telefone";

        return `
            Digite seu telefone: 
        `
    }

    if (usuario.etapa === "pedir.telefone") {
        usuario.telefone = mensagem;
        usuario.etapa = "confirmacao";

        return `
            Agendado!\n
            Nome: ${usuario.nome}\n
            Serviço: ${usuario.servico}\n
            Telefone: ${usuario.telefone}\n
        `
    }
}