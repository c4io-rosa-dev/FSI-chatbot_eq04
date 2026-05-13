

export async function criarAgendamento(usuario) {
    const agendamento = {
        nome: usuario.nome,
        telefone: usuario.telefone,
        servico: usuario.servico,
        data: usuario.data
    };

    console.log("Agendamento criado: ", agendamento);

    return agendamento;
}