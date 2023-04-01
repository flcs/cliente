import express from 'express';
import connectDB from './database';
import { clienteRouter } from './cliente-routes';

const app = express();
app.use(express.json());

// Adiciona as rotas do ClienteController ao servidor
app.use(clienteRouter);

// Inicia o servidor
app.listen(3000, () => console.log('Servidor iniciado na porta 3000.'));

connectDB()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });

