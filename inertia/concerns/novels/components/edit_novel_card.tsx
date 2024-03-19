import { useForm } from '@inertiajs/react'
import * as React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/card'
import useSuccessToast from '~/hooks/use_success_toast'
import InputField from '~/components/input_field'
import SubmitButton from '~/components/submit_button'
import usePageProps from '~/hooks/use_page_props'

export default function EditNovelCard() {
  const { novel } = usePageProps<{ novel: any }>()
  const successToast = useSuccessToast()

  const form = useForm({
    title: novel.title,
    pitch: novel.pitch,
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.patch('/novels/' + novel.id, {
      onSuccess: () => successToast(),
    })
  }

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <Card>
        <CardHeader>
          <CardTitle>Edit Novel</CardTitle>
        </CardHeader>
        <CardContent className="px-0 !pt-4 space-y-4 divide-y divide-zinc-300/20">
          <div className="space-y-4 px-6">
            <InputField
              label="Title"
              id="title"
              type="text"
              placeholder="Swann's Way"
              value={form.data.title}
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
        </CardContent>
        <CardFooter>
          <SubmitButton loading={form.processing}>Save Changes</SubmitButton>
        </CardFooter>
      </Card>
    </form>
  )
}
