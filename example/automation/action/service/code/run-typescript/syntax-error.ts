/* eslint-disable */
// @ts-nocheck
import type { AppSchema } from '@/types'

export default {
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
          code: String(function () {
            const message: string = 'Hello, world!'
            return { mesesage }
          }),
        },
      ],
    },
  ],
} satisfies AppSchema
