import { BaseResponse } from './base'

export class RedirectResponse extends BaseResponse {
  constructor(path: string) {
    super({
      headers: {
        Location: path,
      },
      status: 302,
    })
  }
}

export function isRedirectResponse(value: unknown): value is RedirectResponse {
  return value instanceof RedirectResponse
}
