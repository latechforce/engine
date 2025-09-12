import type { AppSchema } from '@/types'

export default {
  pages: [
    {
      name: 'custom-html',
      path: '/custom-html',
      head: [
        {
          type: 'title',
          content: 'Custom HTML page',
        },
        {
          type: 'meta',
          name: 'description',
          content: 'Custom HTML page',
        },
      ],
      body: [
        {
          type: 'custom-html',
          content: '<h1>Custom HTML page</h1>',
        },
      ],
    },
  ],
} satisfies AppSchema
