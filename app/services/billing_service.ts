import BillingPeriod from '#models/billing_period'
import User from '#models/user'
import env from '#start/env'
import { DateTime } from 'luxon'
import Stripe from 'stripe'

export default class BillingService {
  async retrieveCurrentBillingPeriod(user: User): Promise<BillingPeriod> {
    let currentBillingPeriod = await user
      .related('billingPeriods')
      .query()
      .where('endAt', '>', DateTime.now().toString())
      .first()

    const stripe = new Stripe(env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2023-10-16' })
    const customer = (await stripe.customers.retrieve(user.stripeCustomerId!, {
      expand: ['subscriptions'],
    })) as any
    if (!customer.subscriptions.data.length) {
      throw new Error('User does not have a subscription')
    }
    const activeSubscription = customer.subscriptions.data.some(
      (subscription: Stripe.Subscription) => subscription.status === 'active'
    )
    if (!activeSubscription) {
      throw new Error('User does not have a subscription')
    }

    if (!currentBillingPeriod) {
      currentBillingPeriod = await user.related('billingPeriods').create({
        startAt: DateTime.fromISO(activeSubscription.current_period_start),
        endAt: DateTime.fromISO(activeSubscription.current_period_end),
      })
    }

    return currentBillingPeriod
  }
}
