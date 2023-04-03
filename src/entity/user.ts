
type tId = number;

type ColecaoId = {
    id: number;
}

interface User {
    id: number;
    username: string;
    email: string;
    hash_password: string;
    fullname?: string | null;
    telefone?: string | null;
}

export { User, tId, ColecaoId }
