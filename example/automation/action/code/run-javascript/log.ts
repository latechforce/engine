import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Run JavaScript code action with log',
  description: 'Automation with run JavaScript code action with log',
  automations: [
    {
      id: 1,
      name: 'run-javascript',
      trigger: {
        service: 'http',
        event: 'post',
        postHttp: {
          path: '/run-javascript',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-javascript',
          name: 'runJavascriptCode',
          runJavascriptCode: {
            // @ts-expect-error - CodeContext is not defined in JavaScript
            code: String(function (context) {
              context.log.info('Hello, world!')
            }),
          },
        },
      ],
    },
  ],
} satisfies AppSchema
