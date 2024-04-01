import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import { OpenAI } from 'openai'
import Ollama from 'ollama'
import { inject } from '@adonisjs/core'
import BillingService from '#services/billing_service'
import FeatureFlagsService from '#services/feature_flags_service'

export default class ChaptersController {
  async store({ auth, params, response }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .preload('chapters', (query) => query.orderBy('order', 'asc'))
      .firstOrFail()

    const biggestOrder = novel.chapters.reduce((biggest, chapter) => {
      return chapter.order > biggest ? chapter.order : biggest
    }, 0)

    const chapter = await novel.related('chapters').create({
      title: 'Chapter ' + (biggestOrder + 1),
      order: biggestOrder + 1,
    })

    return response.redirect(`/novels/${novel.id}/chapters/${chapter.id}/edit`)
  }

  async edit({ auth, params, inertia }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .preload('chapters', (query) => query.orderBy('order', 'asc'))
      .firstOrFail()

    const currentChapter = novel.chapters.find((chapter) => chapter.id === params.chapterId)

    return inertia.render('chapters/edit', { novel, currentChapter })
  }

  async update({ auth, params, request, response }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .firstOrFail()

    const chapter = await novel
      .related('chapters')
      .query()
      .where('id', params.chapterId)
      .firstOrFail()

    const content = request.input('content')
    chapter!.content = content
    await chapter!.save()

    return response.noContent()
  }

  async destroy({ auth, params, response }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .preload('chapters', (query) => query.orderBy('order', 'asc'))
      .firstOrFail()

    const chapter = novel.chapters.find((c) => c.id === params.chapterId)
    await chapter!.delete()

    return response.redirect(`/novels/${novel.id}`)
  }

  @inject()
  async complete({ auth, params, request, response }: HttpContext, billingService: BillingService) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .preload('chapters', (query) => query.orderBy('order', 'asc'))
      .preload('characters')
      .preload('locations')
      .firstOrFail()

    if (FeatureFlagsService.isFeatureEnabled('billing')) {
      const currentBillingPeriod = await billingService.retrieveCurrentBillingPeriod(auth.user!)
      const canGenerate = await currentBillingPeriod.incrementNumberOfLLmGenerations()
      if (!canGenerate) {
        return response.badRequest(
          'You have reached the maximum number of generations for this billing period.'
        )
      }
    }

    const messages = [
      {
        role: 'system',
        content: `You are Marcel Proust, a famous french writer, known to write wonderful novels. 
        Your task is to complete the user's input to help him write his next novel.
        You should not speak to the writer himself, but only complete his text.
        Be creative and write in the style and language of the author.`,
      },
      {
        role: 'user',
        content:
          `The novel is titled "${novel.title}".` +
          (novel.pitch ? `The pitch is the following: ${novel.pitch}` : ''),
      },
      {
        role: 'user',
        content: `Here are the characters descriptions: ${novel.characters.map((c) => `${c.name} is a ${c.age} years. ${c.occupation}. ${c.personality}. ${c.appearance}.`).join(' ')}`,
      },
      {
        role: 'user',
        content: `Here are the locations descriptions: ${novel.locations.map((l) => `${l.name}. ${l.description}.`).join(' ')}`,
      },
      { role: 'user', content: request.input('content') },
    ]

    if (env.get('OPENAI_API_KEY')) {
      const openai = new OpenAI({
        apiKey: env.get('OPENAI_API_KEY'),
      })
      const responseStream = await openai.chat.completions.create({
        model: env.get('OPENAI_MODEL', 'gpt-3.5-turbo'),
        stream: true,
        messages: messages as any,
      })

      for await (const message of responseStream) {
        const { content } = message.choices[0].delta
        if (!content) continue
        response.response.write(content)
        response.response.flushHeaders()
      }
    } else {
      const ollamaResponse = await Ollama.chat({
        model: env.get('OLLAMA_MODEL', 'llama2'),
        messages,
        stream: true,
      })
      for await (const part of ollamaResponse) {
        response.response.write(part.message.content)
        response.response.flushHeaders()
      }
    }

    response.response.on('close', () => {
      response.response.end()
    })

    return response.noContent()
  }
}
