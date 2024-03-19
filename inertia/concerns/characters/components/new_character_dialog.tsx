import { useForm } from '@inertiajs/react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '~/components/dialog'
import { DialogHeader, DialogFooter } from '~/components/dialog'
import InputField from '~/components/input_field'
import SelectField from '~/components/select_field'
import SubmitButton from '~/components/submit_button'

const NewCharacterDialog: React.FunctionComponent<{
  novel: any
  open: boolean
  setOpen: (v: boolean) => void
}> = ({ novel, open, setOpen }) => {
  const form = useForm({
    name: '',
    age: 21,
    occupation: '',
    personality: '',
    appearance: '',
    gender: 'female',
  })
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.post(`/novels/${novel.id}/characters`, {
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
            <DialogTitle>Create new character</DialogTitle>
          </DialogHeader>
          <DialogDescription className="space-y-2 px-6 py-5">
            <InputField
              label="Name"
              id="name"
              placeholder="Oriane de Guermantes"
              value={form.data.name}
              onChange={(e) => form.setData('name', e.currentTarget.value)}
            />
            <InputField
              label="Age"
              id="age"
              type="number"
              value={form.data.age}
              onChange={(e) => form.setData('age', Number.parseInt(e.currentTarget.value))}
            />
            <SelectField
              label="Gender"
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
              value={form.data.gender}
              onChange={(e) => form.setData('gender', e.currentTarget.value)}
            />
            <InputField
              label="Occupation"
              id="occupation"
              placeholder="Doctor"
              value={form.data.occupation}
              onChange={(e) => form.setData('occupation', e.currentTarget.value)}
            />
            <InputField
              label="Personality"
              id="personality"
              placeholder="Kind, caring, and intelligent"
              value={form.data.personality}
              onChange={(e) => form.setData('personality', e.currentTarget.value)}
            />
            <InputField
              label="Appearance"
              id="appearance"
              placeholder="Tall, blonde hair, and blue eyes"
              value={form.data.appearance}
              onChange={(e) => form.setData('appearance', e.currentTarget.value)}
            />
          </DialogDescription>
          <DialogFooter>
            <SubmitButton loading={form.processing}>Create Character</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewCharacterDialog
