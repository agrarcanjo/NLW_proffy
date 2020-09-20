/*
 * Criação de classes de alunos com aulas
 */

import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('classes', table => {
		table.increments('id').primary();
		table.string('subject').notNullable();
		table.decimal('cost').notNullable();


		//Relacionamento para a coluna user_id referenciando o id da tabela users
		table
			.integer('user_id')
			.notNullable()
			.references('id')
			.inTable('users')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('classes');
}
