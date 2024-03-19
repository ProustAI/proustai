import usePageProps from '../hooks/use_page_props'

export default function isFeatureEnabled(featureKey: string): boolean {
  const pageProps = usePageProps<{ features: Record<string, boolean> }>()
  return !!pageProps.features[featureKey]
}
