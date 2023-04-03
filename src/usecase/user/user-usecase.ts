import { User, tId } from '../../entity/user';
import { UserRepository } from '../../repository/user-repository';

// import { v4 as uuidv4 } from 'uuid';

interface UserDTO {
  id: number;
  email: string;
  username: string;
  hash_password: string;
  telefone?: string | null;
  fullname?: string | null;
}

interface UserResponse {
  id: number;
  email: string;
  username: string;
  hash_password: string;
  telefone?: string | null;
  fullname?: string | null;
}

class UserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async listar(): Promise<User[] | Error> {
    const users = await this.userRepository.listarUsers();
    if (users instanceof Error) {
      return users;
    }
    return users;
  }

  async obter_quantidade_users(): Promise<number | Error> {
    const quantidade = await this.userRepository.quantidadeUsers();
    if (quantidade instanceof Error) {
      return quantidade;
    }
    return quantidade;
  }

  async consultarPorId(id: tId): Promise<User | Error> {
    const user = await this.userRepository.buscarUserPorId(id);
    if (user instanceof Error) {
      return user;
    }
    if (!user) {
      return new Error('User não encontrado');
    }
    return user;
  }

  async consultarPorEmail(email: string): Promise<User | Error> {
    const user = await this.userRepository.buscarUserPorEmail(email);
    if (user instanceof Error) {
      return user;
    }
    if (!user) {
      return new Error('Email não encontrado');
    }
    return user;
  }


  async consultarPorUsername(email: string): Promise<User | Error> {
    const user = await this.userRepository.buscarUserPorUsername(email);
    if (user instanceof Error) {
      return user;
    }
    if (!user) {
      return new Error('Username não encontrado');
    }
    return user;
  }


  async obter_pagina(paginaAtual: number, itensPorPagina: number): Promise<User[] | Error> {
    const users = await this.userRepository.getPaginaUsers(paginaAtual, itensPorPagina);
    if (users instanceof Error) {
      return users;
    }
    return users;
  }

  async adicionarUser(userDTO: UserDTO): Promise<UserResponse | Error> {
    let novoUser = {
      ...userDTO,
    };
    // novoUser.id = uuidv4();

    const existe = await this.userRepository.buscarUserPorEmail(userDTO.email);
    if (existe instanceof Error) {
      return existe;
    }
    if (existe) {
      return new Error('Email já cadastrado');
    }

    const userAdicionado = await this.userRepository.adicionarUser(novoUser);
    if (userAdicionado instanceof Error) {
      return userAdicionado;
    }
    if (!userAdicionado) {
      return new Error('Erro ao adicionar');
    }
    return userAdicionado;
  }

  async atualizarUser(userDTO: UserDTO): Promise<UserResponse | Error> {

    let existe: User | Error | null;
    existe = await this.userRepository.buscarUserPorId(userDTO.id);
    if (existe instanceof Error) {
      return existe;
    }
    if (!existe) {
      return new Error('User não encontrado');
    }

    existe = await this.userRepository.buscarUserPorEmail(userDTO.email);
    if (existe instanceof Error) {
      return existe;
    }
    if (existe && (existe.id !== userDTO.id)) {
      return new Error('Email já cadastrado');
    }

    existe = await this.userRepository.buscarUserPorUsername(userDTO.username);
    if (existe instanceof Error) {
      return existe;
    }
    if (existe && (existe.id !== userDTO.id)) {
      return new Error('Username já cadastrado');
    }

    const userAtualizado = await this.userRepository.atualizarUser(userDTO.id, userDTO);
    if (userAtualizado instanceof Error) {
      return userAtualizado;
    }
    if (!userAtualizado) {
      return new Error('Erro ao atualizar user');
    }
    return userAtualizado;
  }


  async atualizarPassword(username: string, hash_antiga: string, hash_nova: string): Promise<boolean | Error> {

    let existe: User | Error | null;
    existe = await this.userRepository.buscarUserPorUsername(username);
    if (existe instanceof Error) {
      return existe;
    }
    if (!existe) {
      return new Error('User não encontrado');
    }
    if (existe.hash_password !== hash_antiga) {
      return new Error('Password antiga não confere');
    }
    existe.hash_password = hash_nova;
    const userAtualizado = await this.userRepository.atualizarUser(existe.id, existe);
    if (userAtualizado instanceof Error) {
      return userAtualizado;
    }
    if (!userAtualizado) {
      return new Error('Erro ao atualizar password');
    }
    return true;
  }

  async deletarUser(id: tId): Promise<boolean | Error> {
    const existe = await this.userRepository.buscarUserPorId(id);
    if (existe instanceof Error) {
      return existe;
    }
    if (!existe) {
      return new Error('Id não encontrado');
    }
    const retorno = await this.userRepository.removerUser(id);
    if (retorno instanceof Error) {
      return retorno;
    }
    if (!retorno) {
      return new Error('Erro ao remover');
    }
    return true;
  }

  async consultarPorUsernameHashPassword(username: string, hash_password: string) : Promise<boolean | Error> {
    const ok = await this.userRepository.verificaUsernamePassword(username, hash_password);
    if (ok instanceof Error) {
      return ok;
    }
    if (!ok) {
      return new Error('Username/Password não conferem/encontrado');
    }
    return true;
  }
}

export { UserUseCase };
