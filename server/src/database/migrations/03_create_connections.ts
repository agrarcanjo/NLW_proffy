/*
 * Criação da conexão dos alunos com os professores 
 */
import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('connections', table => {
		table.increments('id').primary();

		//integração com a tabela de usuários
		table
			.integer('user_id')
			.notNullable()
			.references('id')
			.inTable('users')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
		
			//Salva o momento em que foi cadastrado esse registro
		table.timestamp('created_at')
		  .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
		  .notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('connections');
}
