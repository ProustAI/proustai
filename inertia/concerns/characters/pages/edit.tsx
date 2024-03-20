import * as React from 'react'
import NovelLayout from '~/concerns/novels/components/novel_layout'
import CharactersSidebar from '../components/characters_sidebar'
import Character from '#types/character'
import EditCharacterCard from '../components/edit_character_card'
import CharacterImagesCard from '../components/character_images_card'
import isFeatureEnabled from '~/lib/is_feature_enabled'

interface EditProps {
  currentCharacter: Character
}

const Edit: React.FunctionComponent<EditProps> = ({ currentCharacter }) => {
  const isImageGenerationEnabled = isFeatureEnabled('image_generation')
  return (
    <NovelLayout sidebar={<CharactersSidebar />}>
      {currentCharacter && (
        <div className="vertical space-y-8">
          <EditCharacterCard />
          {isImageGenerationEnabled && <CharacterImagesCard />}
        </div>
      )}
    </NovelLayout>
  )
}

export default Edit
