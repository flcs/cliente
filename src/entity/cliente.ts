
interface Cliente {
    id: number;
    nome: string;
    telefone?: string | null;
    email: string;
    observacoes?: string | null;
}

export { Cliente }
