import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const [firstPart, ...rest] = name.split('/')
      const pages = import.meta.glob('../**/pages/*.tsx', { eager: true })
      return pages[`../concerns/${firstPart}/pages/${rest.join('/')}.tsx`]
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}
