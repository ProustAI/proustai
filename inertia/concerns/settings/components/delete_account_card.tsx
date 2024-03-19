import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/card'
import { useForm } from '@inertiajs/react'
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

export default function DeleteAccountCard() {
  const form = useForm({})

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.delete('/settings')
  }

  return (
    <Card>
      <CardHeader className="">
        <CardTitle>Delete Account</CardTitle>
        <CardDescription className="mt-2">
          Once you delete your account, there is no going back. All your applications will be
          permanently deleted.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <button className="danger-btn">Delete Account</button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px] rounded-md !gap-0 !p-0 !pt-4">
            <DialogHeader>
              <DialogTitle>Delete Account</DialogTitle>

              <DialogDescription>Are you sure you want to delete your account?</DialogDescription>
            </DialogHeader>

            <form className="py-4 px-6" onSubmit={onSubmit}>
              <SubmitButton variant="danger" loading={form.processing}>
                Delete Account
              </SubmitButton>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
