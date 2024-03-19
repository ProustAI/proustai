import { Link } from '@inertiajs/react'
import * as React from 'react'
import isFeatureEnabled from '~/lib/is_feature_enabled'

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  const isBillingEnabled = isFeatureEnabled('billing')

  return (
    <header>
      {/* Desktop  */}
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 hover:opacity-75 transition">
            <span className="sr-only">ProustAI</span>
            <img className="h-16 w-auto" src="/logo.webp" alt="Logo" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-12">
          {isBillingEnabled && (
            <Link
              href="/pricing"
              className="text-sm leading-6 font-medium text-black hover:opacity-75 transition"
            >
              Pricing
            </Link>
          )}
          <Link href="/auth/sign_up" className="primary-btn">
            <span>Start writing</span> <span>→</span>
          </Link>
        </div>
      </nav>

      {/* Mobile */}
      <div className="lg:hidden" role="dialog" aria-modal="true"></div>
    </header>
  )
}

export default Header
