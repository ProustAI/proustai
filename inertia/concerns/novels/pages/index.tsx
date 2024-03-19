import * as React from 'react'
import MainLayout from '~/components/main_layout'
import useUser from '~/hooks/use_user'
import CreateNovelDialog from '../components/create_novel_dialog'
import { IconBook, IconCirclePlus } from '@tabler/icons-react'
import type Novel from '#types/novel'
import { Link } from '@inertiajs/react'
import { Card, CardContent, CardTitle } from '~/components/card'

interface IndexProps {
  novels: Novel[]
}

const Index: React.FunctionComponent<IndexProps> = ({ novels }) => {
  const [open, setOpen] = React.useState(false)
  const user = useUser()
  return (
    <MainLayout
      header={
        <div>
          <h1 className="mx-2 mt-10 mb-4 text-3xl font-bold">
            {user ? `Welcome back, ${user.fullName.split(' ')[0]}.` : 'Welcome to ProustAI'}
          </h1>
          <h2 className="mx-2 mb-10 text-xl">Continue writing your novel or start a new one.</h2>
        </div>
      }
    >
      <CreateNovelDialog open={open} setOpen={setOpen} />

      <div className="flex space-x-6 px-4 py-6 lg:px-10 items-center">
        <h1 className="text-3xl font-bold">Novels</h1>

        <button className="primary-btn" onClick={() => setOpen(true)}>
          <IconCirclePlus className="h-4 w-4" />
          <span>Create novel</span>
        </button>
      </div>

      <ul className="grid grid-cols-1 gap-6 px-4 lg:px-10 sm:grid-cols-2 md:grid-cols-3">
        {novels.map((novel) => (
          <Link
            key={novel.id}
            href={`/novels/${novel.id}`}
            className="hover:opacity-70 transition-opacity"
          >
            <Card>
              <CardContent>
                <CardTitle className="!text-lg">{novel.title}</CardTitle>
                <IconBook className="w-5 h-5 mt-2 text-black" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </ul>
    </MainLayout>
  )
}

export default Index
