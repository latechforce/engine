import type { IMultipleLinkedRecordField } from '@domain/interfaces/IField/IMultipleLinkedRecord'
import { BaseField, type IBaseField } from './base'

interface MultipleLinkedRecordFieldConfig extends IBaseField {
  table: string
}

export class MultipleLinkedRecordField extends BaseField {
  table: string

  constructor(config: MultipleLinkedRecordFieldConfig) {
    super(config)
    this.table = config.table
  }

  get config(): IMultipleLinkedRecordField {
    return {
      ...super.config,
      type: 'MultipleLinkedRecord',
      table: this.table,
    }
  }
}
