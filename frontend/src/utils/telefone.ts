// Util compartilhado para o telefone (PK lógica do cliente).

export function normalizarTelefone(input: string): string {
  if (input == null) return '';
  return String(input).replace(/\D/g, '');
}

export function validarTelefone(input: string): boolean {
  const digitos = normalizarTelefone(input);
  return /^\d{10,11}$/.test(digitos);
}

export function mascararTelefone(input: string): string {
  const d = normalizarTelefone(input).slice(0, 11);
  if (d.length === 0) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
