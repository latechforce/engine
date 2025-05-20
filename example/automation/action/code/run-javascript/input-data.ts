import type { AppSchema } from '@/types'

export const inputDataRunJavascriptCodeAction: AppSchema = {
  automations: [
    {
      name: 'run-javascript',
      trigger: {
        service: 'http',
        event: 'post',
        path: '/run-javascript',
        requestBody: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
          },
          required: ['name'],
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-javascript',
          name: 'runJavascriptCode',
          inputData: {
            name: '{{trigger.body.name}}',
          },
          // @ts-expect-error - CodeContext is not defined in the externals
          code: String(function (context) {
            const { name } = context.inputData
            const message: string = `Hello, ${name}!`
            return { message }
          }),
        },
      ],
    },
  ],
}
