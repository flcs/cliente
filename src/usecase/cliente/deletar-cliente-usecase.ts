import { ClienteRepository } from '../../repository/cliente-repository';

class DeletarClienteUseCase {
  private clienteRepository: ClienteRepository;

  constructor(clienteRepository: ClienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async deletarCliente(id: string): Promise<boolean | Error> {
    const existe = await this.clienteRepository.buscarClientePorId(id);
    if (!existe) {
      return new Error('Cliente não encontrado');
    }
    try {
      await this.clienteRepository.removerCliente(id);
    } catch (error: any) {
      return new Error(error.message);
    }
    return true;
  }
}

export { DeletarClienteUseCase };