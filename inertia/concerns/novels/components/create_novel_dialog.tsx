import * as React from 'react'
import { useForm } from '@inertiajs/react'
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from '~/components/dialog'
import InputField from '~/components/input_field'
import SubmitButton from '~/components/submit_button'

interface CreateNovelDialogProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateNovelDialog: React.FunctionComponent<CreateNovelDialogProps> = ({ open, setOpen }) => {
  const form = useForm({
    title: '',
    pitch: '',
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post('/novels', {
      onSuccess: () => {
        setOpen(false)
        form.reset()
      },
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] gap-0">
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-2xl font-bold">Create novel</h2>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 px-6 pt-0">
            <InputField
              label="Novel Title"
              id="title"
              className="!col-span-3 w-full"
              value={form.data.title}
              placeholder="Swann's Way"
              onChange={(e) => form.setData('title', e.target.value)}
            />
            <InputField
              label="Novel's Pitch"
              optional
              id="pitch"
              className="!col-span-3 w-full"
              value={form.data.pitch}
              textarea
              onChange={(e) => form.setData('pitch', e.target.value)}
              placeholder="As a young man becomes enraptured by his memories, he must navigate the tangled webs of love, jealousy, and social expectations."
              rows={3}
            />
          </div>

          <DialogFooter>
            <SubmitButton loading={form.processing}>
              <span>Create novel</span>
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateNovelDialog
