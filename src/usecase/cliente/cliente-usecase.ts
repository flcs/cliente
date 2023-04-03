import { Cliente, tId } from '../../entity/cliente';
import { ClienteRepository } from '../../repository/cliente-repository';

// import { v4 as uuidv4 } from 'uuid';

interface ClienteDTO {
  id: number;
  nome: string;
  telefone?: string | null;
  email: string;
  observacoes?: string | null;
}

interface ClienteResponse {
  id: number;
  nome: string;
  telefone?: string | null;
  email: string;
  observacoes?: string | null;
}

class ClienteUseCase {
  constructor(private readonly clienteRepository: ClienteRepository) { }

  async listar(): Promise<Cliente[] | Error> {
    const clientes = await this.clienteRepository.listarClientes();
    if (clientes instanceof Error) {
      return clientes;
    }
    return clientes;
  }

  async obter_quantidade_clientes(): Promise<number | Error> {
    const quantidade = await this.clienteRepository.quantidadeClientes();
    if (quantidade instanceof Error) {
      return quantidade;
    }
    return quantidade;
  }

  async consultarPorId(id: tId): Promise<Cliente | Error> {
    const cliente = await this.clienteRepository.buscarClientePorId(id);
    if (cliente instanceof Error) {
      return cliente;
    }
    if (!cliente) {
      return new Error('Cliente não encontrado');
    }
    return cliente;
  }

  async consultarPorEmail(email: string): Promise<Cliente | Error> {
    const cliente = await this.clienteRepository.buscarClientePorEmail(email);
    if (cliente instanceof Error) {
      return cliente;
    }
    if (!cliente) {
      return new Error('Email não encontrado');
    }
    return cliente;
  }


  async obter_pagina(paginaAtual: number, itensPorPagina: number): Promise<Cliente[] | Error> {
    const clientes = await this.clienteRepository.getPaginaClientes(paginaAtual, itensPorPagina);
    if (clientes instanceof Error) {
      return clientes;
    }
    return clientes;
  }

  async adicionarCliente(clienteDTO: ClienteDTO): Promise<ClienteResponse | Error> {
    let novoCliente = {
      ...clienteDTO,
    };
    // novoCliente.id = uuidv4();

    const existe = await this.clienteRepository.buscarClientePorEmail(clienteDTO.email);
    if (existe instanceof Error) {
      return existe;
    }
    if (existe) {
      return new Error('Email já cadastrado');
    }

    const clienteAdicionado = await this.clienteRepository.adicionarCliente(novoCliente);
    if (clienteAdicionado instanceof Error) {
      return clienteAdicionado;
    }
    if (!clienteAdicionado) {
      return new Error('Erro ao adicionar');
    }
    return clienteAdicionado;
  }

  async atualizarCliente(clienteDTO: ClienteDTO): Promise<ClienteResponse | Error> {

    const existe = await this.clienteRepository.buscarClientePorId(clienteDTO.id);
    if (existe instanceof Error) {
      return existe;
    }
    if (!existe) {
      return new Error('Cliente não encontrado');
    }
    const cliente = await this.clienteRepository.buscarClientePorEmail(clienteDTO.email);
    if (cliente instanceof Error) {
      return cliente;
    }
    if (cliente && (cliente.id !== clienteDTO.id)) {
      return new Error('Email já cadastrado');
    }
    const clienteAtualizado = await this.clienteRepository.atualizarCliente(clienteDTO.id, clienteDTO);
    if (clienteAtualizado instanceof Error) {
      return clienteAtualizado;
    }
    if (!clienteAtualizado) {
      return new Error('Erro ao atualizar cliente');
    }
    return clienteAtualizado;
  }

  async deletarCliente(id: tId): Promise<boolean | Error> {
    const existe = await this.clienteRepository.buscarClientePorId(id);
    if (existe instanceof Error) {
      return existe;
    }
    if (!existe) {
      return new Error('Id não encontrado');
    }
    const retorno = await this.clienteRepository.removerCliente(id);
    if (retorno instanceof Error) {
      return retorno;
    }
    if (!retorno) {
      return new Error('Erro ao remover');
    }
    return true;
  }
}

export { ClienteUseCase };
