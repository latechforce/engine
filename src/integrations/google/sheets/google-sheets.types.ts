export type AppendValuesResponse = {
  spreadsheetId: string
  tableRange: string
  updates: {
    spreadsheetId: string
    tableRange: string
    updatedCells: number
    updatedColumns: number
    updatedData: {
      range: string
      majorDimension: string
      values: string[][]
    }
  }
}
