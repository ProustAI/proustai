import { belongsTo, column } from '@adonisjs/lucid/orm'
import BaseModel from './base_model.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Novel from './novel.js'

export default class Chapter extends BaseModel {
  /**
   * Regular fields.
   */
  @column()
  declare title: string

  @column()
  declare order: number

  @column()
  declare content: string

  /**
   * Relationships.
   */
  @belongsTo(() => Novel)
  declare novel: BelongsTo<typeof Novel>

  @column()
  declare novelId: string
}
