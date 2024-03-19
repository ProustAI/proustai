import Novel from '#types/novel'
import { useForm } from '@inertiajs/react'
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

const NewLocationDialog: React.FunctionComponent<{
  novel: Novel
  open: boolean
  setOpen: (v: boolean) => void
}> = ({ novel, open, setOpen }) => {
  const form = useForm({
    name: '',
    description: '',
  })
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.post(`/novels/${novel.id}/locations`, {
      onSuccess: () => {
        setOpen(false)
        form.reset()
      },
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Create new location</DialogTitle>
          </DialogHeader>
          <DialogDescription className="space-y-2 px-6 py-5">
            <InputField
              label="Name"
              id="name"
              placeholder="La Vivonne"
              value={form.data.name}
              onChange={(e) => form.setData('name', e.currentTarget.value)}
            />
            <InputField
              textarea
              label="Description"
              id="description"
              placeholder="River that flows through Montjouvain and Combray."
              value={form.data.description}
              onChange={(e) => form.setData('description', e.currentTarget.value)}
            />
          </DialogDescription>
          <DialogFooter>
            <SubmitButton loading={form.processing}>Create Location</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewLocationDialog
