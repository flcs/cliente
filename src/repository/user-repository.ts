// import { PrismaClient } from '@prisma/client';
import { User, ColecaoId, tId } from '../entity/user';
import { prisma as banco } from '../main/database';

const MAX_REGS = Math.pow(2, 32) - 1;

class UserRepository {
  // private prisma: PrismaClient;

  constructor() {
    // this.prisma = new PrismaClient();
  }

  async quantidadeUsers(): Promise<tId | Error> {
    try {
      const total = await banco.user.count();
      return total;

    } catch (error: any) {
      return new Error(`Erro ao obter quantidade de users: ${error.message}`);
    }
  }

  async listarUsers(): Promise<User[] | Error> {
    try {
      const users: User[] = await banco.user.findMany();
      return users;

    } catch (error: any) {
      return new Error(`Erro ao listar users: ${error.message}`);
    }
  }

  async getIdsUsers(inicio = 1, quantidade = MAX_REGS): Promise<tId[] | Error> {
    try {
      const regs = await banco.user.findMany({
        orderBy: {
          username: 'asc',
        },
        skip: inicio - 1,
        take: quantidade,
        select: {
          id: true
        }
      });
      const ids = regs.map((reg) => {
        return reg.id;
      });
      return ids;

    } catch (error: any) {
      return new Error(`Erro ao obter Ids dos users: ${error.message}`);
    }
  }

  async getPaginaUsers(pagina = 1, quantidade = 10): Promise<User[] | Error> {
    try {
      const inicio = (pagina * (quantidade - 1)) + 1;
      const users: User[] = await banco.user.findMany({
        orderBy: {
          username: 'asc',
        },
        skip: inicio - 1,
        take: quantidade
      });
      return users;

    } catch (error: any) {
      return new Error(`Erro ao obter página de users: ${error.message}`);
    }
  }

  async getAlgunsUsers(lista: number[]): Promise<User[] | Error> {
    try {
      const users: User[] = await banco.user.findMany({
        where: {
          id: {
            in: lista,
          }
        }
      });
      return users;

    } catch (error: any) {
      return new Error(`Erro ao obter alguns users: ${error.message}`);
    }
  }

  async buscarUserPorId(id: tId): Promise<User | null | Error> {
    try {
      let user = await banco.user.findUnique({ where: { id } });
      return user;

    } catch (error: any) {
      return new Error(`Erro ao buscar user por id: ${error.message}`);
    }
  }

  async buscarUserPorEmail(email: string): Promise<User | null | Error> {
    try {
      const user = await banco.user.findUnique({ where: { email } });
      return user;

    } catch (error: any) {
      return new Error(`Erro ao buscar user por email: ${error.message}`);
    }
  }

  async buscarUserPorUsername(username: string): Promise<User | null | Error> {
    try {
      const user = await banco.user.findUnique({ where: { username } });
      return user;

    } catch (error: any) {
      return new Error(`Erro ao buscar user por username: ${error.message}`);
    }
  }

  async adicionarUser(data: User): Promise<User | Error> {
    try {
      const user = await banco.user.create({ data });
      return user;

    } catch (error: any) {
      return new Error(`Erro ao adicionar user: ${error.message}`);
    }
  }

  async atualizarUser(id: tId, userNovo: User): Promise<User | null | Error> {
    try {
      const user = await banco.user.update({
        where: { id },
        data: userNovo,
      });
      return user;

    } catch (error: any) {
      return new Error(`Erro ao atualizar user: ${error.message}`);
    }
  }

  async removerUser(id: tId): Promise<boolean | Error> {
    try {
      const reg = await banco.user.delete({ where: { id } });
      return (reg.id === id)

    } catch (error: any) {
      return new Error(`Erro ao remover user: ${error.message}`);
    }
  }

  async verificaUsernamePassword(username: string, hash_password: string): Promise<boolean | Error> {
    let ok;
    try {
      ok = await banco.user.findMany({
        where: {
          AND: [
            { username: username },
            { hash_password: hash_password }
          ]
        }
      });
      ok = (ok.length === 1);
    } catch (error: any) {
      return new Error(`Erro ao verificar username e password: ${error.message}`);
    }
    return ok;
  }
}

export { UserRepository };
