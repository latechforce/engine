import type { AppSchema, CodeContext } from '@/types'
import { z } from 'zod'

export const externals = {
  zod: z,
}

export const externalsRunTypescriptCodeAction: AppSchema = {
  automations: [
    {
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
          code: String(function (context: CodeContext<{}, typeof externals>) {
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
