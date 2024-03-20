import ImageGeneration from '#models/image_generation'
import User from '#models/user'

declare module '@adonisjs/core/types' {
  interface EventsList {
    'user:registered': User

    'image_generation:started': ImageGeneration

    [key: `character:${string}:image_generation`]: ImageGeneration
    [key: `location:${string}:image_generation`]: ImageGeneration
  }
}
