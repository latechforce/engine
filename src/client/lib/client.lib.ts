import type { AppType } from '@/interface/routes'
import { hc } from 'hono/client'

export const client = hc<AppType>('/api', {
  init: {
    credentials: 'include',
  },
})
