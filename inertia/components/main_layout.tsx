import * as React from 'react'
import AccountDropdown from './account_dropdown'
import { Link } from '@inertiajs/react'
import { Toaster } from './toaster'

interface MainLayoutProps extends React.PropsWithChildren {
  header?: React.ReactNode
}

const MainLayout: React.FunctionComponent<MainLayoutProps> = ({ children, header }) => {
  return (
    <main className="antialiased selection:bg-opium-300/30">
      <Toaster />
      <header className="bg-black text-white">
        <div className="mx-auto max-w-5xl p-4 lg:px-8">
          <nav className="flex items-center justify-between" aria-label="Global">
            <div className="flex lg:flex-1">
              <Link href="/novels" className="p-1.5 hover:opacity-75 transition">
                <span className="sr-only">ProustAI</span>
                <img className="h-16 w-auto" src="/logo_white.webp" alt="Logo" />
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-opium-700"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-12">
              <AccountDropdown />
            </div>
          </nav>
          {header}
        </div>
        <div className="lg:hidden" role="dialog" aria-modal="true"></div>
      </header>

      <div className="bg-amber-50/80">
        <div className=" mx-auto max-w-5xl">
          <div className="px-4 py-6 lg:px-10">{children}</div>
        </div>
      </div>
    </main>
  )
}

export default MainLayout
