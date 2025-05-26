import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Display a form with a single attachment field',
  description: 'Form with a single attachment field',
  forms: [
    {
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/automation/post',
      inputs: [
        {
          label: 'Attachment',
          name: 'attachment',
          type: 'single-attachment',
        },
      ],
    },
  ],
} satisfies AppSchema
