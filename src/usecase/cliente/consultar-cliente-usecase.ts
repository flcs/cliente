import { ClienteRepository } from '../../repository/cliente-repository';

class ConsultarClienteUseCase {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  async consultarPorId(id: string) {
    try {
      const cliente = await this.clienteRepository.buscarClientePorId(id);
      return cliente;
    } catch (error) {
      throw new Error(`Erro ao consultar cliente por id: ${error.message}`);
    }
  }

  async consultarPorEmail(email: string) {
    try {
      const cliente = await this.clienteRepository.buscarClientePorEmail(email);
      return cliente;
    } catch (error) {
      throw new Error(`Erro ao consultar cliente por email: ${error.message}`);
    }
  }
}

export { ConsultarClienteUseCase };