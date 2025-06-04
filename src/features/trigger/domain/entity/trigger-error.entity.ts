import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export class TriggerError extends HttpError {
  constructor(message: string, status: ContentfulStatusCode = 400) {
    super(message, status)
  }
}
