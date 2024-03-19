import User from '#models/user'
import { resetPasswordValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class ResetPasswordController {
  async show({ request, inertia, response }: HttpContext) {
    if (!request.hasValidSignature()) {
      return response.redirect('/auth/forgot_password')
    }

    return inertia.render('auth/reset_password')
  }

  async handle({ request, response }: HttpContext) {
    if (!request.hasValidSignature()) {
      return response.redirect('/auth/forgot_password')
    }

    const { newPassword } = await request.validateUsing(resetPasswordValidator)

    const user = await User.findBy('email', request.param('email'))
    if (!user) {
      return response.redirect('/auth/sign_up')
    }

    user.password = newPassword
    await user.save()

    return response.redirect(request.completeUrl(true))
  }
}
