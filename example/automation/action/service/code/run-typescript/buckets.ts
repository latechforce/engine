import type { AppSchema, CodeContext } from '@/types'

export default {
  automations: [
    {
      id: 1,
      name: 'run-typescript',
      trigger: {
        service: 'http',
        event: 'post',
        path: 'run-typescript',
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'runTypescriptCode',
          code: String(async function (context: CodeContext) {
            const pictures = context.bucket('pictures')
            await pictures.upload('picture.jpg', new Uint8Array([1, 2, 3]))
            const data = await pictures.download('picture.jpg')
            const list = await pictures.list()
            await pictures.delete('picture.jpg')
            return {
              data,
              list,
            }
          }),
        },
      ],
    },
  ],
  buckets: [
    {
      id: 1,
      name: 'pictures',
    },
  ],
} satisfies AppSchema
