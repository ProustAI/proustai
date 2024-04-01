import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import User from './user.js'
import BaseModel from './base_model.js'
import env from '#start/env'

export default class BillingPeriod extends BaseModel {
  /**
   * Regular columns.
   */
  @column()
  declare numberOfImageGenerations: number

  @column()
  declare numberOfLlmGenerations: number

  /**
   * Utils.
   */
  async incrementNumberOfImageGenerations(): Promise<boolean> {
    if (
      env.get('MAX_NUMBER_OF_IMAGE_GENERATIONS') !== undefined &&
      env.get('MAX_NUMBER_OF_IMAGE_GENERATIONS')! <= this.numberOfImageGenerations
    ) {
      return false
    }

    this.numberOfImageGenerations++
    await this.save()

    return true
  }

  async incrementNumberOfLLmGenerations(): Promise<boolean> {
    if (
      env.get('MAX_NUMBER_OF_IMAGE_GENERATIONS') !== undefined &&
      env.get('MAX_NUMBER_OF_IMAGE_GENERATIONS')! <= this.numberOfImageGenerations
    ) {
      return false
    }

    this.numberOfLlmGenerations++
    await this.save()

    return true
  }

  /**
   * Relationships.
   */
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare userId: string

  /**
   * Timestamps.
   */
  @column.dateTime()
  declare startAt: DateTime

  @column.dateTime()
  declare endAt: DateTime
}
