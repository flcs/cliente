import express from 'express';
import cors from 'cors';
import connectDB from './database';
import { clienteRouter } from './routes-cliente';
import { userRouter } from './routes-user';

const app = express();
app.use(cors());
app.use(express.json());

// Adiciona as rotas do ClienteController ao servidor
app.use('/api', clienteRouter);
app.use('/api', userRouter);

// Inicia o servidor
app.listen(3030, () => console.log('Servidor iniciado na porta 3030.'));

connectDB()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });

