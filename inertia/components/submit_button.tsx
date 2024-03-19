import * as React from 'react'
import Spinner from './spinner'
import clsx from 'clsx'

interface SubmitButtonProps extends React.PropsWithChildren {
  className?: string
  loading?: boolean
  variant?: 'primary' | 'danger'
  icon?: React.ReactNode
}

const SubmitButton: React.FunctionComponent<SubmitButtonProps> = ({
  className,
  children,
  loading,
  variant,
  icon,
}) => {
  return (
    <button
      className={clsx(className, variant === 'danger' ? 'danger-btn' : 'primary-btn')}
      type="submit"
      disabled={loading}
    >
      {loading && <Spinner className="w-4 h-4" />}
      {!loading && icon}
      <span>{children}</span>
    </button>
  )
}

export default SubmitButton
