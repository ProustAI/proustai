import * as React from 'react'
import MarketingLayout from '../components/marketing_layout'
import ExplorerPricingCard from '../components/pricing/explorer_pricing_card'
import WriterPricingCard from '../components/pricing/writer_pricing_card'
import { Link } from '@inertiajs/react'

interface PricingProps {}

const Pricing: React.FunctionComponent<PricingProps> = () => {
  return (
    <MarketingLayout>
      <div className="min-h-[calc(100vh-112px)] mx-auto max-w-5xl items-center justify-between p-6 lg:px-8">
        <h1 className="text-7xl font-semibold font-serif pt-10 text-center">Pricing.</h1>
        <h2 className="text-xl text-zinc-800 text-center mt-8">
          Start by exploring the editor for free.
          <br />
          Get a paid subscription to unlock AI-based features.
        </h2>

        <div className="grid lg:grid-cols-2 gap-x-16 pt-12 space-y-8 sm:space-y-0">
          <ExplorerPricingCard>
            <Link
              className="primary-btn w-full mt-4 space-x-2 horizontal center"
              href="/auth/sign_up"
            >
              <span>Start writing</span>
              <span>→</span>
            </Link>
          </ExplorerPricingCard>
          <WriterPricingCard>
            <Link
              className="primary-btn w-full mt-4 space-x-2 horizontal center"
              href="/auth/sign_up"
            >
              <span>Start writing</span>
              <span>→</span>
            </Link>
          </WriterPricingCard>
        </div>
      </div>
    </MarketingLayout>
  )
}

export default Pricing
