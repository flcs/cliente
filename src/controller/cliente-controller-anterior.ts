import { Request, Response } from 'express';
import { AdicionarClienteUseCase } from '../usecase/cliente/adicionar-cliente-usecase';
import { AtualizarClienteUseCase } from '../usecase/cliente/atualizar-cliente-usecase';
import { DeletarClienteUseCase } from '../usecase/cliente/deletar-cliente-usecase';
import { ConsultarClienteUseCase } from '../usecase/cliente/consultar-cliente-usecase';
import { ICliente } from '../entity/cliente';
import { ClienteRepository } from '../repository/cliente-repository';

export class ClienteController {
  private readonly clienteRepository: ClienteRepository;
  private readonly adicionarClienteUseCase: AdicionarClienteUseCase;
  private readonly atualizarClienteUseCase: AtualizarClienteUseCase;
  private readonly deletarClienteUseCase: DeletarClienteUseCase;
  private readonly consultarClienteUseCase: ConsultarClienteUseCase;

  constructor() {
    this.clienteRepository = new ClienteRepository();
    this.adicionarClienteUseCase = new AdicionarClienteUseCase(this.clienteRepository);
    this.atualizarClienteUseCase = new AtualizarClienteUseCase(this.clienteRepository);
    this.deletarClienteUseCase = new DeletarClienteUseCase(this.clienteRepository);
    this.consultarClienteUseCase = new ConsultarClienteUseCase(this.clienteRepository);
  }

  async index(req: Request, res: Response) {
    const resposta = await this.consultarClienteUseCase.listar();
    if (!resposta) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    if (resposta instanceof Error) {
      return res.status(404).json({ message: resposta.message });
    }

    return res.status(200).json(resposta);
  }

  async consultarPorId(req: Request, res: Response) {
    try {
      const cliente = await this.consultarClienteUseCase.consultarPorId(req.params.id);

      if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      return res.status(200).json(cliente);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao consultar cliente' });
    }
  }

  async consultarPorEmail(req: Request, res: Response) {
    try {
      const cliente = await this.consultarClienteUseCase.consultarPorEmail(req.params.email);

      if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      return res.status(200).json(cliente);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao consultar cliente' });
    }
  }

  async adicionarCliente(req: Request, res: Response) {
    const cliente = req.body as ICliente;

    const resposta = await this.adicionarClienteUseCase.adicionarCliente(cliente);
    if (resposta instanceof Error) {
      console.log(resposta.message)
      return res.status(400).json({ message: resposta.message });
    }

    const clienteAdicionado = resposta as ICliente;
    return res.status(201).json(clienteAdicionado);
  }

  async atualizarCliente(req: Request, res: Response) {
    try {
      const clienteAtualizado = req.body as ICliente;
      const cliente = await this.atualizarClienteUseCase.atualizarCliente(clienteAtualizado);
      return res.status(200).json(cliente);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao atualizar cliente' });
    }
  }

  async deletarCliente(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.deletarClienteUseCase.deletarCliente(id);
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao deletar cliente' });
    }
  }

}
