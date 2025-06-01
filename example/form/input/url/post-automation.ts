import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Trigger an automation when a form with a url input is submitted',
  description: 'Trigger an automation when a form with a url input is submitted',
  forms: [
    {
      name: 'contact-us',
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/automations/post',
      inputs: [
        {
          label: 'URL',
          name: 'url',
          type: 'url',
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
