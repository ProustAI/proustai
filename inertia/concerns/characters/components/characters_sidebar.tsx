import * as React from 'react'
import usePageProps from '~/hooks/use_page_props'
import { IconCirclePlus } from '@tabler/icons-react'

import CharacterSidebarItem from './character_sidebar_item'
import NewCharacterDialog from './new_character_dialog'

interface CharactersSidebarProps {}

const CharactersSidebar: React.FunctionComponent<CharactersSidebarProps> = () => {
  const [open, setOpen] = React.useState(false)
  const { novel, currentCharacter } = usePageProps<{ novel: any; currentCharacter: any }>()

  return (
    <div className="h-screen overflow-y-auto bg-zinc-900 w-72 border-l border-zinc-400/20">
      <NewCharacterDialog novel={novel} open={open} setOpen={setOpen} />
      <ul className="flex flex-col">
        <div className="text-white font-semibold bg-zinc-800 py-3 px-5 border-b border-zinc-400/20 flex items-center space-x-2 justify-between">
          <span>Characters</span>
          <button
            className="primary-btn !px-2 !py-1 !border !border-white/25"
            onClick={() => setOpen(true)}
          >
            <span>Create</span>
            <IconCirclePlus className="h-4 w-4" />
          </button>
        </div>
        <ul className="flex flex-col">
          {novel.characters?.map((character: any) => (
            <CharacterSidebarItem
              key={character.id}
              character={character}
              novel={novel}
              currentCharacter={currentCharacter}
            />
          ))}
        </ul>
      </ul>
    </div>
  )
}

export default CharactersSidebar
