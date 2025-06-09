import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Trigger an automation when a form with a phone number input is submitted',
  description: 'Trigger an automation when a form with a phone number input is submitted',
  forms: [
    {
      name: 'contact-us',
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/automations/post',
      inputs: [
        {
          label: 'Phone number',
          name: 'phone-number',
          type: 'phone-number',
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
