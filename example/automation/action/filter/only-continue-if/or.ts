import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Run And Filter action',
  description: 'Automation with run And Filter action',
  automations: [
    {
      id: 1,
      name: 'run-filter',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/run-filter',
        },
      },
      actions: [
        {
          name: 'onlyContinueIf',
          service: 'filter',
          action: 'only-continue-if',
          params: {
            or: [
              {
                target: '{{ trigger.body.name }}',
                operator: 'exists',
              },
              {
                target: '{{ trigger.body.name }}',
                operator: 'contains',
                value: 'John',
              },
            ],
          },
        },
      ],
    },
  ],
} satisfies AppSchema
