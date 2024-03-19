import * as React from 'react'

interface AuthLayoutProps extends React.PropsWithChildren {}

const AuthLayout: React.FunctionComponent<AuthLayoutProps> = ({ children }) => {
  return (
    <main className="vertical center min-h-screen px-6 py-12 lg:px-8 space-y-4 max-w-md mx-auto">
      {children}
    </main>
  )
}

export default AuthLayout
