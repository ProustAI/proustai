import { ApplicationService } from '@adonisjs/core/types'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  async boot() {
    await import('../src/macros.js')
    await import('../src/feature_flags.js')
  }
}
