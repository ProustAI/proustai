import { afterCreate, afterSave, belongsTo, column } from '@adonisjs/lucid/orm'
import BaseModel from './base_model.js'
import { BelongsTo } from '@adonisjs/lucid/types/relations'
import Character from './character.js'
import Location from './location.js'
import emitter from '@adonisjs/core/services/emitter'

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

  /**
   * Hooks.
   */
  @afterCreate()
  static emitStartedEvent(imageGeneration: ImageGeneration) {
    emitter.emit('image_generation:started', imageGeneration)
  }

  @afterSave()
  static emitUpdatedEvent(imageGeneration: ImageGeneration) {
    if (imageGeneration.characterId !== null) {
      emitter.emit(`character:${imageGeneration.characterId}:image_generation`, imageGeneration)
    }

    if (imageGeneration.locationId !== null) {
      emitter.emit(`location:${imageGeneration.locationId}:image_generation`, imageGeneration)
    }
  }
}
