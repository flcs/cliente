import { v4 as uuidv4 } from 'uuid';
import { ClienteRepository } from '../../repository/cliente-repository';

interface ClienteDTO {
  nome: string;
  telefone: string;
  email: string;
  observacoes: string;
}

interface ClienteResponse {
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

  async adicionarCliente(clienteDTO: ClienteDTO): Promise<ClienteResponse | Error> {
    const novoCliente = {
      id: uuidv4(),
      ...clienteDTO,
    };

    const existe = await this.clienteRepository.buscarClientePorEmail(clienteDTO.email);
    if (existe) {
      return new Error('Email já cadastrado');
    }

    let clienteAdicionado: ClienteResponse;
    try {
      clienteAdicionado = await this.clienteRepository.adicionarCliente(novoCliente);
    } catch (error: any) {
      return new Error(`Erro ao adicionar cliente: ${error.message}`);
    }

    return clienteAdicionado;
  }
}

export { AdicionarClienteUseCase };