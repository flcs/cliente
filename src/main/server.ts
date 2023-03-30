import express from 'express';
import { clienteRouter } from './routes';

const app = express();
app.use(express.json());

// Adiciona as rotas do ClienteController ao servidor
app.use('/clientes', clienteRouter);

// Inicia o servidor
app.listen(3000, () => console.log('Servidor iniciado na porta 3000.'));