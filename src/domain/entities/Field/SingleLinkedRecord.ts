import { BaseField, type BaseFieldConfig } from './base'

export interface SingleLinkedRecordFieldConfig extends BaseFieldConfig {
  type: 'SingleLinkedRecord'
  table: string
}

export class SingleLinkedRecordField extends BaseField {
  table: string

  constructor(config: Omit<SingleLinkedRecordFieldConfig, 'type'>) {
    super(config)
    this.table = config.table
  }

  get config(): SingleLinkedRecordFieldConfig {
    return {
      ...super.config,
      type: 'SingleLinkedRecord',
      table: this.table,
    }
  }
}
