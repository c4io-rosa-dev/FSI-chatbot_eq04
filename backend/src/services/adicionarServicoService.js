export function adicionarServico(
    usuario,
    nome,
    valor
) {
    // para criar a lista de servicos
    if (!usuario.servicos) {
        usuario.servicos = [];
    }

    // adiciona o serviço no array
    usuario.servicos.push({
        nome,
        valor
    });
}

export function calcularTotal(servicos) {
    return servicos.reduce(
        (total, servico) => total + servico.valor,
        0
    );
}
