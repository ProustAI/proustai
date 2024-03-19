import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import BaseModel from './base_model.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Chapter from './chapter.js'
import Character from './character.js'
import Location from './location.js'
import User from './user.js'

export default class Novel extends BaseModel {
  /**
   * Regular fields.
   */
  @column()
  declare title: string

  @column()
  declare pitch: string | null

  /**
   * Relationships.
   */
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare userId: string

  @hasMany(() => Chapter)
  declare chapters: HasMany<typeof Chapter>

  @hasMany(() => Character)
  declare characters: HasMany<typeof Character>

  @hasMany(() => Location)
  declare locations: HasMany<typeof Location>
}
