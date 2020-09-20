import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
	week_day: number;
	from: string;
	to: string;
}
/*
 * criar aulas a partir dos usuários cadastrados
 */
export default class ClassesController {

	//listagem das aulas
	async index(request: Request, response: Response): Promise<Response> {
		const filters = request.query;

		const subject = filters.subject as string;
		const week_day = filters.week_day as string;
		const time = filters.time as string;
		
		//caso não existam os campos obrigatórios
		if (!filters.week_day || !filters.subject || !filters.time) {
			return response.status(400).json({
				error: 'Missing filters to search classes.',
			});
		}

		//converter para minutos
		const timeInMinutes = convertHourToMinutes(time);
		const classes = await db('classes')
		//função para uma subquery que permite a chamada this
			.whereExists(function () {
				this.select('class_schedule.*')
					.from('class_schedule')
					//whereRaw mais recomendado ao utilizar whereExists / classes.id referenciando a classes criada anteriormente. 
					//necessário indicar com crase 
					.whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
					.whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
					.whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
					.whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
			})
			.where('classes.subject', '=', subject)
			.join('users', 'classes.user_id', '=', 'users.id')
			.select(['classes.*', 'users.*']);

		return response.send(classes);
	}

	//criação das aulas
	async create(request: Request, response: Response): Promise<Response> {
		//criar desestruturação do objeto recebido.
		const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;

		//Criar transação para controlar o escopo da transaction
		const trx = await db.transaction();

		try {
			//insere o usuário 
			const insertedUsersIds = await trx('users').insert({
				name,
				avatar,
				whatsapp,
				bio,
			});

			const user_id = insertedUsersIds[0];
			
			//inserir a aula vinculada ao usuário novo
			const insertedClassesIds = await trx('classes').insert({
				subject,
				cost,
				user_id,
			});

			const class_id = insertedClassesIds[0];

			//inserir o agendamento vinculado salvando em minutos no banco
			const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
				return {
					class_id,
					week_day: scheduleItem.week_day,
					from: convertHourToMinutes(scheduleItem.from),
					to: convertHourToMinutes(scheduleItem.to),
				};
			});

			await trx('class_schedule').insert(classSchedule);

			//realizar commit
			await trx.commit();

			//Resposta de criado com sucesso
			return response.status(201).send();
		} catch (error) {
			//Resposta de fracasso e rollback
			//console.log(error)
			await trx.rollback();
			return response.status(400).json({
				error: 'Unexpected error while creating new class',
			});
		}
	}

};
