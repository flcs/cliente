// import { PrismaClient } from '@prisma/client';
import { Cliente, ColecaoId, tId } from '../entity/cliente';
import { prisma as banco } from '../main/database';

const MAX_REGS = Math.pow(2, 32) - 1;

class ClienteRepository {
  // private prisma: PrismaClient;

  constructor() {
    // this.prisma = new PrismaClient();
  }

  async quantidadeClientes(): Promise<tId | Error> {
    try {
      const total = await banco.cliente.count();
      return total;

    } catch (error: any) {
      return new Error(`Erro ao obter quantidade de clientes: ${error.message}`);
    }
  }

  async listarClientes(): Promise<Cliente[] | Error> {
    try {
      const clientes: Cliente[] = await banco.cliente.findMany();
      return clientes;

    } catch (error: any) {
      return new Error(`Erro ao listar clientes: ${error.message}`);
    }
  }

  async getIdsClientes(inicio = 1, quantidade = MAX_REGS): Promise<tId[] | Error> {
    try {
      const regs = await banco.cliente.findMany({
        orderBy: {
          nome: 'asc',
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
      return new Error(`Erro ao obter Ids dos clientes: ${error.message}`);
    }
  }

  async getPaginaClientes(pagina = 1, quantidade = 10): Promise<Cliente[] | Error> {
    try {
      const inicio = (pagina * (quantidade - 1)) + 1;
      const clientes: Cliente[] = await banco.cliente.findMany({
        orderBy: {
          nome: 'asc',
        },
        skip: inicio - 1,
        take: quantidade
      });
      return clientes;

    } catch (error: any) {
      return new Error(`Erro ao obter página de clientes: ${error.message}`);
    }
  }

  async getAlgunsClientes(lista: number[]): Promise<Cliente[] | Error> {
    try {
      const clientes: Cliente[] = await banco.cliente.findMany({
        where: {
          id: {
            in: lista,
          }
        }
      });
      return clientes;

    } catch (error: any) {
      return new Error(`Erro ao obter alguns clientes: ${error.message}`);
    }
  }

  async buscarClientePorId(id: tId): Promise<Cliente | null | Error> {
    try {
      let cliente = await banco.cliente.findUnique({ where: { id } });
      return cliente;

    } catch (error: any) {
      return new Error(`Erro ao buscar cliente por id: ${error.message}`);
    }
  }

  async buscarClientePorEmail(email: string): Promise<Cliente | null | Error> {
    try {
      const cliente = await banco.cliente.findUnique({ where: { email } });
      return cliente;

    } catch (error: any) {
      return new Error(`Erro ao buscar cliente por email: ${error.message}`);
    }
  }

  async adicionarCliente(data: Cliente): Promise<Cliente | Error> {
    try {
      const cliente = await banco.cliente.create({ data });
      return cliente;

    } catch (error: any) {
      return new Error(`Erro ao adicionar cliente: ${error.message}`);
    }
  }

  async atualizarCliente(id: tId, clienteNovo: Cliente): Promise<Cliente | null | Error> {
    try {
      const cliente = await banco.cliente.update({
        where: { id },
        data: clienteNovo,
      });
      return cliente;

    } catch (error: any) {
      return new Error(`Erro ao atualizar cliente: ${error.message}`);
    }
  }

  async removerCliente(id: tId): Promise<boolean | Error> {
    try {
      const reg = await banco.cliente.delete({ where: { id } });
      return (reg.id === id)

    } catch (error: any) {
      return new Error(`Erro ao remover cliente: ${error.message}`);
    }
  }
}

export { ClienteRepository };
