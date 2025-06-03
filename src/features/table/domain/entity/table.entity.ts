import type { TableSchema } from '@/table/domain/schema/table.schema'
import { Field } from './field.entity'
import type { Fields } from '../object-value/fields.object-value'
import type { SchemaObject } from 'ajv'
import type { FieldValue } from '../object-value/field-value.object-value'

export class Table {
  public readonly slug: string
  public readonly fields: Field[]

  constructor(public readonly schema: TableSchema) {
    this.slug = this.slugify(schema.name)
    this.fields = schema.fields.map((field) => new Field(field))
  }

  findField(nameOrId: string | number): Field | undefined {
    return this.fields.find(
      (field) =>
        field.slug === String(nameOrId) ||
        field.schema.name === String(nameOrId) ||
        field.schema.id === Number(nameOrId)
    )
  }

  getRecordFieldsSchema(): SchemaObject {
    return {
      type: 'object',
      properties: this.fields.reduce((acc: { [key: string]: SchemaObject }, field) => {
        const { type, name } = field.schema
        switch (type) {
          case 'single-line-text':
          case 'long-text':
          case 'url':
          case 'email':
          case 'phone-number':
          case 'single-attachment':
            acc[name] = { type: 'string' }
            break
          case 'checkbox':
            acc[name] = { type: 'boolean' }
            break
          case 'single-select':
            acc[name] = {
              type: 'string',
              enum: field.schema.options,
            }
            break
          default: {
            const _exhaustiveCheck: never = type
            throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
          }
        }
        return acc
      }, {}),
      required: this.fields
        .filter((field) => field.schema.required)
        .map((field) => field.schema.name),
      additionalProperties: false,
    }
  }

  getSingleCreateRecordSchema(): SchemaObject {
    return {
      type: 'object',
      properties: {
        fields: this.getRecordFieldsSchema(),
      },
      required: ['fields'],
      additionalProperties: false,
    }
  }

  getMultipleCreateRecordSchema(): SchemaObject {
    return {
      type: 'object',
      properties: {
        records: {
          type: 'array',
          items: this.getSingleCreateRecordSchema(),
        },
      },
      required: ['records'],
      additionalProperties: false,
    }
  }

  getSingleOrMultipleCreateRecordSchema(): SchemaObject {
    return {
      type: 'object',
      oneOf: [
        {
          title: 'Single record',
          ...this.getSingleCreateRecordSchema(),
        },
        {
          title: 'Multiple records',
          ...this.getMultipleCreateRecordSchema(),
        },
      ],
    }
  }

  getReadRecordSchema(): SchemaObject {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        fields: this.getRecordFieldsSchema(),
      },
      required: ['id', 'createdAt', 'updatedAt', 'fields'],
      additionalProperties: false,
    }
  }

  getSingleReadRecordSchema(): SchemaObject {
    return {
      type: 'object',
      properties: {
        record: this.getReadRecordSchema(),
      },
      required: ['record'],
      additionalProperties: false,
    }
  }

  getMultipleReadRecordSchema(): SchemaObject {
    return {
      type: 'object',
      properties: {
        records: {
          type: 'array',
          items: this.getReadRecordSchema(),
        },
      },
      required: ['records'],
      additionalProperties: false,
    }
  }

  getSingleOrMultipleReadRecordSchema(): SchemaObject {
    return {
      type: 'object',
      oneOf: [
        {
          title: 'Single record',
          ...this.getSingleReadRecordSchema(),
        },
        {
          title: 'Multiple records',
          ...this.getMultipleReadRecordSchema(),
        },
      ],
    }
  }

  getSingleUpdateRecordSchema(): SchemaObject {
    return {
      type: 'object',
      properties: {
        fields: this.getRecordFieldsSchema(),
      },
      required: ['fields'],
      additionalProperties: false,
    }
  }

  getMultipleUpdateRecordSchema(): SchemaObject {
    return {
      type: 'object',
      properties: {
        records: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              fields: this.getRecordFieldsSchema(),
            },
            required: ['id', 'fields'],
            additionalProperties: false,
          },
        },
      },
      required: ['records'],
      additionalProperties: false,
    }
  }

  convertFieldsSlugToName(slugs: { [key: string]: FieldValue }): Fields {
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
