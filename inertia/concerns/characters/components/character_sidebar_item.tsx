import { useForm } from '@inertiajs/react'
import { IconTrash } from '@tabler/icons-react'
import clsx from 'clsx'
import React from 'react'
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '~/components/dialog'
import Spinner from '~/components/spinner'
import Character from '#types/character'
import Novel from '#types/novel'

export interface CharacterSidebarItemProps {
  character: Character
  novel: Novel
  currentCharacter: Character | null
}

export default function CharacterSidebarItem({
  character,
  novel,
  currentCharacter,
}: CharacterSidebarItemProps) {
  const deleteCharacterForm = useForm()
  const [open, setOpen] = React.useState(false)
  return (
    <a key={character.id} href={`/novels/${novel.id}/characters/${character.id}`}>
      <li
        className={clsx(
          'text-white py-3 flex space-x-2 justify-between text-sm px-5 border-b border-zinc-400/20 cursor-pointer transition',
          currentCharacter && currentCharacter.id === character.id ? ' bg-zinc-800' : ' '
        )}
      >
        <span>{character.name}</span>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()

            setOpen(true)
            e.preventDefault()
            e.stopPropagation()
            e.nativeEvent.stopImmediatePropagation()
            e.nativeEvent.stopPropagation()
          }}
        >
          <IconTrash className="h-4 w-4 text-red-400 hover:text-red-300 transition" />
        </button>

        <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
          <DialogContent className="sm:max-w-[425px] rounded-md !gap-0 !p-0 !pt-4">
            <DialogHeader>
              <DialogTitle>Delete character</DialogTitle>

              <DialogDescription>Are you sure you want to delete this character?</DialogDescription>
            </DialogHeader>

            <div className="py-4 px-6">
              <button
                className="danger-btn !w-auto"
                disabled={deleteCharacterForm.processing}
                onClick={(e) => {
                  e.preventDefault()
                  deleteCharacterForm.delete(`/novels/${novel.id}/characters/${character.id}`, {
                    onSuccess: () => {
                      setOpen(false)
                    },
                  })
                }}
              >
                {deleteCharacterForm.processing && <Spinner className="w-4 h-4" />}
                <span>Delete Character</span>
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </li>
    </a>
  )
}
