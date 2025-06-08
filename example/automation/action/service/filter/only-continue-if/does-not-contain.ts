import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Run Does Not Contain Filter action',
  description: 'Automation with run Does Not Contain Filter action',
  automations: [
    {
      id: 1,
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
            target: '{{ trigger.body.name }}',
            operator: 'does-not-contain',
            value: 'John',
          },
        },
      ],
    },
  ],
} satisfies AppSchema
