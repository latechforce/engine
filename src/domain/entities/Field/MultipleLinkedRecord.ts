import { BaseField, type BaseFieldConfig } from './base'

export interface MultipleLinkedRecordFieldConfig extends BaseFieldConfig {
  type: 'MultipleLinkedRecord'
  table: string
}

export class MultipleLinkedRecordField extends BaseField {
  table: string

  constructor(config: Omit<MultipleLinkedRecordFieldConfig, 'type'>) {
    super(config)
    this.table = config.table
  }

  get config(): MultipleLinkedRecordFieldConfig {
    return {
      ...super.config,
      type: 'MultipleLinkedRecord',
      table: this.table,
    }
  }
}
