import * as React from 'react'
import PricingArgumentItem from './pricing_argument_item'

interface ExplorerPricingCardProps extends React.PropsWithChildren {}

const ExplorerPricingCard: React.FunctionComponent<ExplorerPricingCardProps> = ({ children }) => {
  return (
    <div>
      <div className="flex max-w-96 flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-gray-900/5 bg-white border border-zinc-300/30">
        <h3 className="flex items-center text-sm font-semibold text-gray-900">
          <span className="font-serif text-lg">Explorer</span>
        </h3>
        <p className="relative mt-5 flex text-3xl tracking-tight text-gray-900">
          <span aria-hidden="false" className="transition duration-300">
            0€
          </span>
        </p>
        <p className="mt-3 text-sm text-gray-700">
          Explore the editor interface, and start writing without AI-based features.
        </p>
        <div className="order-last mt-6">
          <ul role="list" className="-my-2 divide-y text-sm divide-gray-200 text-gray-700">
            <PricingArgumentItem argument="Rich Text Editor" />
            <PricingArgumentItem argument="Characters Database" />
            <PricingArgumentItem argument="Locations Database" />
          </ul>
        </div>
        {children}
      </div>
    </div>
  )
}

export default ExplorerPricingCard
