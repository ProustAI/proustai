import User from '#models/user'
import FeatureFlagsService from '#services/feature_flags_service'
import env from '#start/env'
import Stripe from 'stripe'

export default class UsersListener {
  async onRegistered(user: User) {
    /**
     * Assign Stripe customer ID to user, if billing is enabled.
     */
    if (FeatureFlagsService.isFeatureEnabled('billing')) {
      const stripe = new Stripe(env.get('STRIPE_SECRET_KEY')!, {
        apiVersion: '2023-10-16',
      })
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.fullName,
      })
      user.stripeCustomerId = customer.id
      await user.save()
    }
  }
}
