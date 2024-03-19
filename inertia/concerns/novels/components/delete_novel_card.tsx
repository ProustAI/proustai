import { useForm } from '@inertiajs/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/card'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogTrigger,
  DialogContent,
} from '~/components/dialog'
import React from 'react'
import SubmitButton from '~/components/submit_button'
import usePageProps from '~/hooks/use_page_props'

export default function DeleteNovelCard() {
  const form = useForm({})
  const { novel } = usePageProps<{ novel: any }>()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.delete('/novels/' + novel.id)
  }

  return (
    <Card>
      <CardHeader className="">
        <CardTitle>Delete Novel</CardTitle>
        <CardDescription className="mt-2">
          Once you delete your novel, there is no going back. All your chapters will be permanently
          deleted.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <button className="danger-btn">Delete novel</button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px] rounded-md !gap-0 !p-0 !pt-4">
            <DialogHeader>
              <DialogTitle>Delete novel</DialogTitle>

              <DialogDescription>Are you sure you want to delete your novel?</DialogDescription>
            </DialogHeader>

            <form className="py-4 px-6" onSubmit={onSubmit}>
              <SubmitButton variant="danger" loading={form.processing}>
                Delete novel
              </SubmitButton>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
