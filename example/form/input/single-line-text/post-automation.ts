import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Trigger an automation when a form with a single line text input is submitted',
  description: 'Trigger an automation when a form with a single line text input is submitted',
  forms: [
    {
      name: 'contact-us',
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
      id: 1,
      name: 'Post',
      trigger: {
        service: 'http',
        event: 'post',
        postHttp: {
          path: '/post',
        },
      },
      actions: [],
    },
  ],
} satisfies AppSchema
