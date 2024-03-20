import BillingPeriod from '#models/billing_period'
import User from '#models/user'
import { DateTime } from 'luxon'

export default class BillingService {
  async retrieveCurrentBillingPeriod(user: User): Promise<BillingPeriod> {
    let currentBillingPeriod = await user
      .related('billingPeriods')
      .query()
      .where('endAt', '>', DateTime.now().toString())
      .first()

    if (!currentBillingPeriod) {
      currentBillingPeriod = await user.related('billingPeriods').create({
        startAt: DateTime.now(),
        endAt: DateTime.now().plus({ month: 1 }),
      })
    }

    return currentBillingPeriod
  }
}
