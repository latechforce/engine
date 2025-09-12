import type { AppSchema } from '@/types'

export default {
  pages: [
    {
      name: 'head',
      path: '/head',
      head: [
        {
          tag: 'title',
          content: 'Head',
        },
        {
          tag: 'meta',
          name: 'description',
          content: 'Head',
        },
        {
          tag: 'script',
          src: 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
        },
        {
          tag: 'style',
          type: 'text/tailwindcss',
          content: '@theme {  --color-clifford: #da373d; }',
        },
        {
          tag: 'link',
          href: '/index.css',
          rel: 'stylesheet',
        },
      ],
      body: [],
    },
  ],
} satisfies AppSchema
