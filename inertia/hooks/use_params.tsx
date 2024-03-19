import usePageProps from '~/hooks/use_page_props'

export default function useParams() {
  const props = usePageProps<{
    params: Record<string, string>
  }>()

  return props.params
}
