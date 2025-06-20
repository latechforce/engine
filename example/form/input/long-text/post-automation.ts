import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Trigger an automation when a form with a long text input is submitted',
  description: 'Trigger an automation when a form with a long text input is submitted',
  forms: [
    {
      id: 1,
      name: 'contact-us',
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/automations/post',
      inputs: [
        {
          label: 'Message',
          name: 'message',
          type: 'long-text',
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
        params: {
          path: '/post',
        },
      },
      actions: [],
    },
  ],
} satisfies AppSchema
