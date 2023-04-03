import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const clientes = [
    { nome: 'Maria', telefone: '2222-2222', email: 'maria@teste.com', observacoes: 'Cliente antigo' },
    { nome: 'João', telefone: '3333-3333', email: 'joao@teste.com', observacoes: 'Cliente novo' },
    { nome: 'Ana', telefone: '4444-4444', email: 'ana@teste.com', observacoes: 'Cliente fiel' },
    { nome: 'Pedro', telefone: '5555-5555', email: 'pedro@teste.com', observacoes: 'Cliente potencial' },
    { nome: 'Julia', telefone: '6666-6666', email: 'julia@teste.com', observacoes: 'Cliente indeciso' },
    { nome: 'Carlos', telefone: '7777-7777', email: 'carlos@teste.com', observacoes: 'Cliente exigente' },
    { nome: 'Mariana', telefone: '8888-8888', email: 'mariana@teste.com', observacoes: 'Cliente simpático' },
    { nome: 'Paulo', telefone: '9999-9999', email: 'paulo@teste.com', observacoes: 'Cliente curioso' },
    { nome: 'Camila', telefone: '1010-1010', email: 'camila@teste.com', observacoes: 'Cliente desconfiado' },
    { nome: 'Lucas', telefone: '1111-1111', email: 'lucas@teste.com', observacoes: 'Cliente recorrente' },
    { nome: 'Gabriela', telefone: '1212-1212', email: 'gabriela@teste.com', observacoes: 'Cliente entusiasmado' },
    { nome: 'Felipe', telefone: '1313-1313', email: 'felipe@teste.com', observacoes: 'Cliente crítico' },
    { nome: 'Mariano', telefone: '1414-1414', email: 'mariano@teste.com', observacoes: 'Cliente questionador' },
    { nome: 'Luana', telefone: '1515-1515', email: 'luana@teste.com', observacoes: 'Cliente perspicaz' },
    { nome: 'Rafael', telefone: '1616-1616', email: 'rafael@teste.com', observacoes: 'Cliente indeciso' },
    { nome: 'Sara', telefone: '1717-1717', email: 'sara@teste.com', observacoes: 'Cliente entusiasmado' },
    { nome: 'Diego', telefone: '1818-1818', email: 'diego@teste.com', observacoes: 'Cliente ansioso' },
    { nome: 'Renata', telefone: '1919-1919', email: 'renata@teste.com', observacoes: 'Cliente fiel' },
    { nome: 'Gustavo', telefone: '2020-2020', email: 'gustavo@teste.com', observacoes: 'Cliente curioso' },
    { nome: 'Isabela', telefone: '2121-2121', email: 'isabela@teste.com', observacoes: 'Cliente exigente' },
    { nome: 'Vinicius', telefone: '2222-2222', email: 'vinicius@teste.com', observacoes: 'Cliente curioso' },
    { nome: 'Larissa', telefone: '2323-2323', email: 'larissa@teste.com', observacoes: 'Cliente curioso' },
    { nome: 'Guilherme', telefone: '2424-2424', email: 'guilherme@teste.com', observacoes: 'Cliente curioso' }
];

async function seed() {
    for (const cliente of clientes) {
        await prisma.cliente.create({
            data: cliente,
        });
    }
}

seed()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
