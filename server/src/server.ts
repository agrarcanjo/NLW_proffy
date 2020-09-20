/*
 * Criação da conexão e das rotas
 */

import express from 'express';
import cors from 'cors';

import routes from './routes';

//variavel express para criar conexões
const app = express();

//permite visualizar a API em endereço diferente 
app.use(cors());

//converte a conexão para entender json
app.use(express.json());

//Usar rotas criadas
app.use(routes);

//porta que ouve 
app.listen(3333);
 