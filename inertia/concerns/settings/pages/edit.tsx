import MainLayout from '~/components/main_layout'
import * as React from 'react'
import EditSettingsCard from '../components/edit_settings_card'
import DeleteAccountCard from '../components/delete_account_card'

interface EditProps {}

const Edit: React.FunctionComponent<EditProps> = () => {
  return (
    <MainLayout
      header={
        <div className="horizontal items-center space-x-8 mx-2 mt-10 mb-4">
          <h1 className="text-3xl font-bold">Settings.</h1>
        </div>
      }
    >
      <div className="pb-8 space-y-10">
        <EditSettingsCard />
        <DeleteAccountCard />
      </div>
    </MainLayout>
  )
}

export default Edit
