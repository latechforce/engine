import { BaseResponse } from './base'

export class JsResponse extends BaseResponse {
  constructor(js: string) {
    super({
      body: js,
      headers: {
        'Content-Type': 'application/javascript',
      },
    })
  }
}

export function isJsResponse(value: unknown): value is JsResponse {
  return value instanceof JsResponse
}
