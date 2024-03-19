import User from '#models/user'
import { settingsValidator } from '#validators/settings'
import type { HttpContext } from '@adonisjs/core/http'

export default class SettingsController {
  async edit({ inertia }: HttpContext) {
    return inertia.render('settings/edit')
  }

  async update({ auth, request, response, session }: HttpContext) {
    const { fullName, email, newPassword } = await request.validateUsing(settingsValidator)

    if (auth.user!.email !== email) {
      const emailExists = await User.query().where('email', email)
      if (emailExists) {
        session.flash('errors.email', 'Email already exists')
        return response.redirect().back()
      }
    }

    auth.user!.fullName = fullName
    auth.user!.email = email
    if (newPassword) {
      auth.user!.password = newPassword
    }
    await auth.user!.save()

    return response.redirect().back()
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.user!.delete()

    return response.redirect('/auth/sign_up')
  }
}
