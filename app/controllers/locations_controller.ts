import ImageGeneration from '#models/image_generation'
import type { HttpContext } from '@adonisjs/core/http'

export default class LocationsController {
  async index({ auth, params, inertia, response }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .preload('locations', (query) => query.orderBy('name', 'asc'))
      .firstOrFail()
    if (novel.locations.length > 0) {
      return response.redirect(`/novels/${novel.id}/locations/${novel.locations[0].id}`)
    }
    return inertia.render('locations/edit', { novel })
  }

  async show({ auth, params, inertia }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .preload('locations', (query) => query.orderBy('name', 'asc'))
      .firstOrFail()

    const currentLocation = novel.locations.find((location) => location.id === params.locationId)
    if (currentLocation) {
      const imageGenerations = await ImageGeneration.query().where('locationId', currentLocation.id)
      return inertia.render('locations/edit', { novel, currentLocation, imageGenerations })
    }

    return inertia.render('locations/edit', { novel, currentLocation })
  }

  async store({ auth, params, request, response }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .firstOrFail()
    await novel.related('locations').create(request.all())

    return response.redirect().toRoute('novels.locations.index', { novelId: novel.id })
  }

  async update({ auth, params, request, response }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .firstOrFail()

    const location = await novel
      .related('locations')
      .query()
      .where('id', params.locationId)
      .firstOrFail()
    location.merge(request.all())
    await location.save()
    return response.redirect().back()
  }

  async destroy({ auth, params, response }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .firstOrFail()
    const location = await novel
      .related('locations')
      .query()
      .where('id', params.locationId)
      .firstOrFail()
    await location.delete()
    return response.redirect().toRoute('novels.locations.index', { novelId: location.novelId })
  }

  async generateImage({ auth, params, request, response }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .firstOrFail()
    const location = await novel
      .related('locations')
      .query()
      .where('id', params.locationId)
      .firstOrFail()
    const ig = await ImageGeneration.create({
      status: 'pending',
      prompt: request.input('prompt'),
      locationId: location.id,
    })
    // emitter.emit('generation', ig)

    return response.redirect().back()
  }

  async imageGenerationUpdates({ auth, params, response }: HttpContext) {
    response.setServerSentEventsHeaders()

    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .firstOrFail()
    const location = await novel
      .related('locations')
      .query()
      .where('id', params.locationId)
      .firstOrFail()
    // emitter.on(`location:${location.id}:generated`, (data) => {
    //   response.response.write(`data: ${JSON.stringify(data)}\n\n`)
    //   response.response.flushHeaders()
    // })

    response.response.on('close', () => {
      response.response.end()
    })

    return response.noContent()
  }
}