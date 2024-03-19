import * as React from 'react'
import { IconCash, IconChevronDown, IconLogout, IconSettings } from '@tabler/icons-react'
import useUser from '../hooks/use_user'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from './dropdown_menu'
import { Link } from '@inertiajs/react'
import isFeatureEnabled from '~/lib/is_feature_enabled'

interface AccountDropdownProps {}

const AccountDropdown: React.FunctionComponent<AccountDropdownProps> = () => {
  const user = useUser()
  const isBillingEnabled = isFeatureEnabled('billing')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center bg-zinc-800/70 rounded-full text-sm cursor-pointer hover:opacity-90 transition border border-zinc-400/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800/70 border-white border-2 text-zinc-200">
            <span className="font-medium">
              {user?.fullName
                ? user.fullName
                    .split(' ')
                    .map((name) => name.charAt(0).toUpperCase())
                    .join('')
                    .slice(0, 2)
                : ''}
            </span>
          </div>
          <div className="flex items-center space-x-2 pl-2 pr-4">
            <span>{user?.fullName}</span>
            <IconChevronDown className="h-4 w-4" />
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 !border-white/30 bg-black">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator className="!bg-white/30" />

        <DropdownMenuGroup>
          {isBillingEnabled && (
            <Link href="/billing">
              <DropdownMenuItem className="cursor-pointer">
                <IconCash className="mr-2 h-4 w-4" />

                <span>Billing</span>
              </DropdownMenuItem>
            </Link>
          )}

          <Link href="/settings">
            <DropdownMenuItem className="cursor-pointer">
              <IconSettings className="mr-2 h-4 w-4" />

              <span>Settings</span>
            </DropdownMenuItem>
          </Link>

          <form action="/auth/sign_out" method="POST">
            <button type="submit" hidden id="sign-out-button" />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => document.getElementById('sign-out-button')?.click()}
            >
              <IconLogout className="mr-2 h-4 w-4" />

              <span>Sign Out</span>
            </DropdownMenuItem>
          </form>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountDropdown
