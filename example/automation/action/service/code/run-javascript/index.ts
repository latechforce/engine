import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Run JavaScript code action',
  description: 'Automation with run JavaScript code action',
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
            return { message }
          }),
        },
      ],
    },
  ],
} satisfies AppSchema
