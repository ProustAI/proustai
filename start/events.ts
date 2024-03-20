import emitter from '@adonisjs/core/services/emitter'

const ImageGenerationsListener = () => import('#listeners/image_generations_listener')
const UsersListener = () => import('#listeners/users_listener')

emitter.on('user:registered', [UsersListener, 'onRegistered'])
emitter.on('image_generation:started', [ImageGenerationsListener, 'onStarted'])
