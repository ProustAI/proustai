import Character from '#types/character'
import ImageGeneration from '#types/image_generation'
import { IconPhoto } from '@tabler/icons-react'
import * as React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '~/components/card'
import usePageProps from '~/hooks/use_page_props'
import useParams from '~/hooks/use_params'
import GenerateCharacterImageDialog from './generate_character_image_dialog'

interface CharacterImagesCardProps {}

const CharacterImagesCard: React.FunctionComponent<CharacterImagesCardProps> = () => {
  const { imageGenerations: initialImageGenerations, currentCharacter } = usePageProps<{
    imageGenerations: ImageGeneration[]
    currentCharacter: Character
  }>()
  const [showGenerateDialog, setShowGenerateDialog] = React.useState(false)
  const [imageGenerations, setImageGenerations] = React.useState(initialImageGenerations)
  const params = useParams()
  React.useEffect(() => {
    const es = new EventSource(
      `/novels/${params.novelId}/characters/${currentCharacter.id}/image-generations`
    )
    es.onmessage = (event) => {
      setImageGenerations((prev) => {
        const data = JSON.parse(event.data)
        return prev.map((imageGeneration) => {
          if (imageGeneration.id === data.id) {
            return data
          }
          return imageGeneration
        })
      })
    }
    return () => es.close()
  }, [currentCharacter.id])

  return (
    <>
      <GenerateCharacterImageDialog open={showGenerateDialog} setOpen={setShowGenerateDialog} />
      <Card>
        <CardHeader>
          <CardTitle className="flex space-x-4 items-center">
            <span>Images</span>
            <button
              className="primary-btn !rounded-md !px-2 !py-1"
              onClick={() => setShowGenerateDialog(true)}
            >
              <IconPhoto className="w-4 h-4" />
              <span>Visualize</span>
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 space-y-4">
          {imageGenerations.length !== 0 && (
            <ul className="grid gap-4">
              {imageGenerations.map((imageGeneration) => (
                <div key={imageGeneration.id}>
                  {imageGeneration.status === 'completed' && (
                    <div className="aspect-square bg-amber-50/80 border border-zinc-300/50 rounded-xl max-h-64 w-auto">
                      <img
                        className="object-cover rounded-xl"
                        src={imageGeneration.imageLocation}
                      />
                    </div>
                  )}
                  {imageGeneration.status === 'pending' && (
                    <div className="bg-amber-50/80 border border-zinc-300/50 aspect-square rounded-xl flex justify-center items-center max-h-64 w-auto">
                      <div>
                        <span className="loading loading-spinner loading-lg text-gray-600"></span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </ul>
          )}

          {imageGenerations.length === 0 && <p className="text-sm">No images yet.</p>}
        </CardContent>
      </Card>
    </>
  )
}

export default CharacterImagesCard
