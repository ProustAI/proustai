import * as React from 'react'
import AuthLayout from '../components/auth_layout'
import { Link, useForm } from '@inertiajs/react'
import InputField from '~/components/input_field'

interface ResetPasswordProps {}

const ResetPassword: React.FunctionComponent<ResetPasswordProps> = () => {
  const form = useForm({
    newPassword: '',
    confirmPassword: '',
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const suffix = window.location.pathname.replace('/auth/forgot_password/', '')

    form.post('/auth/reset_password/' + suffix)
  }
  return (
    <AuthLayout>
      <div className="sm:mx-auto sm:w-full vertical">
        <Link href="/" className="flex items-center justify-center">
          <img className="h-24 w-auto hover:opacity-75 transition" src="/logo.webp" alt="Logo" />
        </Link>
        <h1 className="text-3xl font-semibold font-serif pt-4 text-center">Reset Password.</h1>
        <h2 className="text-zinc-800 text-center mt-2">Type your new password and confirm it.</h2>
        <form className="space-y-4 mt-6 vertical w-full" onSubmit={handleSubmit}>
          <InputField
            id="newPassword"
            type="password"
            label="New Password"
            placeholder="••••••••••"
            value={form.data.newPassword}
            onChange={(e) => form.setData('newPassword', e.target.value)}
          />
          <InputField
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="••••••••••"
            value={form.data.confirmPassword}
            onChange={(e) => form.setData('confirmPassword', e.target.value)}
          />
        </form>
      </div>
    </AuthLayout>
  )
}

export default ResetPassword
