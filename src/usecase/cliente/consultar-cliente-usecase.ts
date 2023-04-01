import { ICliente } from '../../entity/cliente';
import { ClienteRepository } from '../../repository/cliente-repository';

class ConsultarClienteUseCase {
  constructor(private readonly clienteRepository: ClienteRepository) { }

  async listar(): Promise<ICliente[] | Error> {
    try {
      const clientes = await this.clienteRepository.listarClientes();
      return clientes;
    } catch (error: any) {
      return new Error(`Erro ao listar clientes: ${error.message}`);
    }
  }

  async consultarPorId(id: string): Promise<ICliente | Error> {
    try {
      const cliente = await this.clienteRepository.buscarClientePorId(id);
      if (!cliente) {
        return new Error('Cliente não encontrado');
      }
      return cliente;
    } catch (error: any) {
      return new Error(`Erro ao consultar cliente por id: ${error.message}`);
    }
  }

  async consultarPorEmail(email: string): Promise<ICliente | Error> {
    try {
      const cliente = await this.clienteRepository.buscarClientePorEmail(email);
      if (!cliente) {
        return new Error('Email não encontrado');
      }
      return cliente;
    } catch (error: any) {
      return new Error(`Erro ao consultar cliente por email: ${error.message}`);
    }
  }
}

export { ConsultarClienteUseCase };