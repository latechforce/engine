import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Configure multiple buckets',
  description: 'Configure multiple buckets',
  buckets: [
    {
      id: 1,
      name: 'My bucket',
    },
    {
      id: 2,
      name: 'My other bucket',
    },
  ],
} satisfies AppSchema
