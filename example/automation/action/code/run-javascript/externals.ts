import type { AppSchema } from '@/types'

export const externals = {
  customFunction: () => {
    return 'Hello, world!'
  },
}

export const inGuides = true

export default {
  name: 'Run JavaScript code action with externals',
  description: 'Automation with run JavaScript code action and externals',
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
            code: String(function (context) {
              const { customFunction } = context.externals
              const message = customFunction()
              return { message }
            }),
          },
        },
      ],
    },
  ],
} satisfies AppSchema
