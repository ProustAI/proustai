import * as React from 'react'

interface PricingArgumentItemProps {
  argument: string
}

const PricingArgumentItem: React.FC<PricingArgumentItemProps> = ({ argument }) => {
  return (
    <li className="flex py-2 items-center">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 flex-none text-black">
        <path
          d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
          fill="currentColor"
        ></path>
        <circle
          cx="12"
          cy="12"
          r="8.25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></circle>
      </svg>
      <span className="ml-4">{argument}</span>
    </li>
  )
}

export default PricingArgumentItem
