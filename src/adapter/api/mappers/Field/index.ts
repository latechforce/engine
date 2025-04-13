import type { Field, FieldConfig } from '/domain/entities/Field'
import { SingleLineTextField } from '/domain/entities/Field/SingleLineText'
import { LongTextField } from '/domain/entities/Field/LongText'
import { DateTimeField } from '/domain/entities/Field/DateTime'
import { EmailField } from '/domain/entities/Field/Email'
import { NumberField } from '/domain/entities/Field/Number'
import { FormulaField } from '/domain/entities/Field/Formula'
import { SingleSelectField } from '/domain/entities/Field/SingleSelect'
import { MultipleSelectField } from '/domain/entities/Field/MultipleSelect'
import { SingleLinkedRecordField } from '/domain/entities/Field/SingleLinkedRecord'
import { MultipleLinkedRecordField } from '/domain/entities/Field/MultipleLinkedRecord'
import { MultipleAttachmentField } from '/domain/entities/Field/MultipleAttachment'
import { SingleAttachmentField } from '/domain/entities/Field/SingleAttachment'
import { CheckboxField } from '/domain/entities/Field/Checkbox'
import { UrlField } from '/domain/entities/Field/Url'
import { RollupFieldMapper } from './RollupMapper'
import type { FieldTableSchema } from '../../schemas/TableSchema/FieldSchema'

export class FieldMapper {
  static toEntity(config: FieldTableSchema, fields: FieldTableSchema[]): Field {
    const { type } = config
    switch (type) {
      case 'SingleLineText':
        return new SingleLineTextField(config)
      case 'LongText':
        return new LongTextField(config)
      case 'DateTime':
        return new DateTimeField(config)
      case 'Email':
        return new EmailField(config)
      case 'Number':
        return new NumberField(config)
      case 'Formula':
        return new FormulaField(config)
      case 'SingleSelect':
        return new SingleSelectField(config)
      case 'MultipleSelect':
        return new MultipleSelectField(config)
      case 'SingleLinkedRecord':
        return new SingleLinkedRecordField(config)
      case 'MultipleLinkedRecord':
        return new MultipleLinkedRecordField(config)
      case 'MultipleAttachment':
        return new MultipleAttachmentField(config)
      case 'SingleAttachment':
        return new SingleAttachmentField(config)
      case 'Rollup':
        return RollupFieldMapper.toEntity(config, fields)
      case 'Checkbox':
        return new CheckboxField(config)
      case 'Url':
        return new UrlField(config)
      default:
        throw new Error(`FieldMapper: type ${type} not found`)
    }
  }

  static toConfig(schema: FieldTableSchema, fields: FieldTableSchema[]): FieldConfig {
    return this.toEntity(schema, fields).config
  }

  static toOutputEntity(
    schema: FieldTableSchema
  ): DateTimeField | SingleLineTextField | LongTextField | NumberField {
    const { type } = schema
    switch (type) {
      case 'DateTime':
        return new DateTimeField(schema)
      case 'SingleLineText':
        return new SingleLineTextField(schema)
      case 'LongText':
        return new LongTextField(schema)
      case 'Number':
        return new NumberField(schema)
      default:
        throw new Error(`FieldMapper: type ${type} not found`)
    }
  }

  static toManyEntities(schemas: FieldTableSchema[]): Field[] {
    return schemas.map((schema) => this.toEntity(schema, schemas))
  }

  static toManyConfigs(schemas: FieldTableSchema[]): FieldConfig[] {
    return schemas.map((schema) => this.toConfig(schema, schemas))
  }
}
