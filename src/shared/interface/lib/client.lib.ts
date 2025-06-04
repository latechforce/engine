import type { ApiType } from '../routes'
import { hc } from 'hono/client'

export const client = hc<ApiType>('/api', {
  init: {
    credentials: 'include',
  },
})
