/* eslint-disable */
// @ts-nocheck
import type { AppSchema } from '@/types'

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
            code: String(function () {
              const message: string = 'Hello, world!'
              return { mesesage }
            }),
          },
        },
      ],
    },
  ],
} satisfies AppSchema
