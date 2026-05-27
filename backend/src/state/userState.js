// Estado do Usuario!

const usuarios = {};

export function getUsuario(id) {
    if (!usuarios[id]) {
        usuarios[id] = {
            etapa: "inicio",
            servico: null,
            servicos: [],
            nome: null,
            telefone: null,
            agendamentosCarregados: [],
            agendamentoSelecionadoId: null
        };
    }

    return usuarios[id];
}


export function resetUsuario(id) {
    delete usuarios[id];
}