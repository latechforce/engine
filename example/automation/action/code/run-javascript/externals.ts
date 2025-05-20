import type { AppSchema } from '@/types'
import { z } from 'zod'

export const externals = {
  zod: z,
}

export const externalsRunJavascriptCodeAction: AppSchema = {
  automations: [
    {
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
          // @ts-expect-error - CodeContext is not defined in the externals
          code: String(function (context) {
            const { zod } = context.externals
            const schema = zod.object({
              name: zod.string(),
            })
            const result = schema.safeParse({ name: 'John' })
            return result
          }),
        },
      ],
    },
  ],
}
