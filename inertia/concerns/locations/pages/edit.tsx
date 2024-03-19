import * as React from 'react'
import NovelLayout from '~/concerns/novels/components/novel_layout'
import LocationsSidebar from '../components/locations_sidebar'
import Location from '#types/location'
import LocationImagesCard from '../components/location_images_card'
import LocationSettingsCard from '../components/location_settings_card'

interface EditProps {
  currentLocation: Location
}

const Edit: React.FunctionComponent<EditProps> = ({ currentLocation }) => {
  return (
    <NovelLayout sidebar={<LocationsSidebar />}>
      {currentLocation && (
        <div className="vertical space-y-8">
          <LocationSettingsCard />
          <LocationImagesCard />
        </div>
      )}
    </NovelLayout>
  )
}

export default Edit
