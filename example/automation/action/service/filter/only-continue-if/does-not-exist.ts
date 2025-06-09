import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Run Does Not Exist Filter action',
  description: 'Automation with run Does Not Exist Filter action',
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
            operator: 'does-not-exist',
          },
        },
      ],
    },
  ],
} satisfies AppSchema
