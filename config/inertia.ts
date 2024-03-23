import FeatureFlagsService from '#services/feature_flags_service'
import { defineConfig } from '@adonisjs/inertia'

export default defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    errors: (ctx) => ctx.session?.flashMessages.get('errors'),
    user: async (ctx) => {
      if (!ctx.auth.user) {
        return null
      }

      if (!FeatureFlagsService.isFeatureEnabled('billing')) {
        return { ...ctx.auth.user.serialize(), activePaidSubscription: true }
      }

      return {
        ...ctx.auth.user.serialize(),
        activePaidSubscription: ctx.auth.user ? await ctx.auth.user.hasPaidPlan() : false,
      }
    },
    qs: (ctx) => ctx.request.qs(),
    features: () => {
      return FeatureFlagsService.getFeatureFlagsValues()
    },
    params: (ctx) => ctx.params,
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: false,
    entrypoint: 'inertia/app/ssr.tsx',
  },
})
