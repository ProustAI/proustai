import { useForm } from '@inertiajs/react'
import { IconPhoto } from '@tabler/icons-react'
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '~/components/dialog'
import InputField from '~/components/input_field'
import SubmitButton from '~/components/submit_button'
import usePageProps from '~/hooks/use_page_props'
import useParams from '~/hooks/use_params'
import type Location from '#types/location'

export default function GenerateLocationImageDialog({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (v: boolean) => void
}) {
  const { currentLocation } = usePageProps<{ currentLocation: Location }>()
  const params = useParams()
  const form = useForm({
    prompt: `photo ${currentLocation.name}, ${currentLocation.description}, realistic, high-quality, landscape`,
  })
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.post(`/novels/${params.novelId}/locations/${currentLocation.id}/generate_image`, {
      onSuccess: () => setOpen(false),
    })
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <IconPhoto className="w-4 h-4" />
              <span>Generate Image</span>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="space-y-2 px-6 py-4">
            <InputField
              textarea
              id="prompt"
              label="Prompt"
              value={form.data.prompt}
              onChange={(e) => form.setData('prompt', e.target.value)}
            />
          </DialogDescription>
          <DialogFooter>
            <SubmitButton loading={form.processing}>Start Generating</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
