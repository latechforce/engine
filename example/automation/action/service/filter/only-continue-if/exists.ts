import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Run Filter action',
  description: 'Automation with run Filter action',
  automations: [
    {
      name: 'run-filter',
      trigger: {
        service: 'http',
        event: 'post',
        path: '/run-filter',
      },
      actions: [
        {
          name: 'onlyContinueIf',
          service: 'filter',
          action: 'only-continue-if',
          conditions: {
            input: '{{ trigger.body.name }}',
            operator: 'exists',
          },
        },
      ],
    },
  ],
} satisfies AppSchema
