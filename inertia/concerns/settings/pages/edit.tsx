import MainLayout from '~/components/main_layout'
import * as React from 'react'
import EditSettingsCard from '../components/edit_settings_card'
import DeleteAccountCard from '../components/delete_account_card'

interface EditProps {}

const Edit: React.FunctionComponent<EditProps> = () => {
  return (
    <MainLayout
      header={
        <>
          <h1 className="mx-2 mt-10 mb-4 text-3xl font-bold">Settings.</h1>
        </>
      }
    >
      <div className="px-4 pt-6 pb-12 lg:px-10 space-y-10">
        <EditSettingsCard />
        <DeleteAccountCard />
      </div>
    </MainLayout>
  )
}

export default Edit
