import { describe, it, expect, beforeEach } from 'bun:test'
import { GoogleSheetsAntiCorruptionLayer } from '../../../../src/shared/domain/anti-corruption/google-sheets-anti-corruption-layer'
import { ExternalSpreadsheetOperation } from '../../../../src/shared/domain/entity/external-spreadsheet.entity'
import type { LoggerService } from '../../../../src/shared/infrastructure/service/logger.service'

// Mock logger
const mockLogger = {
  error: () => {},
  info: () => {},
  debug: () => {},
  child: () => mockLogger,
} as unknown as LoggerService

describe('GoogleSheetsAntiCorruptionLayer', () => {
  let layer: GoogleSheetsAntiCorruptionLayer

  beforeEach(() => {
    layer = new GoogleSheetsAntiCorruptionLayer(mockLogger)
  })

  describe('toDomain', () => {
    it('should transform Google Sheets response to domain operation', () => {
      const sheetsResponse = {
        spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        tableRange: 'A1:C3',
        updates: {
          spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
          tableRange: 'A1:C3',
          updatedCells: 9,
          updatedColumns: 3,
          updatedData: {
            range: 'A1:C3',
            majorDimension: 'ROWS',
            values: [
              ['Name', 'Age', 'City'],
              ['John', '25', 'New York'],
              ['Jane', '30', 'Los Angeles'],
            ],
          },
        },
      }

      const domainOperation = layer.toDomain(sheetsResponse)

      expect(domainOperation).toBeInstanceOf(ExternalSpreadsheetOperation)
      expect(domainOperation.operation).toBe('append')
      expect(domainOperation.range).toBe('A1:C3')
      expect(domainOperation.data).toEqual([
        ['Name', 'Age', 'City'],
        ['John', '25', 'New York'],
        ['Jane', '30', 'Los Angeles'],
      ])
      expect(domainOperation.result.affectedCells).toBe(9)
      expect(domainOperation.result.affectedColumns).toBe(3)
      expect(domainOperation.metadata.source).toBe('google-sheets')
      expect(domainOperation.metadata.version).toBe('4.0')
    })
  })

  describe('toExternal', () => {
    it('should transform domain operation to Google Sheets format', () => {
      const domainOperation = new ExternalSpreadsheetOperation(
        { getValue: () => 123, toString: () => '123' } as any,
        'append',
        'A1:B2',
        [
          ['Header1', 'Header2'],
          ['Value1', 'Value2'],
        ],
        {
          affectedCells: 4,
          affectedRows: 2,
          affectedColumns: 2,
        },
        {
          timestamp: new Date(),
          source: 'google-sheets',
          version: '4.0',
        }
      )

      const sheetsResponse = layer.toExternal(domainOperation)

      expect(sheetsResponse.spreadsheetId).toBe('123')
      expect(sheetsResponse.tableRange).toBe('A1:B2')
      expect(sheetsResponse.updates.updatedCells).toBe(4)
      expect(sheetsResponse.updates.updatedColumns).toBe(2)
      expect(sheetsResponse.updates.updatedData.values).toEqual([
        ['Header1', 'Header2'],
        ['Value1', 'Value2'],
      ])
    })
  })

  describe('validateExternal', () => {
    it('should validate correct Google Sheets response structure', () => {
      const validResponse = {
        spreadsheetId: '123',
        tableRange: 'A1:B2',
        updates: {
          spreadsheetId: '123',
          tableRange: 'A1:B2',
          updatedCells: 4,
          updatedColumns: 2,
          updatedData: {
            range: 'A1:B2',
            majorDimension: 'ROWS',
            values: [['A', 'B']],
          },
        },
      }

      expect(layer.validateExternal(validResponse)).toBe(true)
    })

    it('should reject invalid response structure', () => {
      const invalidResponse = {
        spreadsheetId: '123',
        // Missing required fields
      }

      expect(layer.validateExternal(invalidResponse)).toBe(false)
      expect(layer.validateExternal(null)).toBe(false)
      expect(layer.validateExternal('string')).toBe(false)
    })
  })

  describe('transformAppendRequest', () => {
    it('should transform domain append request to Google Sheets format', () => {
      const domainRequest = {
        spreadsheetId: '123',
        range: 'A1:B2',
        values: [
          ['Header1', 'Header2'],
          ['Value1', 'Value2'],
        ],
        insertDataOption: 'INSERT_ROWS' as const,
        valueInputOption: 'USER_ENTERED' as const,
      }

      const sheetsRequest = layer.transformAppendRequest(domainRequest)

      expect(sheetsRequest.range).toBe('A1:B2')
      expect(sheetsRequest.values).toEqual([
        ['Header1', 'Header2'],
        ['Value1', 'Value2'],
      ])
      expect(sheetsRequest.insertDataOption).toBe('INSERT_ROWS')
      expect(sheetsRequest.valueInputOption).toBe('USER_ENTERED')
    })

    it('should use default options when not provided', () => {
      const domainRequest = {
        spreadsheetId: '123',
        range: 'A1:B2',
        values: [['A', 'B']],
      }

      const sheetsRequest = layer.transformAppendRequest(domainRequest)

      expect(sheetsRequest.insertDataOption).toBe('INSERT_ROWS')
      expect(sheetsRequest.valueInputOption).toBe('USER_ENTERED')
    })
  })

  describe('transformRange', () => {
    it('should parse sheet range with sheet name', () => {
      const range = layer.transformRange('Sheet1!A1:C10')

      expect(range.sheetName).toBe('Sheet1')
      expect(range.startRow).toBe(1)
      expect(range.endRow).toBe(10)
      expect(range.startColumn).toBe('A')
      expect(range.endColumn).toBe('C')
    })

    it('should parse range without sheet name', () => {
      const range = layer.transformRange('B5:D15')

      expect(range.sheetName).toBeNull()
      expect(range.startRow).toBe(5)
      expect(range.endRow).toBe(15)
      expect(range.startColumn).toBe('B')
      expect(range.endColumn).toBe('D')
    })

    it('should parse single cell range', () => {
      const range = layer.transformRange('A1')

      expect(range.sheetName).toBeNull()
      expect(range.startRow).toBe(1)
      expect(range.endRow).toBeNull()
      expect(range.startColumn).toBe('A')
      expect(range.endColumn).toBeNull()
    })
  })

  describe('transformToSheetsRange', () => {
    it('should create range with sheet name', () => {
      const domainRange = {
        sheetName: 'Data',
        startRow: 1,
        endRow: 10,
        startColumn: 'A',
        endColumn: 'C',
      }

      const sheetsRange = layer.transformToSheetsRange(domainRange)

      expect(sheetsRange).toBe('Data!A1:C10')
    })

    it('should create range without sheet name', () => {
      const domainRange = {
        startRow: 5,
        endRow: 15,
        startColumn: 'B',
        endColumn: 'D',
      }

      const sheetsRange = layer.transformToSheetsRange(domainRange)

      expect(sheetsRange).toBe('B5:D15')
    })

    it('should create single cell range', () => {
      const domainRange = {
        startRow: 1,
        startColumn: 'A',
      }

      const sheetsRange = layer.transformToSheetsRange(domainRange)

      expect(sheetsRange).toBe('A1')
    })
  })

  describe('getServiceInfo', () => {
    it('should return correct service information', () => {
      const serviceInfo = layer.getServiceInfo()

      expect(serviceInfo.name).toBe('Google Sheets')
      expect(serviceInfo.version).toBe('v4')
    })
  })

  describe('safeToDomain', () => {
    it('should return null for invalid data and log error', () => {
      const invalidData = { invalid: 'data' }

      const result = layer.safeToDomain(invalidData)

      expect(result).toBeNull()
    })

    it('should return domain object for valid data', () => {
      const validData = {
        spreadsheetId: '123',
        tableRange: 'A1:B2',
        updates: {
          spreadsheetId: '123',
          tableRange: 'A1:B2',
          updatedCells: 4,
          updatedColumns: 2,
          updatedData: {
            range: 'A1:B2',
            majorDimension: 'ROWS',
            values: [['A', 'B']],
          },
        },
      }

      const result = layer.safeToDomain(validData)

      expect(result).toBeInstanceOf(ExternalSpreadsheetOperation)
    })
  })
})
