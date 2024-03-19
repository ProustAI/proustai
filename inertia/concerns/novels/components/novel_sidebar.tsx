import useParams from '../../../hooks/use_params'
import { Link } from '@inertiajs/react'
import { IconMap, IconPencil, IconSettings, IconUserFilled } from '@tabler/icons-react'
import clsx from 'clsx'
import * as React from 'react'

interface NovelSidebarProps {}

const NovelSidebar: React.FunctionComponent<NovelSidebarProps> = () => {
  const params = useParams()
  const items = [
    {
      icon: IconPencil,
      path: `/novels/${params.novelId}`,
      isCurrent:
        window.location.pathname === `/novels/${params.novelId}` ||
        window.location.pathname === `/novels/${params.novelId}/chapters/${params.chapterId}/edit`,
    },
    {
      icon: IconUserFilled,
      path: `/novels/${params.novelId}/characters`,
      isCurrent: window.location.pathname.startsWith(`/novels/${params.novelId}/characters`),
    },
    {
      icon: IconMap,
      path: `/novels/${params.novelId}/locations`,
      isCurrent: window.location.pathname.startsWith(`/novels/${params.novelId}/locations`),
    },
    {
      icon: IconSettings,
      path: `/novels/${params.novelId}/edit`,
      isCurrent: window.location.pathname.startsWith(`/novels/${params.novelId}/edit`),
    },
  ]
  return (
    <div className="min-h-screen bg-black p-3">
      <ul className="flex flex-col space-y-3">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className={clsx(
              'p-2 bg-zinc-400/10 cursor-pointer inline-flex w-auto gap-0.5 items-center space-x-1 justify-center overflow-hidden text-sm font-medium transition rounded-md text-zinc-400 ring-1 ring-inset ring-zinc-400/20 hover:bg-zinc-400/10 hover:text-zinc-300 hover:ring-zinc-300 disabled:hover:text-zinc-400 disabled:hover:ring-zinc-400/20 disabled:opacity-70 disabled:cursor-not-allowed',
              item.isCurrent ? '!text-zinc-300 !ring-zinc-300' : ''
            )}
          >
            <item.icon className="h-5 w-5" />
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default NovelSidebar
