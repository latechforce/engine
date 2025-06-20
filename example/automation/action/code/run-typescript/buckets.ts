import type { AppSchema, CodeContext } from '@/types'

export default {
  automations: [
    {
      id: 1,
      name: 'run-typescript',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: 'run-typescript',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'params',
          params: {
            code: String(async function (context: CodeContext) {
              const pictures = context.bucket('pictures')
              await pictures.upload('picture.jpg', new Uint8Array([1, 2, 3]))
              const data = await pictures.download('picture.jpg')
              const object = await pictures.get('picture.jpg')
              const list = await pictures.list()
              await pictures.delete('picture.jpg')
              return {
                data,
                list,
                object,
              }
            }),
          },
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
