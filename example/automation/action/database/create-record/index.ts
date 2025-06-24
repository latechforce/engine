import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Create record action',
  description: 'Automation with create record action',
  automations: [
    {
      id: 1,
      name: 'create-record',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/create-record',
        },
      },
      actions: [
        {
          service: 'database',
          action: 'create-record',
          name: 'createRecord',
          params: {
            table: 'users',
            fields: {
              name: 'John Doe',
            },
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
