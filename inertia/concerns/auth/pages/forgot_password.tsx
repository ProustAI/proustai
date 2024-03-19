import * as React from 'react'
import AuthLayout from '../components/auth_layout'
import ContinueWithGoogle from '../components/continue_with_google'
import { Link, useForm } from '@inertiajs/react'
import OrDivider from '../components/or_divider'
import InputField from '~/components/input_field'
import SubmitButton from '~/components/submit_button'
import useError from '~/hooks/use_error'

interface ForgotPasswordProps {}

const ForgotPassword: React.FunctionComponent<ForgotPasswordProps> = () => {
  const form = useForm({
    email: '',
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.post('/auth/forgot_password')
  }

  return (
    <AuthLayout>
      <div className="sm:mx-auto sm:w-full vertical">
        <Link href="/" className="flex items-center justify-center">
          <img className="h-24 w-auto hover:opacity-75 transition" src="/logo.webp" alt="Logo" />
        </Link>
        <h1 className="text-3xl font-semibold font-serif pt-4 text-center">Forgot Password.</h1>
        <h2 className="text-zinc-800 text-center mt-2">
          Type your email address and we will send you a link to reset your password.
        </h2>
      </div>
      <div className="vertical w-full">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            id="email"
            type="email"
            label="Email Address"
            placeholder="marcel@proust.fr"
            value={form.data.email}
            onChange={(e) => form.setData('email', e.target.value)}
          />
          <SubmitButton className="!w-full" loading={form.processing}>
            Send Reset Link
          </SubmitButton>
        </form>
      </div>
    </AuthLayout>
  )
}

export default ForgotPassword
