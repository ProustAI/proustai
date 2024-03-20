import ImageGeneration from '#models/image_generation'
import type { HttpContext } from '@adonisjs/core/http'
import emitter from '@adonisjs/core/services/emitter'

export default class CharactersController {
  async index({ auth, params, inertia, response }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .preload('characters', (query) => query.orderBy('name', 'asc'))
      .firstOrFail()

    if (novel.characters.length > 0) {
      return response.redirect(`/novels/${novel.id}/characters/${novel.characters[0].id}`)
    }

    return inertia.render('characters/edit', { novel })
  }

  async show({ auth, params, inertia }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .preload('characters', (query) => query.orderBy('name', 'asc'))
      .firstOrFail()

    const currentCharacter = novel.characters.find(
      (character) => character.id === params.characterId
    )

    if (currentCharacter) {
      const imageGenerations = await ImageGeneration.query().where(
        'characterId',
        currentCharacter.id
      )

      return inertia.render('characters/edit', { novel, currentCharacter, imageGenerations })
    }

    return inertia.render('characters/edit', { novel, currentCharacter })
  }

  async store({ auth, params, request, response }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .firstOrFail()

    await novel.related('characters').create(request.all())

    return response.redirect().toRoute('novels.characters.index', { novelId: novel.id })
  }

  async update({ auth, params, request, response }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .firstOrFail()

    const character = await novel
      .related('characters')
      .query()
      .where('id', params.characterId)
      .firstOrFail()

    character.merge(request.all())

    await character.save()

    return response.redirect().back()
  }

  async destroy({ auth, params, response }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .firstOrFail()

    const character = await novel
      .related('characters')
      .query()
      .where('id', params.characterId)
      .firstOrFail()

    await character.delete()

    return response.redirect().toRoute('novels.characters.index', { novelId: character.novelId })
  }

  async generateImage({ auth, params, request, response }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .firstOrFail()

    const character = await novel
      .related('characters')
      .query()
      .where('id', params.characterId)
      .firstOrFail()

    await ImageGeneration.create({
      status: 'pending',
      prompt: request.input('prompt'),
      characterId: character.id,
    })

    return response.redirect().back()
  }

  async imageGenerationUpdates({ auth, params, response }: HttpContext) {
    response.setServerSentEventsHeaders()

    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .firstOrFail()

    const character = await novel
      .related('characters')
      .query()
      .where('id', params.characterId)
      .firstOrFail()

    emitter.on(`character:${character.id}:image_generation`, (ig) => {
      response.sendServerSentEvent(ig)
    })

    response.response.on('close', () => {
      response.response.end()
    })

    return response.noContent()
  }
}
