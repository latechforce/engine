import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Respond to an HTTP request with a dynamic body',
  description: 'Automation with HTTP response action, previous action and dynamic body',
  automations: [
    {
      id: 1,
      name: 'response',
      trigger: {
        service: 'http',
        event: 'post',
        postHttp: {
          path: 'response',
        },
      },
      actions: [
        {
          name: 'buildMessage',
          service: 'code',
          action: 'run-typescript',
          runTypescriptCode: {
            code: String(function () {
              const message: string = 'Hello world!'
              return { message }
            }),
          },
        },
        {
          name: 'sendResponse',
          service: 'http',
          action: 'response',
          responseHttp: {
            body: {
              message: '{{ buildMessage.message }}',
            },
          },
        },
      ],
    },
  ],
} satisfies AppSchema
