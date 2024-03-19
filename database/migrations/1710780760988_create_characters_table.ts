import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'characters'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('name').notNullable()
      table.integer('age').notNullable()
      table.string('occupation').notNullable()
      table.string('personality').notNullable()
      table.string('appearance').notNullable()
      table.enum('gender', ['male', 'female']).notNullable()

      table.string('novel_id').notNullable().references('id').inTable('novels').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
