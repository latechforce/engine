import type { ContentfulStatusCode } from 'hono/utils/http-status'

export class HttpError extends Error {
  constructor(
    message: string,
    public status: ContentfulStatusCode = 400
  ) {
    super(message)
  }
}
