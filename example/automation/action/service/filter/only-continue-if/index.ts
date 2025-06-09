import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Run Only Continue If Filter action',
  description: 'Automation with run Only Continue If Filter action',
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
        {
          name: 'actionNotFiltered',
          service: 'code',
          action: 'run-typescript',
          runTypescriptCode: {
            code: String(function () {
              return { continue: true }
            }),
          },
        },
      ],
    },
  ],
} satisfies AppSchema
