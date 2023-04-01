import { ICliente } from '../../entity/cliente';
import { ClienteRepository } from '../../repository/cliente-repository';

import { v4 as uuidv4 } from 'uuid';

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

class ClienteUseCase {
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

  async adicionarCliente(clienteDTO: ClienteDTO): Promise<ClienteResponse | Error> {
    let novoCliente = {
      ...clienteDTO,
    };
    novoCliente.id = uuidv4();

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

export { ClienteUseCase };
