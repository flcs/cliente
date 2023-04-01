import { PrismaClient } from '@prisma/client';
import { ICliente } from '../entity/cliente';
import { prisma as banco } from '../main/database';

class ClienteRepository {
  // private prisma: PrismaClient;

  constructor() {
    // this.prisma = new PrismaClient();
  }

  async listarClientes(): Promise<ICliente[]> {
    const clientes = await banco.cliente.findMany();
    return clientes;
  }

  async buscarClientePorId(id: string): Promise<ICliente | null> {
    const cliente = await banco.cliente.findUnique({ where: { id } });
    return cliente;
  }

  async buscarClientePorEmail(email: string): Promise<ICliente | null> {
    const cliente = await banco.cliente.findUnique({ where: { email } });
    return cliente;
  }

  async adicionarCliente(cliente: ICliente): Promise<ICliente> {
    const novoCliente = await banco.cliente.create({ data: cliente });
    return novoCliente;
  }

  async atualizarCliente(id: string, clienteAtualizado: ICliente): Promise<ICliente | null> {
    const cliente = await banco.cliente.update({
      where: { id },
      data: clienteAtualizado,
    });
    return cliente;
  }

  async removerCliente(id: string): Promise<boolean> {
    try {
      await banco.cliente.delete({ where: { id } });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export { ClienteRepository };
