import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { column, hasMany } from '@adonisjs/lucid/orm'
import Novel from './novel.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import BaseModel from './base_model.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  /**
   * Regular fields.
   */
  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column()
  declare password: string

  /**
   * Relationships.
   */
  @hasMany(() => Novel)
  declare novels: HasMany<typeof Novel>
}
