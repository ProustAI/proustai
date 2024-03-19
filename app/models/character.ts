import { belongsTo, column } from '@adonisjs/lucid/orm'
import BaseModel from './base_model.js'
import Novel from './novel.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Character extends BaseModel {
  /**
   * Regular fields.
   */
  @column()
  declare name: string

  @column()
  declare age: number

  @column()
  declare occupation: string

  @column()
  declare personality: string

  @column()
  declare appearance: string

  @column()
  declare gender: 'male' | 'female'

  /**
   * Relationships.
   */
  @belongsTo(() => Novel)
  declare novel: BelongsTo<typeof Novel>

  @column()
  declare novelId: string
}
