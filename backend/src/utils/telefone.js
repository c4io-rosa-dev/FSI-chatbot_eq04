// Util compartilhado para o telefone (PK lógica do cliente em todo o sistema).
// Telefone é persistido sempre normalizado (só dígitos, 10 ou 11).

export function normalizarTelefone(input) {
    if (input == null) return '';
    return String(input).replace(/\D/g, '');
}

export function validarTelefone(input) {
    const digitos = normalizarTelefone(input);
    return /^\d{10,11}$/.test(digitos);
}

export function formatarTelefone(input) {
    const d = normalizarTelefone(input);
    if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return d;
}
