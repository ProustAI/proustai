import * as React from 'react'
import { IconBrandDiscord, IconBrandGithub, IconBrandX } from '@tabler/icons-react'

interface FooterProps {}

const Footer: React.FunctionComponent<FooterProps> = () => {
  return (
    <footer className="bg-black pt-12 shadow-lg" aria-labelledby="footer-heading">
      <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <a
              className="-m-1.5 flex items-center space-x-4 p-1.5 text-white transition-opacity hover:opacity-75"
              href="/"
            >
              <span className="font-clash text-xl font-serif font-bold">ProustAI</span>
            </a>
            <p className="text-sm leading-6 text-zinc-50">Write your next novel with ProustAI.</p>
            <div className="flex items-center space-x-6">
              <a href="https://x.com/proust_ai" className="hover:opacity-75 transition">
                <span className="sr-only">X.com</span>
                <IconBrandX color="white" />
              </a>
              <a href="https://discord.gg/WnXDrQt9Ba" className="hover:opacity-75 transition">
                <IconBrandDiscord color="white" />
              </a>
              <a
                href="https://github.com/alexisbouchez/proustai"
                className="hover:opacity-75 transition"
              >
                <IconBrandGithub color="white" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-zinc-50">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a className="text-sm leading-6 text-zinc-50 hover:text-white" href="/pricing">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-zinc-50/10 pt-8">
          <p className="text-xs leading-5 text-zinc-50">
            © {new Date().getFullYear()} ProustAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
