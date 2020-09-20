/*
 * Criação das rotas
 */

import Knex from "knex";

//operações para criação do banco
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('avatar').notNullable();
    table.string('whatsapp').notNullable();
    table.string('bio').notNullable();
  });
}

//Operações para reverter criação 
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
