import { Request, Response } from 'express';
import { UserUseCase } from '../usecase/user/user-usecase';
import { User, tId } from '../entity/user';
import { UserRepository } from '../repository/user-repository';


export class UserController {
  private readonly userRepository: UserRepository;
  private readonly userUseCase: UserUseCase;

  constructor() {
    this.userRepository = new UserRepository();
    this.userUseCase = new UserUseCase(this.userRepository);
  }

  async index(req: Request, res: Response) {
    const resposta = await this.userUseCase.listar();
    if (!resposta) {
      return res.status(404).json({ message: 'User não encontrado' }).end();
    }
    if (resposta instanceof Error) {
      return res.status(404).json({ message: resposta.message }).end();
    }
    return res.status(200).json(resposta).end();
  }

  async total(req: Request, res: Response) {
    const resposta = await this.userUseCase.obter_quantidade_users();
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

    const totalItens = await this.userUseCase.obter_quantidade_users();
    if (totalItens instanceof Error) {
      return res.status(404).json({ message: totalItens.message }).end();
    }
    const totalPages = Math.ceil(totalItens / itensPorPagina);
    const users = await this.userUseCase.obter_pagina(pag, itensPorPagina);
    if (users instanceof Error) {
      return res.status(404).json({ message: users.message }).end();
    }
    return res.status(200).json({
      users,
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
    let userId: number;
    try {
      userId = Number(paramId);
      if (userId > 2147483647) {
        return -2;
      }
    } catch (error: any) {
      return -2;
    }
    if (isNaN(userId)) {
      return -3;
    }
    return userId;
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
    const userId = this.valor_id(req);
    const resposta = await this.userUseCase.consultarPorId(userId);
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
    const resposta = await this.userUseCase.consultarPorEmail(email);
    if (!resposta) {
      return res.status(404).json({ message: 'Email não encontrado' }).end();
    }
    if (resposta instanceof Error) {
      return res.status(400).json({ message: resposta.message }).end();
    }
    return res.status(200).json(resposta).end();
  }

  async consultarPorUsername(req: Request, res: Response) {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ message: 'Username não informado' }).end();
    }
    const resposta = await this.userUseCase.consultarPorUsername(username);
    if (!resposta) {
      return res.status(404).json({ message: 'Username não encontrado' }).end();
    }
    if (resposta instanceof Error) {
      return res.status(400).json({ message: resposta.message }).end();
    }
    return res.status(200).json(resposta).end();
  }

  async adicionarUser(req: Request, res: Response) {
    const { username, telefone, hash_password, email, fullname } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email não informado' }).end();
    }
    if (!username) {
      return res.status(400).json({ message: 'Username não informado' }).end();
    }
    if (!hash_password) {
      return res.status(400).json({ message: 'hash_password não informado' }).end();
    }
    const user = {
      email, username, hash_password, fullname, telefone
    } as User;
    const resposta = await this.userUseCase.adicionarUser(user);
    if (resposta instanceof Error) {
      return res.status(400).json({ message: resposta.message }).end();
    }
    const userAdicionado = resposta as User;
    return res.status(201).json(userAdicionado).end();
  }

  async atualizarUser(req: Request, res: Response) {
    const mensagem = this.valida_Id(req);
    if (mensagem !== '') {
      return res.status(400).json({ message: mensagem }).end();
    }
    const id = this.valor_id(req);
    const { username, email, telefone, fullname } = req.body;
    let userAtualizado = {
      id, username, email, telefone, fullname
    } as User;
    const user = await this.userUseCase.atualizarUser(userAtualizado);
    if (user instanceof Error) {
      return res.status(400).json({ message: user.message }).end();
    }
    return res.status(200).json(user).end();
  }


  async atualizarPassword(req: Request, res: Response) {
    const username = req.params.username || req.body.username;
    let { hash_antiga } = req.body;
    const { hash_nova } = req.body;
    const { ok } = req.body;

    if (username === '' || username === undefined || username === null) {
      return res.status(400).json({ message: "Username não informado" }).end();
    }
    if (hash_antiga === '' || hash_antiga === undefined || hash_antiga === null) {
      return res.status(400).json({ message: "Hash antiga não informada" }).end();
    }
    if (hash_nova === '' || hash_nova === undefined || hash_nova === null) {
      return res.status(400).json({ message: "Hash nova não informada" }).end();
    }
    if (ok === 'true') {
      const fulano = await this.userUseCase.consultarPorUsername(username);
      if (fulano instanceof Error) {
        return res.status(400).json({ message: fulano.message }).end();
      }
      if (fulano === undefined || fulano === null) {
        return res.status(404).json({ message: 'Username não encontrado' }).end();
      }
      hash_antiga = fulano.hash_password;
    }
    const resposta = await this.userUseCase.atualizarPassword(username, hash_antiga, hash_nova);
    if (resposta instanceof Error) {
      return res.status(400).json({ message: resposta.message }).end();
    }
    if (!resposta) {
      return res.status(404).json({ message: 'Password não atualizada' }).end();
    }
    return res.status(200).json({ message: "updated" }).end();
  }

  async deletarUser(req: Request, res: Response) {
    const mensagem = this.valida_Id(req);
    if (mensagem !== '') {
      return res.status(400).json({ message: mensagem }).end();
    }
    const id = this.valor_id(req);
    const retorno = await this.userUseCase.deletarUser(id);
    if (retorno instanceof Error) {
      return res.status(400).json({ message: retorno.message }).end();
    }
    if (!retorno) {
      return res.status(404).json({ message: 'Id não encontrado' }).end();
    }
    return res.status(204).send('Apagado com sucesso').end();
  }

  async verifica_username_hash_password(req: Request, res: Response) {
    const { username } = req.body;
    if (!username || username === '' || username === undefined || username === null) {
      return res.status(400).json({ message: 'Username não informado' }).end();
    }
    const { hash_password } = req.body;
    if (!hash_password || hash_password === '' || hash_password === undefined || hash_password === null) {
      return res.status(400).json({ message: 'hash_password não informada' }).end();
    }
    const resposta = await this.userUseCase.consultarPorUsernameHashPassword(username, hash_password);
    if (resposta instanceof Error) {
      return res.status(400).json({ message: resposta.message }).end();
    }
    if (!resposta) {
      return res.status(404).json({ message: 'Username e/ou Password não conferem/existem' }).end();
    }
    return res.status(200).json({ message: 'ok' }).end();
  }
}

