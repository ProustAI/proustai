import { useForm } from '@inertiajs/react'
import clsx from 'clsx'
import * as React from 'react'
import usePageProps from '~/hooks/use_page_props'
import { IconCirclePlus, IconTrash } from '@tabler/icons-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/dialog'
import Spinner from '~/components/spinner'
import Location from '#types/location'
import Novel from '#types/novel'
import NewLocationDialog from './new_location_dialog'

interface LocationsSidebarProps {}

const LocationsSidebar: React.FunctionComponent<LocationsSidebarProps> = () => {
  const [open, setOpen] = React.useState(false)
  const { novel, currentLocation } = usePageProps<{ novel: any; currentLocation: any }>()

  return (
    <div className="h-screen overflow-y-auto bg-zinc-900 w-72 border-l border-zinc-400/20">
      <NewLocationDialog novel={novel} open={open} setOpen={setOpen} />
      <ul className="flex flex-col">
        <div className="text-white font-semibold bg-zinc-800 py-3 px-5 border-b border-zinc-400/20 flex items-center space-x-2 justify-between">
          <span>Locations</span>
          <button
            className="primary-btn !px-2 !py-1 !border !border-white/25"
            onClick={() => setOpen(true)}
          >
            <span>Create</span>
            <IconCirclePlus className="h-4 w-4" />
          </button>
        </div>
        <ul className="flex flex-col">
          {novel.locations?.map((location: any) => (
            <LocationItem
              key={location.id}
              location={location}
              novel={novel}
              currentLocation={currentLocation}
            />
          ))}
        </ul>
      </ul>
    </div>
  )
}

export default LocationsSidebar

function LocationItem({
  location,
  novel,
  currentLocation,
}: {
  location: Location
  novel: Novel
  currentLocation: Location
}) {
  const deleteLocationForm = useForm()
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <a key={location.id} href={`/novels/${novel.id}/locations/${location.id}`}>
        <li
          className={clsx(
            'text-white py-3 flex space-x-2 justify-between text-sm px-5 border-b border-zinc-400/20 cursor-pointer transition',
            currentLocation && currentLocation.id === location.id ? ' bg-zinc-800' : ' '
          )}
        >
          <span>{location.name}</span>
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
                <DialogTitle>Delete location</DialogTitle>

                <DialogDescription>
                  Are you sure you want to delete this location?
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 px-6">
                <button
                  className="danger-btn !w-auto"
                  disabled={deleteLocationForm.processing}
                  onClick={(e) => {
                    e.preventDefault()
                    deleteLocationForm.delete(`/novels/${novel.id}/locations/${location.id}`, {
                      onSuccess: () => {
                        setOpen(false)
                      },
                    })
                  }}
                >
                  {deleteLocationForm.processing && <Spinner className="w-4 h-4" />}
                  <span>Delete Location</span>
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </li>
      </a>
    </>
  )
}
