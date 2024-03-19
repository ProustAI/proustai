import type { HttpContext } from '@adonisjs/core/http'

export default class MarketingController {
  async home({ inertia }: HttpContext) {
    return inertia.render('marketing/home')
  }

  async pricing({ inertia }: HttpContext) {
    return inertia.render('marketing/pricing')
  }
}
