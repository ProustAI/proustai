import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'image_generations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('status').notNullable()
      table.string('image_location').nullable()
      table.string('prompt').notNullable()

      table.string('character_id').nullable().unsigned().references('id').inTable('characters')
      table.string('location_id').nullable().unsigned().references('id').inTable('locations')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
