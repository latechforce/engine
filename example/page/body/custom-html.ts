import type { AppSchema } from '@/types'

export default {
  pages: [
    {
      name: 'custom-html',
      path: '/custom-html',
      head: [],
      body: [
        {
          type: 'custom-html',
          content: '<h1>Custom HTML page</h1>',
        },
      ],
    },
  ],
} satisfies AppSchema
