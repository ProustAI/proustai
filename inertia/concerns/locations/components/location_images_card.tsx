import { IconPhoto } from '@tabler/icons-react'
import * as React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '~/components/card'
import GenerateLocationImageDialog from './generate_location_image_dialog'
import usePageProps from '~/hooks/use_page_props'
import ImageGeneration from '#types/image_generation'
import useParams from '~/hooks/use_params'

interface LocationImagesCardProps {}

const LocationImagesCard: React.FunctionComponent<LocationImagesCardProps> = () => {
  const [showGenerateDialog, setShowGenerateDialog] = React.useState(false)
  const params = useParams()
  const { imageGenerations: initialImageGenerations } = usePageProps<{
    imageGenerations: ImageGeneration[]
  }>()
  const [imageGenerations, setImageGenerations] = React.useState(initialImageGenerations)

  React.useEffect(() => {
    const es = new EventSource(
      `/novels/${params.novelId}/locations/${params.locationId}/image_generations_updates`
    )

    es.onmessage = (event) => {
      setImageGenerations((prev) => {
        const data = JSON.parse(event.data)

        /**
         * Add if not exist, update if exist.
         */
        const index = prev.findIndex((imageGeneration) => imageGeneration.id === data.id)
        if (index === -1) {
          return [...prev, data]
        }
        return prev.map((imageGeneration) => {
          if (imageGeneration.id === data.id) {
            return data
          }
          return imageGeneration
        })
      })
    }

    return () => es.close()
  }, [params])

  return (
    <>
      <GenerateLocationImageDialog open={showGenerateDialog} setOpen={setShowGenerateDialog} />

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
            <ul className="grid grid-cols-auto-fill-64 gap-4">
              {imageGenerations.map((imageGeneration) => (
                <div key={imageGeneration.id}>
                  {imageGeneration.status === 'completed' && (
                    <div className="aspect-square bg-amber-50/80 border border-zinc-300/50 rounded-xl h-64 w-auto">
                      <img
                        className="object-cover rounded-xl"
                        src={imageGeneration.imageLocation}
                      />
                    </div>
                  )}
                  {imageGeneration.status === 'pending' && (
                    <div className="bg-amber-50/80 border border-zinc-300/50 aspect-square rounded-xl flex justify-center items-center h-64 w-64">
                      <div>
                        <span className="loading loading-spinner loading-lg text-gray-600"></span>
                      </div>
                    </div>
                  )}
                  {imageGeneration.status === 'failed' && (
                    <div className="aspect-square bg-red-50/80 border border-zinc-300/50 rounded-xl h-64 w-auto">
                      <div className="flex justify-center items-center h-full">
                        <span className="text-red-600">Failed</span>
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

export default LocationImagesCard
