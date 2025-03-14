import { HtmlResponse } from './Html'

export class JsxResponse extends HtmlResponse {
  constructor(public jsx: React.ReactElement) {
    super('')
  }
}

export function isJsxResponse(value: unknown): value is JsxResponse {
  return value instanceof JsxResponse
}
