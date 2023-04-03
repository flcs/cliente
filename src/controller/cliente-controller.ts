import { Request, Response } from 'express';
import { ClienteUseCase } from '../usecase/cliente/cliente-usecase';
import { Cliente } from '../entity/cliente';
import { ClienteRepository } from '../repository/cliente-repository';
import { tId } from '../entity/user';


export class ClienteController {
  private readonly clienteRepository: ClienteRepository;
  private readonly clienteUseCase: ClienteUseCase;

  constructor() {
    this.clienteRepository = new ClienteRepository();
    this.clienteUseCase = new ClienteUseCase(this.clienteRepository);
  }

  async index(req: Request, res: Response) {
    const resposta = await this.clienteUseCase.listar();
    if (!resposta) {
      return res.status(404).json({ message: 'Cliente não encontrado' }).end();
    }
    if (resposta instanceof Error) {
      return res.status(404).json({ message: resposta.message }).end();
    }

    return res.status(200).json(resposta).end();
  }

  async total(req: Request, res: Response) {
    const resposta = await this.clienteUseCase.obter_quantidade_clientes();
    if (!resposta) {
      return res.status(404).json({ message: 'Quantidade não obtida' }).end();
    }
    if (resposta instanceof Error) {
      return res.status(404).json({ message: resposta.message }).end();
    }

    return res.status(200).json({ total: resposta }).end();
  }

  async paginacao(req: Request, res: Response) {
    const pag = Number(req.params.pag) || 1;
    const itensPorPagina = Number(req.params.qtd) || 10;

    const totalItens = await this.clienteUseCase.obter_quantidade_clientes();
    if (totalItens instanceof Error) {
      return res.status(404).json({ message: totalItens.message }).end();
    }
    const totalPages = Math.ceil(totalItens / itensPorPagina);
    const clientes = await this.clienteUseCase.obter_pagina(pag, itensPorPagina);
    if (clientes instanceof Error) {
      return res.status(404).json({ message: clientes.message }).end();
    }
    return res.status(200).json({
      clientes,
      pag,
      totalPages,
      totalItens
    }).end();
  }

  private valor_id(req: Request): tId {
    let paramId: string;

    if (req.params.id) {
      paramId = req.params.id;
    } else if (req.body.id) {
      paramId = req.body.id;
    } else if (req.query.id) {
      paramId = req.query.id as string;
    } else {
      return -1;
    }
    paramId = paramId.padStart(10, "0")
    // LOGA("paramId: ", paramId);
    if (paramId > "2147483647") {
      return -2;
    }
    let clienteId: number;
    try {
      clienteId = Number(paramId);
      if (clienteId > 2147483647) {
        return -2;
      }
    } catch (error: any) {
      return -2;
    }
    if (isNaN(clienteId)) {
      return -3;
    }
    return clienteId;
  }

  private valida_Id(req: Request): string {
    const id = this.valor_id(req);
    if (id === -1) {
      return 'Id não informado';
    }
    if (id === -2 || id === -3) {
      return `Id é inválido`;
    }
    return '';
  }


  async consultarPorId(req: Request, res: Response) {
    const mensagem = this.valida_Id(req);
    if (mensagem !== '') {
      return res.status(400).json({ message: mensagem }).end();
    }
    const clienteId = this.valor_id(req);
    const resposta = await this.clienteUseCase.consultarPorId(clienteId);
    if (!resposta) {
      return res.status(404).json({ message: 'Id não encontrado' }).end();
    }
    if (resposta instanceof Error) {
      return res.status(400).json({ message: resposta.message }).end();
    }
    return res.status(200).json(resposta).end();
  }

  async consultarPorEmail(req: Request, res: Response) {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ message: 'Email não informado' }).end();
    }
    const resposta = await this.clienteUseCase.consultarPorEmail(email);
    if (!resposta) {
      return res.status(404).json({ message: 'Email não encontrado' }).end();
    }
    if (resposta instanceof Error) {
      return res.status(400).json({ message: resposta.message }).end();
    }
    return res.status(200).json(resposta).end();
  }

  async adicionarCliente(req: Request, res: Response) {
    const { nome, telefone, email, observacoes } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email não informado' }).end();
    }
    if (!nome) {
      return res.status(400).json({ message: 'Nome não informado' }).end();
    }
    const cliente = {
      nome, telefone, email, observacoes
    } as Cliente;
    const resposta = await this.clienteUseCase.adicionarCliente(cliente);
    if (resposta instanceof Error) {
      return res.status(400).json({ message: resposta.message }).end();
    }
    const clienteAdicionado = resposta as Cliente;
    return res.status(201).json(clienteAdicionado).end();
  }

  async atualizarCliente(req: Request, res: Response) {
    const mensagem = this.valida_Id(req);
    if (mensagem !== '') {
      return res.status(400).json({ message: mensagem }).end();
    }
    const id = this.valor_id(req);
    const { nome, telefone, email, observacoes } = req.body;
    let clienteAtualizado = {
      id, nome, telefone, email, observacoes
    } as Cliente;
    const cliente = await this.clienteUseCase.atualizarCliente(clienteAtualizado);
    if (cliente instanceof Error) {
      return res.status(400).json({ message: cliente.message }).end();
    }
    return res.status(200).json(cliente).end();
  }

  async deletarCliente(req: Request, res: Response) {
    const mensagem = this.valida_Id(req);
    if (mensagem !== '') {
      return res.status(400).json({ message: mensagem }).end();
    }
    const id = this.valor_id(req);
    const retorno = await this.clienteUseCase.deletarCliente(id);
    if (retorno instanceof Error) {
      return res.status(400).json({ message: retorno.message }).end();
    }
    if (!retorno) {
      return res.status(404).json({ message: 'Id não encontrado' }).end();
    }
    return res.status(204).send('Apagado com sucesso').end();
  }
}

