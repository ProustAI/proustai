/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const MarketingController = () => import('#controllers/marketing_controller')
const SignUpController = () => import('#controllers/sign_up_controller')
const SignInController = () => import('#controllers/sign_in_controller')
const GoogleAuthController = () => import('#controllers/google_auth_controller')
const ForgotPasswordController = () => import('#controllers/forgot_password_controller')
const ResetPasswordController = () => import('#controllers/reset_password_controller')
const SignOutController = () => import('#controllers/sign_out_controller')
const SettingsController = () => import('#controllers/settings_controller')
const NovelsController = () => import('#controllers/novels_controller')
const CharactersController = () => import('#controllers/characters_controller')
const LocationsController = () => import('#controllers/locations_controller')
const ChaptersController = () => import('#controllers/chapters_controller')
const BillingController = () => import('#controllers/billing_controller')

/**
 * Marketing routes.
 */
router.get('/', [MarketingController, 'home'])
router.get('/pricing', [MarketingController, 'pricing'])

/**
 * Authentication routes.
 */
router.get('/auth/sign_up', [SignUpController, 'show'])
router.post('/auth/sign_up', [SignUpController, 'handle'])

router.get('/auth/sign_in', [SignInController, 'show'])
router.post('/auth/sign_in', [SignInController, 'handle'])

router.get('/auth/google/redirect', [GoogleAuthController, 'redirect'])
router.get('/auth/google/callback', [GoogleAuthController, 'callback'])

router.get('/auth/forgot_password', [ForgotPasswordController, 'show'])
router.post('/auth/forgot_password', [ForgotPasswordController, 'handle'])

router.get('/auth/reset_password/:email', [ResetPasswordController, 'show'])
router.post('/auth/reset_password/:email', [ResetPasswordController, 'handle'])

router.post('/auth/sign_out', [SignOutController, 'handle'])

/**
 * Settings.
 */
router.get('/settings', [SettingsController, 'edit']).as('settings.edit').use(middleware.auth())
router
  .patch('/settings', [SettingsController, 'update'])
  .as('settings.update')
  .use(middleware.auth())
router
  .post('/settings/delete', [SettingsController, 'destroy'])
  .as('settings.destroy')
  .use(middleware.auth())

/**
 * Novels.
 */
router
  .resource('novels', NovelsController)
  .params({ novels: 'novelId' })
  .use('*', middleware.auth())

/**
 * Chapters.
 */
router
  .resource('novels.chapters', ChaptersController)
  .params({ novels: 'novelId', chapters: 'chapterId' })
  .except(['index', 'show'])
  .use('*', middleware.auth())
router
  .post('/novels/:novelId/chapters/:chapterId/complete', [ChaptersController, 'complete'])
  .use(middleware.auth())

/**
 * Characters.
 */
router
  .resource('novels.characters', CharactersController)
  .params({ novels: 'novelId', characters: 'characterId' })
  .use('*', middleware.auth())
router
  .post('/novels/:novelId/characters/:characterId/generate_image', [
    CharactersController,
    'generateImage',
  ])
  .use(middleware.auth())
router
  .get('/novels/:novelId/characters/:characterId/image_generations_updates', [
    CharactersController,
    'imageGenerationUpdates',
  ])
  .use(middleware.auth())

/**
 * Locations.
 */
router
  .resource('novels.locations', LocationsController)
  .params({ novels: 'novelId', locations: 'locationId' })
  .use('*', middleware.auth())
router
  .post('/novels/:novelId/locations/:locationId/generate_image', [
    LocationsController,
    'generateImage',
  ])
  .use(middleware.auth())
router
  .get('/novels/:novelId/locations/:locationId/image_generations_updates', [
    LocationsController,
    'imageGenerationUpdates',
  ])
  .use(middleware.auth())

/**
 * Billing.
 */
router.get('/billing', [BillingController, 'show']).as('billing.show').use(middleware.auth())
router
  .get('/billing/manage', [BillingController, 'manage'])
  .as('billing.manage')
  .use(middleware.auth())
router
  .get('/billing/upgrade', [BillingController, 'upgrade'])
  .as('billing.upgrade')
  .use(middleware.auth())
