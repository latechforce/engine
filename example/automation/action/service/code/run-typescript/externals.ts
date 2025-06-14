import type { AppSchema, CodeContext } from '@/types'

export const externals = {
  customFunction: () => {
    return 'Hello, world!'
  },
}

export const inGuides = true

export default {
  name: 'Run TypeScript code action with externals',
  description:
    'Automation with run TypeScript code action and externals. You can use any NPM package in the code by adding it to the `externals` object.',
  automations: [
    {
      id: 1,
      name: 'run-typescript',
      trigger: {
        service: 'http',
        event: 'post',
        postHttp: {
          path: 'run-typescript',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'runTypescriptCode',
          runTypescriptCode: {
            code: String(function (context: CodeContext<{}, typeof externals>) {
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
