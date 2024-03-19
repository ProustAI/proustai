import * as React from 'react'
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'

interface MenuItemProps {
  icon?: string | React.ReactNode
  title?: string
  action?: () => void
  isActive?: () => boolean
  type?: string
}

const MenuItem: React.FunctionComponent<MenuItemProps> = ({ isActive, icon, action, title }) => {
  if (typeof icon !== 'string') return icon
  return (
    <button
      className={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
      onClick={action}
      title={title}
    >
      <svg className="remix">
        <use xlinkHref={`${remixiconUrl}#ri-${icon}`} />
      </svg>
    </button>
  )
}

export default MenuItem
