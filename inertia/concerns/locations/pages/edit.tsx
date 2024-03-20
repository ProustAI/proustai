import * as React from 'react'
import NovelLayout from '~/concerns/novels/components/novel_layout'
import LocationsSidebar from '../components/locations_sidebar'
import Location from '#types/location'
import LocationImagesCard from '../components/location_images_card'
import LocationSettingsCard from '../components/location_settings_card'
import isFeatureEnabled from '~/lib/is_feature_enabled'

interface EditProps {
  currentLocation: Location
}

const Edit: React.FunctionComponent<EditProps> = ({ currentLocation }) => {
  const isImageGenerationEnabled = isFeatureEnabled('image_generation')

  return (
    <NovelLayout sidebar={<LocationsSidebar />}>
      {currentLocation && (
        <div className="vertical space-y-8">
          <LocationSettingsCard />
          {isImageGenerationEnabled && <LocationImagesCard />}
        </div>
      )}
    </NovelLayout>
  )
}

export default Edit
