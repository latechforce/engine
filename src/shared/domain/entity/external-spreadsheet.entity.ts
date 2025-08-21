import { Id } from '../value-object/id.value-object'

/**
 * Domain representation of external spreadsheet operations
 * Protects domain from external API changes
 */
export class ExternalSpreadsheetOperation {
  constructor(
    public readonly spreadsheetId: Id,
    public readonly operation: 'append' | 'update' | 'read',
    public readonly range: string,
    public readonly data: string[][],
    public readonly result: {
      affectedCells: number
      affectedRows: number
      affectedColumns: number
    },
    public readonly metadata: {
      timestamp: Date
      source: string
      version: string
    }
  ) {}

  getRowCount(): number {
    return this.data.length
  }

  getColumnCount(): number {
    return this.data[0]?.length || 0
  }

  getCell(row: number, column: number): string | undefined {
    return this.data[row]?.[column]
  }

  hasData(): boolean {
    return this.data.length > 0
  }
}
