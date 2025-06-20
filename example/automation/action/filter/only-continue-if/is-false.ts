import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Run Is False Filter action',
  description: 'Automation with run Is False Filter action',
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
            operator: 'is-false',
          },
        },
      ],
    },
  ],
} satisfies AppSchema
