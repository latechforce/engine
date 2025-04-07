import { BaseResponse } from './base'

export class CsvResponse extends BaseResponse {
  constructor(filename: string, data: Buffer, status?: number) {
    super({
      body: data,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(data.length),
      },
      status,
    })
  }
}

export function isCsvResponse(value: unknown): value is CsvResponse {
  return value instanceof CsvResponse
}
