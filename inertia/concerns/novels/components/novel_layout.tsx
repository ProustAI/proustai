import { Link } from '@inertiajs/react'
import * as React from 'react'
import AccountDropdown from '~/components/account_dropdown'
import { Toaster } from '~/components/toaster'
import NovelSidebar from '~/concerns/novels/components/novel_sidebar'

interface NovelLayoutProps extends React.PropsWithChildren {
  sidebar?: React.ReactNode
}

const NovelLayout: React.FunctionComponent<NovelLayoutProps> = ({ children, sidebar }) => {
  return (
    <>
      <Toaster />
      <main className="horizontal">
        <NovelSidebar />
        {sidebar}
        <div className="w-full overflow-y-auto max-h-screen">
          <div className="py-3 px-6 flex items-center justify-between w-full">
            <Link className="hover:opacity-75 transition" href="/novels">
              <img className="h-16 w-auto" src="/logo.webp" alt="Logo" />
            </Link>
            <div className="bg-black text-white rounded-full">
              <AccountDropdown />
            </div>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </main>
    </>
  )
}

export default NovelLayout
