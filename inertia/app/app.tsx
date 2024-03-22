import '../css/app.css'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'

const appName = import.meta.env.VITE_APP_NAME || 'ProustAI'

createInertiaApp({
  progress: { color: '#a16207' },

  title: (title) => (title ? `${title} - ${appName}` : appName),

  resolve: (name) => {
    const [firstPart, ...rest] = name.split('/')
    const pages = import.meta.glob('../**/pages/*.tsx', { eager: true })
    return pages[`../concerns/${firstPart}/pages/${rest.join('/')}.tsx`]
  },

  setup({ el, App, props }) {
    const root = createRoot(el)
    root.render(<App {...props} />)
  },
})
