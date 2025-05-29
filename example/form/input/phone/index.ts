import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Display a form with an phone field',
  description: 'Form with an phone field',
  forms: [
    {
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/automations/post',
      inputs: [
        {
          label: 'Phone',
          name: 'phone',
          type: 'phone',
        },
      ],
    },
  ],
} satisfies AppSchema
