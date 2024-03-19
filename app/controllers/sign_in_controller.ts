import User from '#models/user'
import { signInValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class SignInController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/sign_in')
  }

  async handle({ auth, request, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(signInValidator)
    const nextPath = request.input('next')
    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)

      if (nextPath) {
        return response.redirect().toPath(nextPath)
      }

      return response.redirect().toPath('/novels')
    } catch {
      session.flash('errors.auth', 'Invalid credentials')
      let backPath = `/auth/sign_in`
      if (nextPath) {
        backPath += `?next=${nextPath}`
      }
      return response.redirect().toPath(backPath)
    }
  }
}
