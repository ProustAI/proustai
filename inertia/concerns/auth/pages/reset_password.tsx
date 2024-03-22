import * as React from 'react'
import AuthLayout from '../components/auth_layout'
import { Link } from '@inertiajs/react'

interface ResetPasswordProps {}

const ResetPassword: React.FunctionComponent<ResetPasswordProps> = () => {
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
    </AuthLayout>
  )
}

export default ResetPassword
