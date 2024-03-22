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
import { IconChecks, IconMinimize, IconRefresh } from '@tabler/icons-react'
import useParams from '~/hooks/use_params'
import UpgradeDialog from '~/concerns/billing/components/upgrade_dialog'
import useUser from '~/hooks/use_user'

interface AiDropdownProps {
  editor: Editor
}

const AiDropdown: React.FunctionComponent<AiDropdownProps> = ({ editor }) => {
  const { empty: selectionIsEmpty, from: selectionFrom, to: selectionTo } = editor.state.selection
  const selectionContainsText = editor.state.doc.textBetween(selectionFrom, selectionTo, ' ')
  const isDisabled = selectionIsEmpty || !selectionContainsText
  const params = useParams()
  const [open, setOpen] = React.useState(false)
  const user = useUser()

  const ensureActivePaidSubscription = () => {
    if (!user.activePaidSubscription) {
      setOpen(true)
      return false
    }

    return true
  }

  const onCompleteClick = async () => {
    if (!ensureActivePaidSubscription()) return

    const from = editor.state.selection.from
    let to = editor.state.selection.to

    const selectedText = editor.state.doc.textBetween(from, to, ' ')
    const response = await fetch(
      `/novels/${params.novelId}/chapters/${params.chapterId}/complete`,
      {
        method: 'POST',
        headers: { 'Accept': 'text/event-stream', 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: selectedText }),
      }
    )
    const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader()

    reader.read().then(function processText({ value, done }): any {
      if (done) return

      editor.chain().insertContentAt(to, value).run()
      to += value.length

      return reader.read().then(processText)
    })
  }

  const onSimplifyClick = async () => {
    if (!ensureActivePaidSubscription()) return

    let from = editor.state.selection.from
    let to = editor.state.selection.to

    const selectedText = editor.state.doc.textBetween(from, to, ' ')
    const response = await fetch(
      `/novels/${params.novelId}/chapters/${params.chapterId}/complete`,
      {
        method: 'POST',
        headers: { 'Accept': 'text/event-stream', 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: `Rewrite this text by simplifying it: ${selectedText}` }),
      }
    )
    const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader()
    editor.commands.deleteRange({ from, to })

    reader.read().then(function processText({ value, done }): any {
      if (done) return

      editor.commands.insertContentAt(from, value)
      from += value.length

      return reader.read().then(processText)
    })
  }

  const onRephraseClick = async () => {
    if (!ensureActivePaidSubscription()) return

    let from = editor.state.selection.from
    let to = editor.state.selection.to

    const selectedText = editor.state.doc.textBetween(from, to, ' ')
    const response = await fetch(
      `/novels/${params.novelId}/chapters/${params.chapterId}/complete`,
      {
        method: 'POST',
        headers: { 'Accept': 'text/event-stream', 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: `Rewrite this text, and rephrase it: ${selectedText}` }),
      }
    )
    const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader()
    editor.commands.deleteRange({ from, to })

    reader.read().then(function processText({ value, done }): any {
      if (done) return

      editor.commands.insertContentAt(from, value)
      from += value.length

      return reader.read().then(processText)
    })
  }

  return (
    <>
      <UpgradeDialog open={open} setOpen={setOpen} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isDisabled}>
          <button
            className={clsx('menu-item relative', isDisabled && 'opacity-50 !cursor-default')}
          >
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
            <DropdownMenuItem className="cursor-pointer font-semibold" onClick={onCompleteClick}>
              <IconChecks className="mr-2 h-4 w-4" />
              <span>Complete</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer font-semibold" onClick={onRephraseClick}>
              <IconRefresh className="mr-2 h-4 w-4" />
              <span>Rephrase</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer font-semibold" onClick={onSimplifyClick}>
              <IconMinimize className="mr-2 h-4 w-4" />
              <span>Simplify</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default AiDropdown
