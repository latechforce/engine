import type { ContentfulStatusCode } from 'hono/utils/http-status'

export type ErrorDto = {
  error: string
  status: ContentfulStatusCode
}
