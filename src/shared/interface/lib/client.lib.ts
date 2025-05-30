import type { ApiType } from '@/shared/interface/routes'
import { hc } from 'hono/client'

export const client = hc<ApiType>('/api', {
  init: {
    credentials: 'include',
  },
})
