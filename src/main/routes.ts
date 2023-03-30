import { Router } from 'express';
import { ClienteController } from '../controller/cliente-controller';

const clienteRouter = Router();
const clienteController = new ClienteController();

// Rota para adicionar um cliente
clienteRouter.post('/', (req, res) => clienteController.adicionarCliente(req, res));

// Rota para atualizar um cliente
clienteRouter.put('/', (req, res) => clienteController.atualizarCliente(req, res));

// Rota para deletar um cliente
clienteRouter.delete('/:id', (req, res) => clienteController.deletarCliente(req, res));

// Rota para consultar um cliente por id
clienteRouter.get('/:id', (req, res) => clienteController.consultarPorId(req, res));

// Rota para consultar um cliente por email
clienteRouter.get('/email/:email', (req, res) => clienteController.consultarPorEmail(req, res));

export { clienteRouter };
