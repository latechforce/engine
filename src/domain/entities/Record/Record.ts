import type { RecordFieldAttachment, RecordFields, PersistedRecordFields } from './RecordTypes'

export class Record<T extends RecordFields = RecordFields> {
  constructor(
    readonly id: string,
    readonly fields: T,
    readonly created_at: Date,
    readonly updated_at?: Date
  ) {}

  toJson(): PersistedRecordFields<T> {
    return {
      id: this.id,
      created_at: this.created_at,
      updated_at: this.updated_at,
      fields: this.fields,
    }
  }

  getFieldAsString(key: string): string | null {
    const value = this.fields[key]
    if (!value) return null
    return typeof value === 'string' ? value : value.toString()
  }

  getFieldAsArrayString(key: string): string[] | null {
    const value = this.fields[key]
    if (!value) return null
    return Array.isArray(value) && value.every((item) => typeof item === 'string') ? value : null
  }

  getFieldAsDate(key: string): Date | null {
    const value = this.fields[key]
    if (!value || typeof value === 'boolean') return null
    return value instanceof Date ? value : new Date(value.toString())
  }

  getFieldAsNumber(key: string): number | null {
    const value = this.fields[key]
    if (!value || typeof value === 'boolean') return null
    return typeof value === 'number' ? value : parseFloat(value.toString())
  }

  getFieldAsBoolean(key: string): boolean | null {
    const value = this.fields[key]
    if (!value && typeof value !== 'boolean' && typeof value !== 'number') return null
    return typeof value === 'boolean' ? value : !!value
  }

  getFieldAsArrayAttachment(key: string): RecordFieldAttachment[] {
    const value = this.fields[key]
    if (!value) return []
    if (
      Array.isArray(value) &&
      value.every(
        (item) =>
          typeof item === 'object' &&
          'id' in item &&
          'url' in item &&
          'name' in item &&
          'created_at' in item
      )
    ) {
      return value
    }
    return []
  }

  getFieldAsAttachment(key: string): RecordFieldAttachment | null {
    const value = this.fields[key]
    if (!value) return null
    if (
      typeof value === 'object' &&
      'id' in value &&
      'url' in value &&
      'name' in value &&
      'created_at' in value
    ) {
      return value
    }
    return null
  }
}
