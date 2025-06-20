import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Run Is True Filter action',
  description: 'Automation with run Is True Filter action',
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
            target: '{{ trigger.body.is_active }}',
            operator: 'is-true',
          },
        },
      ],
    },
  ],
} satisfies AppSchema
