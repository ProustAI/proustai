import Character from '#types/character'
import { useForm } from '@inertiajs/react'
import * as React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '~/components/card'
import InputField from '~/components/input_field'
import SelectField from '~/components/select_field'
import SubmitButton from '~/components/submit_button'
import usePageProps from '~/hooks/use_page_props'
import useParams from '~/hooks/use_params'
import useSuccessToast from '~/hooks/use_success_toast'

interface EditCharacterCardProps {}

const EditCharacterCard: React.FunctionComponent<EditCharacterCardProps> = () => {
  const params = useParams()
  const { currentCharacter } = usePageProps<{ currentCharacter: Character }>()
  const form = useForm({
    name: currentCharacter?.name,
    age: currentCharacter?.age,
    occupation: currentCharacter?.occupation,
    personality: currentCharacter?.personality,
    appearance: currentCharacter?.appearance,
    gender: currentCharacter?.gender || 'female',
  })
  const successToast = useSuccessToast()
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.patch(`/novels/${params.novelId}/characters/${currentCharacter.id}`, {
      onSuccess: () => successToast(),
    })
  }
  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Characters Settings</CardTitle>
        </CardHeader>
        <CardContent className="px-6 !pt-4 space-y-2">
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
        </CardContent>
        <CardFooter>
          <SubmitButton loading={form.processing}>Save Changes</SubmitButton>
        </CardFooter>
      </Card>
    </form>
  )
}

export default EditCharacterCard
