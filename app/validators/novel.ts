import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new novel.
 */
export const createNovelValidator = vine.compile(
  vine.object({
    title: vine.string(),
    pitch: vine.string().optional(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing novel.
 */
export const updateNovelValidator = vine.compile(
  vine.object({
    title: vine.string(),
    pitch: vine.string().optional(),
  })
)
