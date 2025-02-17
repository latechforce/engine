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

  getSingleLineText(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getSingleLineTextOrThrow(name: keyof T): string {
    return this._getPropertyAsStringOrThrow(name)
  }

  getCheckbox(name: keyof T): boolean | null {
    return this._getPropertyAsBoolean(name)
  }

  getCheckboxOrThrow(name: keyof T): boolean {
    return this._getPropertyAsBooleanOrThrow(name)
  }

  getCreatedByOrThrow(name: keyof T): string {
    return this._getPropertyAsStringOrThrow(name)
  }

  getCreatedTimeOrThrow(name: keyof T): Date {
    return this._getPropertyAsDateOrThrow(name)
  }

  getDate(name: keyof T): Date | null {
    return this._getPropertyAsDate(name)
  }

  getDateOrThrow(name: keyof T): Date {
    return this._getPropertyAsDateOrThrow(name)
  }

  getEmail(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getEmailOrThrow(name: keyof T): string {
    return this._getPropertyAsStringOrThrow(name)
  }

  getFiles(name: keyof T): AirtableTableRecordFieldFile[] {
    const value = this.fields[name]
    if (!AirtableTableRecord.isFilesProperty(value)) return []
    return value
  }

  getStringFormula(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getStringFormulaOrThrow(name: keyof T): string {
    return this._getPropertyAsStringOrThrow(name)
  }

  getNumberFormula(name: keyof T): number | null {
    return this._getPropertyAsNumber(name)
  }

  getNumberFormulaOrThrow(name: keyof T): number {
    return this._getPropertyAsNumberOrThrow(name)
  }

  getBooleanFormula(name: keyof T): boolean | null {
    return this._getPropertyAsBoolean(name)
  }

  getBooleanFormulaOrThrow(name: keyof T): boolean {
    return this._getPropertyAsBooleanOrThrow(name)
  }

  getDateFormula(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getDateFormulaOrThrow(name: keyof T): Date {
    return this._getPropertyAsDateOrThrow(name)
  }

  getLastEditedBy(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getLastEditedByOrThrow(name: keyof T): string {
    return this._getPropertyAsStringOrThrow(name)
  }

  getLastEditedTime(name: keyof T): Date | null {
    return this._getPropertyAsDate(name)
  }

  getLastEditedTimeOrThrow(name: keyof T): Date {
    return this._getPropertyAsDateOrThrow(name)
  }

  getMultiSelect(name: keyof T): string[] {
    return this._getPropertyAsStringArray(name)
  }

  getNumber(name: keyof T): number | null {
    return this._getPropertyAsNumber(name)
  }

  getNumberOrThrow(name: keyof T): number {
    return this._getPropertyAsNumberOrThrow(name)
  }

  getPeople(name: keyof T): string[] {
    return this._getPropertyAsStringArray(name)
  }

  getPhone(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getPhoneOrThrow(name: keyof T): string {
    return this._getPropertyAsStringOrThrow(name)
  }

  getRelation(name: keyof T): string | null {
    return this._getPropertyAsStringArray(name)[0] || null
  }

  getRelationOrThrow(name: keyof T): string {
    const value = this._getPropertyAsStringArray(name)[0]
    if (!value) throw new Error(`Field "${String(name)}" should not be null`)
    return value
  }

  getRelations(name: keyof T): string[] {
    return this._getPropertyAsStringArray(name)
  }

  getSingleRelation(name: keyof T): string | null {
    return this._getPropertyAsStringArray(name)[0] || null
  }

  getSingleRelationOrThrow(name: keyof T): string {
    const value = this._getPropertyAsStringArray(name)[0]
    if (!value) throw new Error(`Field "${String(name)}" should not be null`)
    return value
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

  getSingleStringRollupOrThrow(name: keyof T): string {
    const value = this._getPropertyAsStringArray(name)[0]
    if (!value) throw new Error(`Field "${String(name)}" should not be null`)
    return value
  }

  getDateRollup(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getDateRollupOrThrow(name: keyof T): Date {
    return this._getPropertyAsDateOrThrow(name)
  }

  getNumberRollup(name: keyof T): number | null {
    return this._getPropertyAsNumber(name)
  }

  getNumberRollupOrThrow(name: keyof T): number {
    return this._getPropertyAsNumberOrThrow(name)
  }

  getLongText(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getLongTextOrThrow(name: keyof T): string {
    return this._getPropertyAsStringOrThrow(name)
  }

  getSelect(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getSelectOrThrow(name: keyof T): string {
    return this._getPropertyAsStringOrThrow(name)
  }

  getUrl(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getUrlOrThrow(name: keyof T): string {
    return this._getPropertyAsStringOrThrow(name)
  }

  private _getPropertyAsString(name: keyof T): string | null {
    if (!(name in this.fields)) {
      throw new Error(`Field "${String(name)}" does not exist`)
    }
    const value = this.fields[name]
    if (!value) return null
    return typeof value === 'string' ? value : value.toString()
  }

  private _getPropertyAsStringOrThrow(name: keyof T): string {
    const value = this._getPropertyAsString(name)
    if (value === null) throw new Error(`Field "${String(name)}" should not be null`)
    return value
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

  private _getPropertyAsDateOrThrow(name: keyof T): Date {
    const value = this._getPropertyAsDate(name)
    if (value === null) throw new Error(`Field "${String(name)}" should not be null`)
    return value
  }

  private _getPropertyAsNumber(name: keyof T): number | null {
    const value = this._checkIfPropertyExists(name)
    if (!value) return null
    return typeof value === 'number' ? value : parseFloat(value.toString())
  }

  private _getPropertyAsNumberOrThrow(name: keyof T): number {
    const value = this._getPropertyAsNumber(name)
    if (value === null) throw new Error(`Field "${String(name)}" should not be null`)
    return value
  }

  private _getPropertyAsBoolean(name: keyof T): boolean | null {
    const value = this._checkIfPropertyExists(name)
    if (value === null) return null
    return typeof value === 'boolean' ? value : !!value
  }

  private _getPropertyAsBooleanOrThrow(name: keyof T): boolean {
    const value = this._getPropertyAsBoolean(name)
    if (value === null) throw new Error(`Field "${String(name)}" should not be null`)
    return value
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
