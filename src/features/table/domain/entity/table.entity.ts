import type { TableSchema } from '@/table/domain/schema/table.schema'
import { Field } from './field.entity'
import type { JSONSchema7 } from 'json-schema'
import type { Fields } from '../object-value/fields.object-value'

export class Table {
  public readonly slug: string
  public readonly fields: Field[]

  constructor(public readonly schema: TableSchema) {
    this.slug = this.slugify(schema.name)
    this.fields = schema.fields.map((field) => new Field(field))
  }

  getRecordFieldsSchema(): JSONSchema7 {
    return {
      type: 'object',
      properties: this.fields.reduce((acc: { [key: string]: JSONSchema7 }, field) => {
        switch (field.schema.type) {
          case 'single-line-text':
          case 'long-text':
            acc[field.schema.name] = { type: 'string' }
            break
        }
        return acc
      }, {}),
      required: this.fields
        .filter((field) => field.schema.required)
        .map((field) => field.schema.name),
      additionalProperties: false,
    }
  }

  convertFieldsSlugToName(slugs: { [key: string]: string }): Fields {
    return Object.fromEntries(
      Object.entries(slugs).map(([key, value]) => [
        this.fields.find((f) => f.slug === key)?.schema.name ?? key,
        value,
      ])
    )
  }

  private slugify(text: string) {
    let slug = text
      .toLowerCase()
      .normalize('NFD') // normalize accents
      .replace(/[\u0300-\u036f]/g, '') // remove diacritics
      .replace(/[^a-z0-9]+/g, '_') // replace non-alphanumeric with underscore
      .replace(/^_+|_+$/g, '') // remove leading/trailing underscores

    // Make sure it starts with a letter
    slug = slug.replace(/^[^a-z]+/, '')

    // Truncate to 63 characters
    slug = slug.slice(0, 63)

    if (slug.length === 0) {
      slug = `table_${Math.random().toString(36).substring(2, 8)}`
    }

    return slug
  }
}
