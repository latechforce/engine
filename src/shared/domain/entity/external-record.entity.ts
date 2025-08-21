import { Id } from '../value-object/id.value-object'
import { Name } from '../value-object/name.value-object'

/**
 * Domain representation of external service records
 * Protects domain from external API changes
 */
export class ExternalRecord {
  constructor(
    public readonly id: Id,
    public readonly name: Name,
    public readonly fields: Record<string, unknown>,
    public readonly metadata: {
      createdAt: Date
      updatedAt: Date
      source: string
      version: string
    }
  ) {}

  getField<T = unknown>(fieldName: string): T | undefined {
    return this.fields[fieldName] as T | undefined
  }

  hasField(fieldName: string): boolean {
    return fieldName in this.fields
  }

  getFieldValue<T = unknown>(fieldName: string, defaultValue: T): T {
    const value = this.getField<T>(fieldName)
    return value !== undefined ? value : defaultValue
  }
}
