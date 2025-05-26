/* eslint-disable */
// @ts-nocheck
import type { AppSchema } from '@/types'

export default {
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
          code: String(function () {
            const message = 'Hello, world!'
            return { mesesage }
          }),
        },
      ],
    },
  ],
} satisfies AppSchema
