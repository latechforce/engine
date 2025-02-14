export type ConvertToAirtableTableRecordFields<T> = {
  [K in keyof T]: AirtableTableRecordFieldValue
}

export interface AirtableTableRecordFields {
  [key: string]: AirtableTableRecordFieldValue
}

export type AirtableTableRecordFieldFile = { name: string; url: string }

export type AirtableTableRecordFieldValue =
  | string
  | number
  | boolean
  | AirtableTableRecordFieldValue[]
  | AirtableTableRecordFieldFile[]
  | null
  | undefined

export class AirtableTableRecord<T extends AirtableTableRecordFields = AirtableTableRecordFields> {
  constructor(
    readonly id: string,
    readonly fields: T,
    readonly createdTime: string
  ) {}

  getTitle(name: string): string | null {
    return this._getPropertyAsString(name)
  }

  getCheckbox(name: string): boolean {
    return this._getPropertyAsBoolean(name)
  }

  getCreatedBy(name: string): string {
    const value = this._getPropertyAsString(name)
    if (!value) throw new Error('Field "createdBy" should not be null')
    return value
  }

  getCreatedTime(name: string): Date {
    const value = this._getPropertyAsDate(name)
    if (!value) throw new Error('Field "createdTime" should not be null')
    return value
  }

  getDate(name: string): Date | null {
    return this._getPropertyAsDate(name)
  }

  getEmail(name: string): string | null {
    return this._getPropertyAsString(name)
  }

  getFiles(name: string): AirtableTableRecordFieldFile[] {
    const value = this.fields[name]
    if (!AirtableTableRecord.isFilesProperty(value)) return []
    return value
  }

  getStringFormula(name: string): string | null {
    return this._getPropertyAsString(name)
  }

  getNumberFormula(name: string): number | null {
    return this._getPropertyAsNumber(name)
  }

  getBooleanFormula(name: string): boolean | null {
    return this._getPropertyAsBoolean(name)
  }

  getDateFormula(name: string): string | null {
    return this._getPropertyAsString(name)
  }

  getLastEditedBy(name: string): string {
    const value = this._getPropertyAsString(name)
    if (!value) throw new Error('Field "lastEditedBy" should not be null')
    return value
  }

  getLastEditedTime(name: string): string {
    const value = this._getPropertyAsString(name)
    if (!value) throw new Error('Field "lastEditedTime" should not be null')
    return value
  }

  getMultiSelect(name: string): string[] {
    return this._getPropertyAsStringArray(name)
  }

  getNumber(name: string): number | null {
    return this._getPropertyAsNumber(name)
  }

  getPeople(name: string): string[] {
    return this._getPropertyAsStringArray(name)
  }

  getPhone(name: string): string | null {
    return this._getPropertyAsString(name)
  }

  getRelations(name: string): string[] {
    return this._getPropertyAsStringArray(name)
  }

  getSingleRelation(name: string): string | null {
    return this._getPropertyAsStringArray(name)[0] || null
  }

  getStringArrayRollup(name: string): string[] {
    return this._getPropertyAsStringArray(name)
  }

  getNumberArrayRollup(name: string): number[] {
    const value = this.fields[name]
    if (!Array.isArray(value)) return []
    return value.every((item) => typeof item === 'number') ? value : []
  }

  getBooleanArrayRollup(name: string): boolean[] {
    const value = this.fields[name]
    if (!Array.isArray(value)) return []
    return value.every((item) => typeof item === 'boolean') ? value : []
  }

  getSingleStringRollup(name: string): string | null {
    return this._getPropertyAsStringArray(name)[0] || null
  }

  getDateRollup(name: string): string | null {
    return this._getPropertyAsString(name)
  }

  getNumberRollup(name: string): number | null {
    return this._getPropertyAsNumber(name)
  }

  getRichText(name: string): string | null {
    return this._getPropertyAsString(name)
  }

  getSelect(name: string): string | null {
    return this._getPropertyAsString(name)
  }

  getUrl(name: string): string | null {
    return this._getPropertyAsString(name)
  }

  getStatus(name: string): string | null {
    return this._getPropertyAsString(name)
  }

  private _getPropertyAsString(name: string): string | null {
    if (!(name in this.fields)) {
      throw new Error(`Field "${name}" does not exist`)
    }
    const value = this.fields[name]
    if (!value) return null
    return typeof value === 'string' ? value : value.toString()
  }

  private _getPropertyAsStringArray(name: string): string[] {
    const value = this._checkIfPropertyExists(name)
    if (!AirtableTableRecord.isStringArrayProperty(value)) return []
    return value
  }

  private _getPropertyAsDate(name: string): Date | null {
    const value = this._checkIfPropertyExists(name)
    if (!value) return null
    return value instanceof Date ? value : new Date(value.toString())
  }

  private _getPropertyAsNumber(name: string): number | null {
    const value = this._checkIfPropertyExists(name)
    if (!value) return null
    return typeof value === 'number' ? value : parseFloat(value.toString())
  }

  private _getPropertyAsBoolean(name: string): boolean {
    const value = this._checkIfPropertyExists(name)
    return typeof value === 'boolean' ? value : !!value
  }

  private _checkIfPropertyExists(name: string): AirtableTableRecordFieldValue {
    if (!(name in this.fields)) {
      throw new Error(`Field "${name}" does not exist`)
    }
    return this.fields[name]
  }

  static isFilesProperty = (value: unknown): value is AirtableTableRecordFieldFile[] => {
    return (
      Array.isArray(value) &&
      value.every(
        (item) =>
          typeof item === 'object' &&
          item !== null &&
          'name' in item &&
          'url' in item &&
          typeof item.name === 'string' &&
          typeof item.url === 'string'
      )
    )
  }

  static isStringArrayProperty = (value: AirtableTableRecordFieldValue): value is string[] => {
    return Array.isArray(value) && value.every((item) => typeof item === 'string')
  }
}
