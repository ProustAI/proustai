import * as React from 'react'
import MarketingLayout from '../components/marketing_layout'
import { Link } from '@inertiajs/react'
import { IconBrandGithub } from '@tabler/icons-react'
import isFeatureEnabled from '~/lib/is_feature_enabled'

interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  const signUpEnabled = isFeatureEnabled('sign_up')
  return (
    <MarketingLayout>
      <div className="min-h-[calc(100vh-112px)] mx-auto max-w-7xl items-center justify-between p-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        <div className="space-y-6 -mt-12">
          <h1 className="text-7xl font-semibold font-serif">Meet ProustAI.</h1>
          <h2 className="text-xl text-black">
            ProustAI is an <i>AI-powered</i> <b>writing assistant</b> that helps you write your next
            novel. Writing a novel used to be painful, but with ProustAI, it's never been easier.
          </h2>
          <div className="horizontal space-x-4">
            {signUpEnabled && (
              <Link href="/auth/sign_up" className="primary-btn">
                <span>Start writing</span> <span>→</span>
              </Link>
            )}
            <a href="https://github.com/alexisbouchez/proustai" className="secondary-btn">
              <IconBrandGithub className="w-4 h-4" />
              <span>Read The Code</span>
            </a>
          </div>
        </div>
        <div className="justify-end w-full hidden sm:flex">
          <img src="/illustration.webp" className="md:w-full max-w-4xl" />
        </div>
      </div>
    </MarketingLayout>
  )
}

export default Home
