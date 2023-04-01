import { ClienteRepository } from '../../repository/cliente-repository';

interface ClienteDTO {
  id: string;
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

class AtualizarClienteUseCase {
  private clienteRepository: ClienteRepository;

  constructor(clienteRepository: ClienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async atualizarCliente(clienteDTO: ClienteDTO): Promise<ClienteResponse | Error> {

    const existe = await this.clienteRepository.buscarClientePorId(clienteDTO.id);
    if (!existe) {
      return new Error('Cliente não encontrado');
    }

    const cliente = await this.clienteRepository.buscarClientePorEmail(clienteDTO.email);
    if (cliente && cliente.id !== clienteDTO.id) {
      return new Error('Email já cadastrado');
    }
    let clienteAtualizado: ClienteResponse | null;
    try {
      clienteAtualizado = await this.clienteRepository.atualizarCliente(clienteDTO.id, clienteDTO);
    } catch (error: any) {
      return new Error(error.message);
    }
    if (!clienteAtualizado) {
      return new Error('Erro ao atualizar cliente');
    }
    return clienteAtualizado;
  }
}

export { AtualizarClienteUseCase };