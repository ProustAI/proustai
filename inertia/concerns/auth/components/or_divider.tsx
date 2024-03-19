import * as React from 'react'

interface OrDividerProps {}

const OrDivider: React.FunctionComponent<OrDividerProps> = () => {
  return (
    <div className="relative mt-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-zinc-900"></div>
      </div>
      <div className="relative flex justify-center text-sm leading-5">
        <span className="px-2 text-zinc-900 bg-amber-50 text-xs">OR</span>
      </div>
    </div>
  )
}

export default OrDivider
