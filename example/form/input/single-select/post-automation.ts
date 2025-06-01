import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Trigger an automation when a form with a single select input is submitted',
  description: 'Trigger an automation when a form with a single select input is submitted',
  forms: [
    {
      name: 'contact-us',
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/automations/post',
      inputs: [
        {
          label: 'Select a color',
          name: 'select',
          type: 'single-select',
          defaultValue: 'red',
          options: [
            { label: 'Red', value: 'red' },
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
          ],
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
