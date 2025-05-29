import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Display a form with an url field',
  description: 'Form with an url field',
  forms: [
    {
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
} satisfies AppSchema
