import React from 'react'
import PricingArgumentItem from './pricing_argument_item'
import Spinner from '~/components/spinner'
import { useForm } from '@inertiajs/react'

interface WriterPricingCardProps extends React.PropsWithChildren {}

const WriterPricingCard: React.FunctionComponent<WriterPricingCardProps> = ({ children }) => {
  const managedForm = useForm()

  return (
    <div>
      <div className="flex  max-w-96 flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-gray-900/5 border border-zinc-300/30 bg-white">
        <h3 className="flex items-center text-sm font-semibold text-gray-900">
          <span className="font-serif text-lg">Writer</span>
        </h3>
        <p className="relative mt-5 flex text-3xl tracking-tight text-gray-900">
          <span aria-hidden="false" className="transition duration-300">
            30€
          </span>
        </p>
        <p className="mt-3 text-sm text-gray-700">
          Enhance your writing experience with AI-based features, and get access to the all
          features.
        </p>
        <div className="order-last mt-6">
          <ul role="list" className="-my-2 divide-y text-sm divide-gray-200 text-gray-700">
            <PricingArgumentItem argument="Rich Text Editor (+AI-based completion)" />
            <PricingArgumentItem argument="Characters Database (+AI-based generation and visualization)" />
            <PricingArgumentItem argument="Locations Database (+AI-based generation and visualization)" />
          </ul>
        </div>
        {children}
      </div>
    </div>
  )
}

export default WriterPricingCard
