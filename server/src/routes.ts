/*
 * Criação das rotas
 */

import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

/*
 *  Request body: dados para criação ou atualização de registro
 *  Route Params: Identificar qual recurso eu quero atualizar ou deletar
 *  Query Params: Paginação, filtros, ordenação..
*/

//criar aulas
routes.post('/classes', classesController.create);
//listar aulas
routes.get('/classes', classesController.index);

 //criar uma nova conexão / aluno com o professor
routes.post('/connections', connectionsController.create);
//LISTAR todas conexões salvas
routes.get('/connections', connectionsController.index);

export default routes;
