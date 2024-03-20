import BillingService from '#services/billing_service'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import Stripe from 'stripe'

export default class BillingController {
  @inject()
  async show({ auth, inertia }: HttpContext, billingService: BillingService) {
    const currentBillingPeriod = await billingService.retrieveCurrentBillingPeriod(auth.user!)

    return inertia.render('billing/show', { currentBillingPeriod })
  }

  async manage({ auth, response }: HttpContext) {
    const stripe = new Stripe(env.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2023-10-16',
    })
    const { url } = await stripe.billingPortal.sessions.create({
      customer: auth.user!.stripeCustomerId!,
      return_url: `https://www.proustai.com/billing`,
    })
    return response.redirect().toPath(url!)
  }
}
