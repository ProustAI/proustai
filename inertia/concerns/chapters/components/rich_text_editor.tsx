import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { EditorContent, Extension, useEditor, type KeyboardShortcutCommand } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import useParams from '~/hooks/use_params'
import usePageProps from '~/hooks/use_page_props'
import RichTextMenubar from '~/concerns/chapters/components/rich_text_menubar'
import type Chapter from '#types/chapter'
import { useDebounce } from 'use-debounce'
import * as React from 'react'

export default function RichTextEditor() {
  const params = useParams()
  const { currentChapter } = usePageProps<{ currentChapter: Chapter }>()
  const completionExtension = Extension.create({
    addKeyboardShortcuts() {
      const tabCommand: KeyboardShortcutCommand = ({ editor }) => {
        fetch(`/novels/${params.novelId}/chapters/${params.chapterId}/complete`, {
          method: 'POST',
          headers: {
            'Accept': 'text/event-stream',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: editor.getText(),
          }),
        }).then((response) => {
          const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader()
          reader.read().then(function processText({ value, done }): any {
            if (done) return
            const transaction = editor.state.tr.insertText(
              value,
              editor.state.selection.from,
              editor.state.selection.to
            )
            editor.view.dispatch(transaction)
            return reader.read().then(processText)
          })
        })
        return true
      }
      return { Tab: tabCommand }
    },
  })

  const editor = useEditor({
    content: currentChapter.content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
      },
    },
    extensions: [StarterKit.configure(), Highlight, TaskList, TaskItem, completionExtension],
  })

  const [debouncedContent] = useDebounce(editor?.getHTML(), 5000)

  React.useEffect(() => {
    if (editor && debouncedContent !== currentChapter.content) {
      fetch(`/novels/${params.novelId}/chapters/${params.chapterId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: debouncedContent }),
      })
    }
  }, [debouncedContent])

  return (
    <div className="editor">
      {editor && <RichTextMenubar editor={editor} />}
      <EditorContent className="editor__content" editor={editor} />
    </div>
  )
}
