import Location from '#types/location'
import { useForm } from '@inertiajs/react'
import * as React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '~/components/card'
import InputField from '~/components/input_field'
import SubmitButton from '~/components/submit_button'
import usePageProps from '~/hooks/use_page_props'
import useParams from '~/hooks/use_params'
import useSuccessToast from '~/hooks/use_success_toast'

interface LocationSettingsCardProps {}

const LocationSettingsCard: React.FunctionComponent<LocationSettingsCardProps> = () => {
  const { currentLocation } = usePageProps<{ currentLocation: Location }>()
  const params = useParams()
  const form = useForm({
    name: currentLocation.name,
    description: currentLocation.description,
  })
  const successToast = useSuccessToast()
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.patch(`/novels/${params.novelId}/locations/${currentLocation.id}`, {
      onSuccess: () => successToast(),
    })
  }
  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Location Settings</CardTitle>
        </CardHeader>
        <CardContent className="px-6 !pt-4 space-y-2">
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
            value={form.data.description}
            onChange={(e) => form.setData('description', e.currentTarget.value)}
          />
        </CardContent>
        <CardFooter>
          <SubmitButton loading={form.processing}>Save Changes</SubmitButton>
        </CardFooter>
      </Card>
    </form>
  )
}

export default LocationSettingsCard
