import type { AppSchema } from '@/types'

export default {
  automations: [
    {
      id: 1,
      name: 'run-javascript',
      trigger: {
        service: 'http',
        event: 'post',
        path: 'run-javascript',
      },
      actions: [
        {
          service: 'code',
          action: 'run-javascript',
          name: 'runJavascriptCode',
          // @ts-expect-error - CodeContext is not defined in JavaScript
          code: String(async function (context) {
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
