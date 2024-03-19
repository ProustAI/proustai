import { belongsTo, column } from '@adonisjs/lucid/orm'
import BaseModel from './base_model.js'
import { BelongsTo } from '@adonisjs/lucid/types/relations'
import Character from './character.js'
import Location from './location.js'

export default class ImageGeneration extends BaseModel {
  /**
   * Regular fields.
   */
  @column()
  declare status: string

  @column()
  declare imageLocation: string

  @column()
  declare prompt: string

  /**
   * Relationships.
   */
  @belongsTo(() => Character)
  declare character: BelongsTo<typeof Character> | null

  @column()
  declare characterId: string | null

  @belongsTo(() => Location)
  declare location: BelongsTo<typeof Location> | null

  @column()
  declare locationId: string | null
}
