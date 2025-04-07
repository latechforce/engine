import { BaseResponse } from './base'

export class XlsResponse extends BaseResponse {
  constructor(filename: string, data: Buffer, status?: number) {
    super({
      body: data,
      headers: {
        'Content-Type': 'application/vnd.ms-excel',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(data.length),
      },
      status,
    })
  }
}

export function isXlsResponse(value: unknown): value is XlsResponse {
  return value instanceof XlsResponse
}
