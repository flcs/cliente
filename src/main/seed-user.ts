import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
    { username: 'maria', fullname: 'Maria', email: 'maria@teste.com', hash_password: '123456', telefone: '2222-2222' },
    { username: 'joao', fullname: 'João', email: 'joao@teste.com', hash_password: '123456', telefone: '3333-3333' },
    { username: 'ana', fullname: 'Ana', email: 'ana@teste.com', hash_password: '123456', telefone: '4444-4444' },
    { username: 'pedro', fullname: 'Pedro', email: 'pedro@teste.com', hash_password: '123456', telefone: '5555-5555' },
    { username: 'julia', fullname: 'Julia', email: 'julia@teste.com', hash_password: '123456', telefone: '6666-6666' },
    { username: 'carlos', fullname: 'Carlos', email: 'carlos@teste.com', hash_password: '123456', telefone: '7777-7777' },
    { username: 'mariana', fullname: 'Mariana', email: 'mariana@teste.com', hash_password: '123456', telefone: '8888-8888' },
    { username: 'paulo', fullname: 'Paulo', email: 'paulo@teste.com', hash_password: '123456', telefone: '9999-9999' },
    { username: 'camila', fullname: 'Camila', email: 'camila@teste.com', hash_password: '123456', telefone: '1010-1010' },
    { username: 'lucas', fullname: 'Lucas', email: 'lucas@teste.com', hash_password: '123456', telefone: '1111-1111' },
    { username: 'gabriela', fullname: 'Gabriela', email: 'gabriela@teste.com', hash_password: '123456', telefone: '1212-1212' },
    { username: 'felipe', fullname: 'Felipe', email: 'felipe@teste.com', hash_password: '123456', telefone: '1313-1313' },
    { username: 'mariano', fullname: 'Mariano', email: 'mariano@teste.com', hash_password: '123456', telefone: '1414-1414' },
    { username: 'luana', fullname: 'Luana', email: 'luana@teste.com', hash_password: '123456', telefone: '1515-1515' },
    { username: 'rafael', fullname: 'Rafael', email: 'rafael@teste.com', hash_password: '123456', telefone: '1616-1616' },
    { username: 'sara', fullname: 'Sara', email: 'sara@teste.com', hash_password: '123456', telefone: '1717-1717' },
    { username: 'diego', fullname: 'Diego', email: 'diego@teste.com', hash_password: '123456', telefone: '1818-1818' },
    { username: 'renata', fullname: 'Renata', email: 'renata@teste.com', hash_password: '123456', telefone: '1919-1919' },
    { username: 'gustavo', fullname: 'Gustavo', email: 'gustavo@teste.com', hash_password: '123456', telefone: '2020-2020' },
    { username: 'isabela', fullname: 'Isabela', email: 'isabela@teste.com', hash_password: '123456', telefone: '2121-2121' },
    { username: 'vinicius', fullname: 'Vinicius', email: 'vinicius@teste.com', hash_password: '123456', telefone: '2222-2222' },
    { username: 'larissa', fullname: 'Larissa', email: 'larissa@teste.com', hash_password: '123456', telefone: '2323-2323' },
    { username: 'guilherme', fullname: 'Guilherme', email: 'guilherme@teste.com', hash_password: '123456', telefone: '2424-2424' }
];

async function seed() {
    for (const user of users) {
        await prisma.user.create({
            data: user,
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
