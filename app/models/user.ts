import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { afterCreate, column, hasMany } from '@adonisjs/lucid/orm'
import Novel from './novel.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import BaseModel from './base_model.js'
import emitter from '@adonisjs/core/services/emitter'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  /**
   * Regular fields.
   */
  @column()
  declare fullName: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare stripeCustomerId: string | null

  /**
   * Relationships.
   */
  @hasMany(() => Novel)
  declare novels: HasMany<typeof Novel>

  /**
   * Hooks.
   */
  @afterCreate()
  static emitRegisteredEvent(user: User) {
    emitter.emit('user:registered', user)
  }
}
