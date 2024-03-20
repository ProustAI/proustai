import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'billing_periods'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.integer('number_of_image_generations').unsigned().notNullable().defaultTo(0)
      table.integer('number_of_llm_generations').unsigned().notNullable().defaultTo(0)

      table.string('user_id').unsigned().references('users.id').onDelete('CASCADE')

      table.timestamp('start_at').notNullable()
      table.timestamp('end_at').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
