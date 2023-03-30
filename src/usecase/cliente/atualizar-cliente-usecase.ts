import { ClienteRepository } from '../../repository/cliente-repository';

interface AtualizarClienteDTO {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  observacoes: string;
}

interface AtualizarClienteResponse {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  observacoes: string;
}

class AtualizarClienteUseCase {
  private clienteRepository: ClienteRepository;

  constructor(clienteRepository: ClienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async atualizarCliente(clienteDTO: AtualizarClienteDTO): Promise<AtualizarClienteResponse | null > {
    const clienteAtualizado = await this.clienteRepository.atualizarCliente(clienteDTO.id, clienteDTO);

    return clienteAtualizado;
  }
}

export { AtualizarClienteUseCase };