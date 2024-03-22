import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { afterCreate, column, hasMany } from '@adonisjs/lucid/orm'
import Novel from './novel.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import BaseModel from './base_model.js'
import emitter from '@adonisjs/core/services/emitter'
import BillingPeriod from './billing_period.js'
import env from '#start/env'
import Stripe from 'stripe'

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
   * Utils.
   */
  async hasPaidPlan() {
    const stripe = new Stripe(env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2023-10-16' })
    const customer = (await stripe.customers.retrieve(this.stripeCustomerId!, {
      expand: ['subscriptions'],
    })) as any
    if (!customer.subscriptions.data.length) {
      return false
    }
    return customer.subscriptions.data.some(
      (subscription: Stripe.Subscription) => subscription.status === 'active'
    )
  }

  /**
   * Relationships.
   */
  @hasMany(() => Novel)
  declare novels: HasMany<typeof Novel>

  @hasMany(() => BillingPeriod)
  declare billingPeriods: HasMany<typeof BillingPeriod>

  /**
   * Hooks.
   */
  @afterCreate()
  static emitRegisteredEvent(user: User) {
    emitter.emit('user:registered', user)
  }
}
