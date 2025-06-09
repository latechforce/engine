import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Run Exists Filter action',
  description: 'Automation with run Exists Filter action',
  automations: [
    {
      id: 1,
      name: 'run-filter',
      trigger: {
        service: 'http',
        event: 'post',
        postHttp: {
          path: '/run-filter',
        },
      },
      actions: [
        {
          name: 'onlyContinueIf',
          service: 'filter',
          action: 'only-continue-if',
          onlyContinueIfFilter: {
            target: '{{ trigger.body.name }}',
            operator: 'exists',
          },
        },
      ],
    },
  ],
} satisfies AppSchema
