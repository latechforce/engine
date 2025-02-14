export type ConvertToNotionTablePageProperties<T> = {
  [K in keyof T]: NotionTablePagePropertyValue
}

export type NotionTablePageProperties = Record<string, NotionTablePagePropertyValue>

export type NotionTablePagePropertyFile = { name: string; url: string }

export type NotionTablePagePropertyValue =
  | string
  | number
  | boolean
  | Date
  | NotionTablePagePropertyValue[]
  | NotionTablePagePropertyFile[]
  | null
  | undefined

export class NotionTablePage<T extends NotionTablePageProperties = NotionTablePageProperties> {
  readonly id: string

  constructor(
    id: string,
    readonly properties: T,
    readonly createdTime: Date,
    readonly lastEditedTime: Date,
    readonly archived: boolean
  ) {
    this.id = id.replace(/-/g, '')
  }

  getTitle(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getCheckbox(name: keyof T): boolean {
    return this._getPropertyAsBoolean(name)
  }

  getCreatedBy(name: keyof T): string {
    const value = this._getPropertyAsString(name)
    if (!value) throw new Error('Property "createdBy" should not be null')
    return value
  }

  getCreatedTime(name: keyof T): Date {
    const value = this._getPropertyAsDate(name)
    if (!value) throw new Error('Property "createdTime" should not be null')
    return value
  }

  getDate(name: keyof T): Date | null {
    return this._getPropertyAsDate(name)
  }

  getEmail(name: keyof T): string | null {
    return this._getPropertyAsString(name)
  }

  getFiles(name: keyof T): NotionTablePagePropertyFile[] {
    const value = this.properties[name]
    if (!NotionTablePage.isFilesProperty(value)) return []
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

  getDateFormula(name: keyof T): Date | null {
    return this._getPropertyAsDate(name)
  }

  getLastEditedBy(name: keyof T): string {
    const value = this._getPropertyAsString(name)
    if (!value) throw new Error('Property "lastEditedBy" should not be null')
    return value
  }

  getLastEditedTime(name: keyof T): Date {
    const value = this._getPropertyAsDate(name)
    if (!value) throw new Error('Property "lastEditedTime" should not be null')
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

  getRelation(name: keyof T): string | null {
    return this._getPropertyAsStringArray(name)[0] || null
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
    const value = this.properties[name]
    if (!Array.isArray(value)) return []
    return value.every((item) => typeof item === 'number') ? value : []
  }

  getBooleanArrayRollup(name: keyof T): boolean[] {
    const value = this.properties[name]
    if (!Array.isArray(value)) return []
    return value.every((item) => typeof item === 'boolean') ? value : []
  }

  getSingleStringRollup(name: keyof T): string | null {
    return this._getPropertyAsStringArray(name)[0] || null
  }

  getDateRollup(name: keyof T): Date | null {
    return this._getPropertyAsDate(name)
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
    if (!(name in this.properties)) {
      throw new Error(`Property "${String(name)}" does not exist`)
    }
    const value = this.properties[name]
    if (!value) return null
    return typeof value === 'string' ? value : value.toString()
  }

  private _getPropertyAsStringArray(name: keyof T): string[] {
    const value = this._checkIfPropertyExists(name)
    if (!NotionTablePage.isStringArrayProperty(value)) return []
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

  private _checkIfPropertyExists(name: keyof T): NotionTablePagePropertyValue {
    if (!(name in this.properties)) {
      throw new Error(`Property "${String(name)}" does not exist`)
    }
    return this.properties[name]
  }

  static isFilesProperty = (value: unknown): value is NotionTablePagePropertyFile[] => {
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

  static isStringArrayProperty = (value: NotionTablePagePropertyValue): value is string[] => {
    return Array.isArray(value) && value.every((item) => typeof item === 'string')
  }
}
