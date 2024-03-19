import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class GoogleAuthController {
  async redirect({ ally }: HttpContext) {
    return ally.use('google').redirect()
  }

  async callback({ ally, auth, response }: HttpContext) {
    const googleUser = await ally.use('google').user()

    const user = await User.firstOrCreate(
      { email: googleUser.email },
      { email: googleUser.email, fullName: googleUser.name }
    )

    await auth.use('web').login(user)

    return response.redirect('/novels')
  }
}
