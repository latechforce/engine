import type { AppSchema } from '@/types'

export default {
  automations: [
    {
      id: 1,
      name: 'run-javascript',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: 'run-javascript',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-javascript',
          name: 'params',
          params: {
            // @ts-expect-error - CodeContext is not defined in JavaScript
            code: String(async function (context) {
              const tables = context.bucket('tables')
              const attachments = await tables.list()
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
                attachments,
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
