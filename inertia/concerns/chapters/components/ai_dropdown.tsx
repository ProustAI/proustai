import type { Editor } from '@tiptap/react'
import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/dropdown_menu'
import clsx from 'clsx'
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
import { Link } from '@inertiajs/react'
import {
  IconArrowsMinimize,
  IconChecks,
  IconDots,
  IconMinimize,
  IconRefresh,
} from '@tabler/icons-react'

interface AiDropdownProps {
  editor: Editor
}

const AiDropdown: React.FunctionComponent<AiDropdownProps> = ({ editor }) => {
  const { empty: selectionIsEmpty, from: selectionFrom, to: selectionTo } = editor.state.selection
  const selectionContainsText = editor.state.doc.textBetween(selectionFrom, selectionTo, ' ')
  const isDisabled = selectionIsEmpty || !selectionContainsText

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isDisabled}>
        <button className={clsx('menu-item relative', isDisabled && 'opacity-50 !cursor-default')}>
          {!isDisabled && (
            <div className={'absolute top-0 right-0 transform -translate-x-1 -translate-y-0.5'}>
              <div className="absolute pl-1 pr-[6px] text-[0.75rem] bg-amber-500 text-white rounded-md font-semibold">
                AI
              </div>
            </div>
          )}
          <svg className="remix">
            <use xlinkHref={`${remixiconUrl}#ri-bard-line`} />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 !border-white/30 bg-black">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="!font-extrabold text-white">AI Tools</DropdownMenuLabel>
          <DropdownMenuSeparator className="!bg-white/30" />{' '}
          <Link href="/billing">
            <DropdownMenuItem className="cursor-pointer font-semibold">
              <IconChecks className="mr-2 h-4 w-4" />
              <span>Complete</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer font-semibold">
              <IconArrowsMinimize className="mr-2 h-4 w-4" />
              <span>Shorten</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer font-semibold">
              <IconDots className="mr-2 h-4 w-4" />
              <span>Extend</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer font-semibold">
              <IconRefresh className="mr-2 h-4 w-4" />
              <span>Rephrase</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer font-semibold">
              <IconMinimize className="mr-2 h-4 w-4" />
              <span>Simplify</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AiDropdown
