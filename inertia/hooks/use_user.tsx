import usePageProps from './use_page_props'
import type { User } from '#types/user'

export default function useUser() {
  const props = usePageProps<{
    user: User
  }>()

  return props.user
}
