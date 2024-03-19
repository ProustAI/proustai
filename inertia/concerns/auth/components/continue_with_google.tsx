import * as React from 'react'
import { IconBrandGoogleFilled } from '@tabler/icons-react'
import Spinner from '~/components/spinner'
import clsx from 'clsx'

interface ContinueWithGoogleProps {}

const ContinueWithGoogle: React.FunctionComponent<ContinueWithGoogleProps> = () => {
  const [loading, setLoading] = React.useState(false)
  return (
    <a
      className={clsx(
        'primary-btn cursor-pointer mt-4 horizontal center space-x-2',
        loading && 'opacity-70 pointer-events-none'
      )}
      href="/auth/google/redirect"
      onClick={() => setLoading(true)}
    >
      {loading ? <Spinner className="w-4 h-4" /> : <IconBrandGoogleFilled className="w-4 h-4" />}
      <span>Continue with Google</span>
    </a>
  )
}

export default ContinueWithGoogle
