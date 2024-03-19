import * as React from 'react'
import NovelLayout from '~/concerns/novels/components/novel_layout'
import ChaptersSidebar from '../components/chapters_sidebar'
import RichTextEditor from '../components/rich_text_editor'

interface EditProps {}

const Edit: React.FunctionComponent<EditProps> = () => {
  return (
    <NovelLayout sidebar={<ChaptersSidebar />}>
      <div className="vertical space-y-4">
        <p className="text-sm text-zinc-800">
          <strong>Hint:</strong> Type {'<'}Tab{'>'} key ⇥ to complete text from your cursor's
          position.
        </p>

        <RichTextEditor />
      </div>
    </NovelLayout>
  )
}

export default Edit
