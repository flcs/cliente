import { Router } from 'express';
import { ClienteController } from '../controller/cliente-controller';

const clienteController = new ClienteController();
const clienteRouter = Router();

// Rota para recuperar todos os clientes
clienteRouter.get('/cliente/index', (req, res) => clienteController.index(req, res));

// Rota para consultar um cliente por id
clienteRouter.get('/cliente/:id', (req, res) => clienteController.consultarPorId(req, res));

// Rota para consultar um cliente por email
clienteRouter.get('/cliente/email/:email', (req, res) => clienteController.consultarPorEmail(req, res));

// Rota para adicionar um cliente
clienteRouter.post('/cliente', (req, res) => clienteController.adicionarCliente(req, res));

// Rota para atualizar um cliente
clienteRouter.put('/cliente', (req, res) => clienteController.atualizarCliente(req, res));

// Rota para deletar um cliente
clienteRouter.delete('/cliente/:id', (req, res) => clienteController.deletarCliente(req, res));

export { clienteRouter };
