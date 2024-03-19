import { createNovelValidator, updateNovelValidator } from '#validators/novel'
import type { HttpContext } from '@adonisjs/core/http'

export default class NovelsController {
  async index({ auth, inertia }: HttpContext) {
    const novels = await auth.user!.related('novels').query().orderBy('created_at', 'desc')
    return inertia.render('novels/index', { novels })
  }

  async store({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(createNovelValidator)
    const novel = await auth.user!.related('novels').create(payload)
    const chapter = await novel.related('chapters').create({
      title: 'Chapter 1',
      order: 1,
    })
    return response.redirect(`/novels/${novel.id}/chapters/${chapter.id}/edit`)
  }

  async show({ auth, params, inertia, response }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .preload('chapters', (query) => query.orderBy('order', 'asc'))
      .firstOrFail()

    if (novel.chapters.length !== 0) {
      return response.redirect(`/novels/${params.novelId}/chapters/${novel.chapters[0].id}/edit`)
    }

    return inertia.render('chapters/edit', { novel })
  }

  async edit({ auth, params, inertia }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .preload('chapters')
      .firstOrFail()
    return inertia.render('novels/edit', { novel })
  }

  async update({ auth, params, request, response }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .firstOrFail()
    const payload = await request.validateUsing(updateNovelValidator)
    novel.merge(payload)
    await novel.save()
    return response.redirect().back()
  }

  async destroy({ auth, params, response }: HttpContext) {
    const novel = await auth
      .user!.related('novels')
      .query()
      .where('id', params.novelId)
      .firstOrFail()
    await novel.delete()
    return response.redirect('/novels')
  }
}
