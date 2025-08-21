import { BaseAntiCorruptionLayer } from './base-anti-corruption-layer'
import { ExternalSpreadsheetOperation } from '../entity/external-spreadsheet.entity'
import { Id } from '../value-object/id.value-object'
// eslint-disable-next-line boundaries/element-types
import type { LoggerService } from '../../infrastructure/service/logger.service'
import type { AppendValuesResponse } from '../../integrations/communication/google/sheets/google-sheets.types'

/**
 * Anti-corruption layer for Google Sheets API
 * Protects domain from Google Sheets-specific data structures and API changes
 */
export class GoogleSheetsAntiCorruptionLayer extends BaseAntiCorruptionLayer<
  AppendValuesResponse,
  ExternalSpreadsheetOperation
> {
  constructor(logger: LoggerService) {
    super(logger)
  }

  toDomain(sheetsResponse: AppendValuesResponse): ExternalSpreadsheetOperation {
    // Extract numeric ID from spreadsheet ID string
    const numericId = this.extractNumericId(sheetsResponse.spreadsheetId)

    return new ExternalSpreadsheetOperation(
      new Id(numericId),
      'append', // Based on the response type
      sheetsResponse.updates.tableRange,
      sheetsResponse.updates.updatedData.values || [],
      {
        affectedCells: sheetsResponse.updates.updatedCells,
        affectedRows: sheetsResponse.updates.updatedData.values?.length || 0,
        affectedColumns: sheetsResponse.updates.updatedColumns,
      },
      {
        timestamp: new Date(),
        source: 'google-sheets',
        version: '4.0',
      }
    )
  }

  toExternal(operation: ExternalSpreadsheetOperation): AppendValuesResponse {
    return {
      spreadsheetId: operation.spreadsheetId.toString(),
      tableRange: operation.range,
      updates: {
        spreadsheetId: operation.spreadsheetId.toString(),
        tableRange: operation.range,
        updatedCells: operation.result.affectedCells,
        updatedColumns: operation.result.affectedColumns,
        updatedData: {
          range: operation.range,
          majorDimension: 'ROWS',
          values: operation.data,
        },
      },
    }
  }

  validateExternal(data: unknown): data is AppendValuesResponse {
    if (!data || typeof data !== 'object') return false

    const response = data as Record<string, unknown>
    return (
      typeof response.spreadsheetId === 'string' &&
      typeof response.tableRange === 'string' &&
      response.updates &&
      typeof response.updates.updatedCells === 'number' &&
      typeof response.updates.updatedColumns === 'number' &&
      response.updates.updatedData &&
      Array.isArray(response.updates.updatedData.values)
    )
  }

  getServiceInfo(): { name: string; version: string } {
    return { name: 'Google Sheets', version: 'v4' }
  }

  /**
   * Transform domain append request to Google Sheets format
   */
  transformAppendRequest(domainRequest: {
    spreadsheetId: string
    range: string
    values: string[][]
    insertDataOption?: 'OVERWRITE' | 'INSERT_ROWS'
    valueInputOption?: 'RAW' | 'USER_ENTERED'
  }): {
    range: string
    values: string[][]
    insertDataOption: string
    valueInputOption: string
  } {
    return {
      range: domainRequest.range,
      values: domainRequest.values,
      insertDataOption: domainRequest.insertDataOption || 'INSERT_ROWS',
      valueInputOption: domainRequest.valueInputOption || 'USER_ENTERED',
    }
  }

  /**
   * Transform spreadsheet range notation to domain format
   */
  transformRange(sheetsRange: string): {
    sheetName: string | null
    startRow: number
    endRow: number | null
    startColumn: string
    endColumn: string | null
  } {
    // Parse range like "Sheet1!A1:C10" or "A1:C10"
    const [sheetPart, rangePart] = sheetsRange.includes('!')
      ? sheetsRange.split('!')
      : [null, sheetsRange]

    const [start, end] = rangePart.split(':')

    if (!start) {
      throw new Error('Invalid range format')
    }

    const startMatch = start.match(/([A-Z]+)(\d+)/)
    const endMatch = end?.match(/([A-Z]+)(\d+)/)

    return {
      sheetName: sheetPart || null,
      startRow: startMatch ? parseInt(startMatch[2]!) : 1,
      endRow: endMatch ? parseInt(endMatch[2]!) : null,
      startColumn: startMatch ? startMatch[1]! : 'A',
      endColumn: endMatch ? endMatch[1]! : null,
    }
  }

  /**
   * Transform domain range to Google Sheets notation
   */
  transformToSheetsRange(domainRange: {
    sheetName?: string
    startRow: number
    endRow?: number
    startColumn: string
    endColumn?: string
  }): string {
    const range =
      `${domainRange.startColumn}${domainRange.startRow}` +
      (domainRange.endColumn && domainRange.endRow
        ? `:${domainRange.endColumn}${domainRange.endRow}`
        : '')

    return domainRange.sheetName ? `${domainRange.sheetName}!${range}` : range
  }

  /**
   * Extract numeric ID from Google Sheets spreadsheet ID
   * Handles various ID formats and provides a fallback
   */
  private extractNumericId(spreadsheetId: string): number {
    // Try to extract numbers from the spreadsheet ID
    const numbers = spreadsheetId.replace(/[^0-9]/g, '')
    const numericId = parseInt(numbers)

    // If no numbers found, create a hash-based ID
    if (isNaN(numericId) || numericId === 0) {
      return this.hashStringToNumber(spreadsheetId)
    }

    return numericId
  }

  /**
   * Create a numeric hash from string (for consistent ID generation)
   */
  private hashStringToNumber(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
  }
}
