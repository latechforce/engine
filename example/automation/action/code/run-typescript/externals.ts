import type { AppSchema, CodeContext } from '@/types'

export const externals = {
  customFunction: () => {
    return 'Hello, world!'
  },
}

export const inGuides = true

export default {
  name: 'Run TypeScript code action with externals',
  description: 'Automation with run TypeScript code action and externals',
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
            const { customFunction } = context.externals
            const message = customFunction()
            return { message }
          }),
        },
      ],
    },
  ],
} satisfies AppSchema
