import { v4 as uuidv4 } from 'uuid';
import { ClienteRepository } from '../../repository/cliente-repository';

interface AdicionarClienteDTO {
  nome: string;
  telefone: string;
  email: string;
  observacoes: string;
}

interface AdicionarClienteResponse {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  observacoes: string;
}

class AdicionarClienteUseCase {
  private clienteRepository: ClienteRepository;

  constructor(clienteRepository: ClienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async adicionarCliente(clienteDTO: AdicionarClienteDTO): Promise<AdicionarClienteResponse> {
    const novoCliente = {
      id: uuidv4(),
      ...clienteDTO,
    };

    const clienteAdicionado = await this.clienteRepository.adicionarCliente(novoCliente);

    return clienteAdicionado;
  }
}

export {AdicionarClienteUseCase};