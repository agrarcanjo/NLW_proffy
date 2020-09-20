import { Request, Response } from 'express';
import db from '../database/connection';

export default class ConnectionsController {
  //LISTAR todas conexões salvas
	async index(request: Request, response: Response): Promise<Response> {
    const totalConnections = await db('connections').count('* as total');

    const { total } = totalConnections[0];

    return response.json({ total });
  }
  
  //criar uma nova conexão / aluno com o professor
  async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;
    
    await db('connections').insert({
      user_id,
    });

    return response.status(201).send();
  }
}
