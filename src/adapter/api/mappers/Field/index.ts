import type { IField } from '@domain/interfaces/IField'
import type { Field } from '@domain/entities/Field'
import { DateTimeFieldMapper } from './DateTimeMapper'
import { EmailFieldMapper } from './EmailMapper'
import { FormulaFieldMapper } from './FormulaMapper'
import { LongTextFieldMapper } from './LongTextMapper'
import { MultipleLinkedRecordFieldMapper } from './MultipleLinkedRecordMapper'
import { NumberFieldMapper } from './NumberMapper'
import { RollupFieldMapper } from './RollupMapper'
import { SingleLineTextFieldMapper } from './SingleLineTextMapper'
import { SingleLinkedRecordFieldMapper } from './SingleLinkedRecordMapper'
import { SingleSelectFieldMapper } from './SingleSelectMapper'
import { CheckboxFieldMapper } from './CheckboxMapper'
import type { DateTimeField } from '@domain/entities/Field/DateTime'
import type { LongTextField } from '@domain/entities/Field/LongText'
import type { NumberField } from '@domain/entities/Field/Number'
import type { SingleLineTextField } from '@domain/entities/Field/SingleLineText'
import { MultipleSelectFieldMapper } from './MultipleSelectMapper'
import { MultipleAttachmentFieldMapper } from './MultipleAttachmentMapper'

export class FieldMapper {
  static toEntity(config: IField, fields: IField[]): Field {
    const { type } = config
    switch (type) {
      case 'SingleLineText':
        return SingleLineTextFieldMapper.toEntity(config)
      case 'LongText':
        return LongTextFieldMapper.toEntity(config)
      case 'DateTime':
        return DateTimeFieldMapper.toEntity(config)
      case 'Email':
        return EmailFieldMapper.toEntity(config)
      case 'Number':
        return NumberFieldMapper.toEntity(config)
      case 'Formula':
        return FormulaFieldMapper.toEntity(config)
      case 'SingleSelect':
        return SingleSelectFieldMapper.toEntity(config)
      case 'MultipleSelect':
        return MultipleSelectFieldMapper.toEntity(config)
      case 'SingleLinkedRecord':
        return SingleLinkedRecordFieldMapper.toEntity(config)
      case 'MultipleLinkedRecord':
        return MultipleLinkedRecordFieldMapper.toEntity(config)
      case 'MultipleAttachment':
        return MultipleAttachmentFieldMapper.toEntity(config)
      case 'Rollup':
        return RollupFieldMapper.toEntity(config, fields)
      case 'Checkbox':
        return CheckboxFieldMapper.toEntity(config)
      default:
        throw new Error(`FieldMapper: type ${type} not found`)
    }
  }

  static toOutputEntity(
    config: IField
  ): DateTimeField | SingleLineTextField | LongTextField | NumberField {
    const { type } = config
    switch (type) {
      case 'DateTime':
        return DateTimeFieldMapper.toEntity(config)
      case 'SingleLineText':
        return SingleLineTextFieldMapper.toEntity(config)
      case 'LongText':
        return LongTextFieldMapper.toEntity(config)
      case 'Number':
        return NumberFieldMapper.toEntity(config)
      default:
        throw new Error(`FieldMapper: type ${type} not found`)
    }
  }

  static toManyEntities(configs: IField[]): Field[] {
    return configs.map((config) => this.toEntity(config, configs))
  }
}
