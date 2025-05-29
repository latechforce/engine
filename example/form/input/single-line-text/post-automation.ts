import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Trigger an automation when a form with a single line text input is submitted',
  description: 'Trigger an automation when a form with a single line text input is submitted',
  forms: [
    {
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/automations/post',
      inputs: [
        {
          label: 'Name',
          name: 'name',
          type: 'single-line-text',
        },
      ],
    },
  ],
  automations: [
    {
      name: 'Post',
      trigger: {
        service: 'http',
        event: 'post',
        path: '/post',
      },
      actions: [],
    },
  ],
} satisfies AppSchema
