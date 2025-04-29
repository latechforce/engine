import vine from '@vinejs/vine'

export const appValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
  })
)
