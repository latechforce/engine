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

  getTitle(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getCheckbox(name: keyof T): boolean {
    return this._getPropertyAsBoolean(name)
  }

  getCreatedBy(name: keyof T): string {
    const value = this._getPropertyAsString(name)
    if (!value) throw new Error('Field "createdBy" should not be null')
    return value
  }

  getCreatedTime(name: keyof T): Date {
    const value = this._getPropertyAsDate(name)
    if (!value) throw new Error('Field "createdTime" should not be null')
    return value
  }

  getDate(name: keyof T): Date | null {
    return this._getPropertyAsDate(name)
  }

  getEmail(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getFiles(name: keyof T): AirtableTableRecordFieldFile[] {
    const value = this.fields[name]
    if (!AirtableTableRecord.isFilesProperty(value)) return []
    return value
  }

  getStringFormula(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getNumberFormula(name: keyof T): number | null {
    return this._getPropertyAsNumber(name)
  }

  getBooleanFormula(name: keyof T): boolean | null {
    return this._getPropertyAsBoolean(name)
  }

  getDateFormula(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getLastEditedBy(name: keyof T): string {
    const value = this._getPropertyAsString(name)
    if (!value) throw new Error('Field "lastEditedBy" should not be null')
    return value
  }

  getLastEditedTime(name: keyof T): string {
    const value = this._getPropertyAsString(name)
    if (!value) throw new Error('Field "lastEditedTime" should not be null')
    return value
  }

  getMultiSelect(name: keyof T): string[] {
    return this._getPropertyAsStringArray(name)
  }

  getNumber(name: keyof T): number | null {
    return this._getPropertyAsNumber(name)
  }

  getPeople(name: keyof T): string[] {
    return this._getPropertyAsStringArray(name)
  }

  getPhone(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getRelations(name: keyof T): string[] {
    return this._getPropertyAsStringArray(name)
  }

  getSingleRelation(name: keyof T): string | null {
    return this._getPropertyAsStringArray(name)[0] || null
  }

  getStringArrayRollup(name: keyof T): string[] {
    return this._getPropertyAsStringArray(name)
  }

  getNumberArrayRollup(name: keyof T): number[] {
    const value = this.fields[name]
    if (!Array.isArray(value)) return []
    return value.every((item) => typeof item === 'number') ? value : []
  }

  getBooleanArrayRollup(name: keyof T): boolean[] {
    const value = this.fields[name]
    if (!Array.isArray(value)) return []
    return value.every((item) => typeof item === 'boolean') ? value : []
  }

  getSingleStringRollup(name: keyof T): string | null {
    return this._getPropertyAsStringArray(name)[0] || null
  }

  getDateRollup(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getNumberRollup(name: keyof T): number | null {
    return this._getPropertyAsNumber(name)
  }

  getRichText(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getSelect(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getUrl(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getStatus(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  private _getPropertyAsString(name: keyof T): string | null {
    if (!(name in this.fields)) {
      throw new Error(`Field "${String(name)}" does not exist`)
    }
    const value = this.fields[name]
    if (!value) return null
    return typeof value === 'string' ? value : value.toString()
  }

  private _getPropertyAsStringArray(name: keyof T): string[] {
    const value = this._checkIfPropertyExists(name)
    if (!AirtableTableRecord.isStringArrayProperty(value)) return []
    return value
  }

  private _getPropertyAsDate(name: keyof T): Date | null {
    const value = this._checkIfPropertyExists(name)
    if (!value) return null
    return value instanceof Date ? value : new Date(value.toString())
  }

  private _getPropertyAsNumber(name: keyof T): number | null {
    const value = this._checkIfPropertyExists(name)
    if (!value) return null
    return typeof value === 'number' ? value : parseFloat(value.toString())
  }

  private _getPropertyAsBoolean(name: keyof T): boolean {
    const value = this._checkIfPropertyExists(name)
    return typeof value === 'boolean' ? value : !!value
  }

  private _checkIfPropertyExists(name: keyof T): AirtableTableRecordFieldValue {
    if (!(name in this.fields)) {
      throw new Error(`Field "${String(name)}" does not exist`)
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
