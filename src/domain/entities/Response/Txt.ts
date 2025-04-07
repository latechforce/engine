import { BaseResponse } from './base'

export class TxtResponse extends BaseResponse {
  constructor(filename: string, data: Buffer, status?: number) {
    super({
      body: data,
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(data.length),
      },
      status,
    })
  }
}

export function isTxtResponse(value: unknown): value is TxtResponse {
  return value instanceof TxtResponse
}
