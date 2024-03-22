import ResetPasswordNotification from '#mails/reset_password_notification'
import User from '#models/user'
import { forgotPasswordValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'

export default class ForgotPasswordController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/forgot_password')
  }

  async handle({ request, response }: HttpContext) {
    const { email } = await request.validateUsing(forgotPasswordValidator)
    try {
      const user = await User.findByOrFail('email', email)
      await mail.send(new ResetPasswordNotification(user))
      return response.redirect().back()
    } catch (error) {
      console.log(error)
      return response.redirect().back()
    }
  }
}
