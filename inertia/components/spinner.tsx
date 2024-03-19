import { IconCircleDotted } from '@tabler/icons-react'
import clsx from 'clsx'
import * as React from 'react'

interface SpinnerProps {
  className?: string
}

const Spinner: React.FunctionComponent<SpinnerProps> = ({ className }) => {
  return <IconCircleDotted className={clsx('animate-spin', className)} />
}

export default Spinner
