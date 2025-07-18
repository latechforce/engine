import type { AppSchema, CodeContext } from '@/types'

export const inGuides = true

export default {
  name: 'Trigger an automation when a record is updated',
  description: 'Automation with database record updated trigger',
  automations: [
    {
      id: 1,
      name: 'record-updated',
      trigger: {
        service: 'database',
        event: 'record-updated',
        params: {
          table: 'users',
        },
      },
      actions: [
        {
          name: 'runTypescript',
          service: 'code',
          action: 'run-typescript',
          params: {
            inputData: {
              name: '{{trigger.fields.name}}',
            },
            code: String(function (context: CodeContext<{ name: string }>) {
              const { name } = context.inputData
              return { name }
            }),
          },
        },
      ],
    },
  ],
  tables: [
    {
      id: 1,
      name: 'users',
      fields: [
        {
          id: 1,
          name: 'name',
          type: 'single-line-text',
        },
      ],
    },
  ],
} satisfies AppSchema
