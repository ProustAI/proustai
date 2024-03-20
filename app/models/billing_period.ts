import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import User from './user.js'
import BaseModel from './base_model.js'

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
  async incrementNumberOfImageGenerations() {
    this.numberOfImageGenerations++
    await this.save()
  }

  async incrementNumberOfLLmGenerations() {
    this.numberOfLlmGenerations++
    await this.save()
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
