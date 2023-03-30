import { ClienteRepository } from '../../repository/cliente-repository';

class DeletarClienteUseCase {
  private clienteRepository: ClienteRepository;

  constructor(clienteRepository: ClienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async deletarCliente(id: string): Promise<void> {
    await this.clienteRepository.removerCliente(id);
  }
}

export {DeletarClienteUseCase};