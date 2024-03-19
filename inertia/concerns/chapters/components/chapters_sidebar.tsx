import { useForm } from '@inertiajs/react'
import clsx from 'clsx'
import * as React from 'react'
import usePageProps from '~/hooks/use_page_props'
import { IconCirclePlus, IconTrash } from '@tabler/icons-react'
import SubmitButton from '~/components/submit_button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/dialog'
import Spinner from '~/components/spinner'

interface ChaptersSidebarProps {}

const ChaptersSidebar: React.FunctionComponent<ChaptersSidebarProps> = () => {
  const { novel, currentChapter } = usePageProps<{ novel: any; currentChapter: any }>()
  const form = useForm()
  const handleAddChapter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post(`/novels/${novel.id}/chapters`, {
      onSuccess: () => {
        form.reset()
      },
    })
  }
  return (
    <div className="h-screen overflow-y-auto bg-zinc-900 w-72 border-l border-zinc-400/20">
      <ul className="flex flex-col">
        <p className="text-white text-lg font-bold bg-zinc-800 py-4 px-5 border-b border-zinc-400/20">
          Manuscript
        </p>
        <form
          className="text-white font-semibold bg-zinc-800 py-3 px-5 border-b border-zinc-400/20 flex items-center space-x-2 justify-between"
          onSubmit={handleAddChapter}
        >
          <span>Chapters</span>
          <SubmitButton
            className="primary-btn !px-2 !py-1 !border !border-white/25"
            icon={<IconCirclePlus className="h-4 w-4" />}
            loading={form.processing}
          >
            Add
          </SubmitButton>
        </form>
        <ul className="flex flex-col">
          {novel.chapters.map((chapter: any) => {
            return (
              <ChapterItem
                key={chapter.id}
                chapter={chapter}
                novel={novel}
                currentChapter={currentChapter}
              />
            )
          })}
        </ul>
      </ul>
    </div>
  )
}

export default ChaptersSidebar

function ChapterItem({
  chapter,
  novel,
  currentChapter,
}: {
  chapter: any
  novel: any
  currentChapter: any
}) {
  const deleteChapterForm = useForm()
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <a key={chapter.id} href={`/novels/${novel.id}/chapters/${chapter.id}/edit`}>
        <li
          className={clsx(
            'text-white py-3 flex space-x-2 justify-between text-sm px-5 border-b border-zinc-400/20 cursor-pointer transition',
            currentChapter && currentChapter.id === chapter.id ? ' bg-zinc-800' : ' '
          )}
        >
          <span>{chapter.title}</span>
          <button
            onClick={(e) => {
              e.preventDefault()
              setOpen(true)
            }}
          >
            <IconTrash className="h-4 w-4 text-red-400 hover:text-red-300 transition" />
          </button>

          <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
            <DialogContent className="sm:max-w-[425px] rounded-md !gap-0 !p-0 !pt-4">
              <DialogHeader>
                <DialogTitle>Delete chapter</DialogTitle>

                <DialogDescription>Are you sure you want to delete this chapter?</DialogDescription>
              </DialogHeader>

              <div className="py-4 px-6">
                <button
                  className="danger-btn !w-auto"
                  disabled={deleteChapterForm.processing}
                  onClick={(e) => {
                    e.preventDefault()
                    deleteChapterForm.delete(`/novels/${novel.id}/chapters/${chapter.id}`, {
                      onSuccess: () => {
                        setOpen(false)
                      },
                    })
                  }}
                >
                  {deleteChapterForm.processing && <Spinner className="w-4 h-4" />}
                  <span>Delete Chapter</span>
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </li>
      </a>
    </>
  )
}
