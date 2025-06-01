import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Display a form with a single attachment field',
  description: 'Form with a single attachment field',
  forms: [
    {
      name: 'contact-us',
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/automations/post',
      inputs: [
        {
          label: 'Attachment',
          name: 'attachment',
          type: 'single-attachment',
          accept: 'image/*',
        },
      ],
    },
  ],
} satisfies AppSchema
