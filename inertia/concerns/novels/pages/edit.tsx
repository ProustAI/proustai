import * as React from 'react'
import NovelLayout from '../components/novel_layout'
import EditNovelCard from '../components/edit_novel_card'
import DeleteNovelCard from '../components/delete_novel_card'

interface EditProps {}

const Edit: React.FunctionComponent<EditProps> = () => {
  return (
    <NovelLayout>
      <div className="vertical space-y-8">
        <EditNovelCard />
        <DeleteNovelCard />
      </div>
    </NovelLayout>
  )
}

export default Edit
