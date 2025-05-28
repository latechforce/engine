import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Display a form with an email field',
  description: 'Form with an email field',
  forms: [
    {
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/automation/post',
      inputs: [
        {
          label: 'Email',
          name: 'email',
          type: 'email',
          required: true,
        },
      ],
    },
  ],
} satisfies AppSchema
