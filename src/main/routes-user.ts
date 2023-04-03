import { Router } from 'express';
import { UserController } from '../controller/user-controller';

const userController = new UserController();
const userRouter = Router();

// Rota para recuperar todos os users
userRouter.get('/user/index', (req, res) => userController.index(req, res));

// Rota para recuperar todos os users
userRouter.get('/user/total', (req, res) => userController.total(req, res));

// Rota para recuperar todos os users
userRouter.get('/user/page/:pag/:qtd', (req, res) => userController.paginacao(req, res));

// Rota para consultar um user por id
userRouter.get('/user/id/:id', (req, res) => userController.consultarPorId(req, res));

// Rota para consultar um user por email
userRouter.get('/user/email/:email', (req, res) => userController.consultarPorEmail(req, res));

// Rota para consultar um user por email
userRouter.get('/user/username/:username', (req, res) => userController.consultarPorUsername(req, res));

// Rota para adicionar um user
userRouter.post('/user/register', (req, res) => userController.adicionarUser(req, res));

// Rota para adicionar um user
userRouter.post('/user/valid_user', (req, res) => userController.verifica_username_hash_password(req, res));

// Rota para atualizar um user
userRouter.patch('/user/id', (req, res) => userController.atualizarUser(req, res));

// Rota para atualizar um user
userRouter.patch('/user/id/:id', (req, res) => userController.atualizarUser(req, res));

// Rota para atualizar um user
userRouter.patch('/user/upd_senha', (req, res) => userController.atualizarPassword(req, res));

// Rota para atualizar um user
userRouter.put('/user/id', (req, res) => userController.atualizarUser(req, res));

// Rota para atualizar um user
userRouter.put('/user/id/:id', (req, res) => userController.atualizarUser(req, res));

// Rota para deletar um user
userRouter.delete('/user/id/:id', (req, res) => userController.deletarUser(req, res));

export { userRouter };
