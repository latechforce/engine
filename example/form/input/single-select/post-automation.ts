import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Trigger an automation when a form with a single select input is submitted',
  description: 'Trigger an automation when a form with a single select input is submitted',
  forms: [
    {
      id: 1,
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
