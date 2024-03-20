import User from '#models/user'
import { signUpValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class SignUpController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/sign_up')
  }

  async handle({ auth, request, response, session }: HttpContext) {
    const payload = await request.validateUsing(signUpValidator)

    const userAlreadyExists = await User.findBy('email', payload.email)
    if (userAlreadyExists !== null) {
      session.flash('errors.email', 'Email already exists')
      return response.redirect().back()
    }

    const user = await User.create(payload)
    await user.save()
    await auth.use('web').login(user)

    return response.redirect().toRoute('novels.index')
  }
}
