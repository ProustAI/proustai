import * as React from 'react'
import AuthLayout from '../components/auth_layout'
import ContinueWithGoogle from '../components/continue_with_google'
import { Link, useForm } from '@inertiajs/react'
import OrDivider from '../components/or_divider'
import InputField from '~/components/input_field'
import SubmitButton from '~/components/submit_button'
import useError from '~/hooks/use_error'
import isFeatureEnabled from '~/lib/is_feature_enabled'

interface SignInProps {}

const SignIn: React.FunctionComponent<SignInProps> = () => {
  const form = useForm({
    email: '',
    password: '',
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.post('/auth/sign_in')
  }
  const error = useError('auth.error')
  const isGoogleAuthEnabled = isFeatureEnabled('google_auth')

  return (
    <AuthLayout>
      <div className="sm:mx-auto sm:w-full vertical">
        <Link href="/" className="flex items-center justify-center">
          <img className="h-24 w-auto hover:opacity-75 transition" src="/logo.webp" alt="Logo" />
        </Link>
        <h1 className="text-3xl font-semibold font-serif pt-4 text-center">Sign In.</h1>
        <h2 className="text-zinc-800 text-center mt-2">
          Not signed up yet?{' '}
          <Link href="/auth/sign_up" className="text-amber-600 hover:text-amber-500 transition">
            Sign Up.
          </Link>
        </h2>
      </div>
      <div className="vertical w-full">
        {isGoogleAuthEnabled && (
          <>
            <ContinueWithGoogle />
            <OrDivider />
          </>
        )}
        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <InputField
            id="email"
            type="email"
            label="Email Address"
            placeholder="marcel@proust.fr"
            value={form.data.email}
            onChange={(e) => form.setData('email', e.target.value)}
          />
          <InputField
            id="password"
            type="password"
            label="Password"
            placeholder="••••••••••"
            value={form.data.password}
            onChange={(e) => form.setData('password', e.target.value)}
            labelRight={
              <Link
                className="text-amber-600 hover:text-amber-500 transition text-sm "
                href="/auth/forgot_password"
              >
                Forgot Password?
              </Link>
            }
          />
          {error && <p className="text-red-400/80 text-sm">{error}</p>}
          <SubmitButton className="!w-full" loading={form.processing}>
            Sign In
          </SubmitButton>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignIn
