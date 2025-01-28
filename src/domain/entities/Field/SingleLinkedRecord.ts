import type { ISingleLinkedRecordField } from '/domain/interfaces/IField/ISingleLinkedRecord'
import { BaseField, type IBaseField } from './base'

interface SingleLinkedRecordFieldConfig extends IBaseField {
  table: string
}

export class SingleLinkedRecordField extends BaseField {
  table: string

  constructor(config: SingleLinkedRecordFieldConfig) {
    super(config)
    this.table = config.table
  }

  get config(): ISingleLinkedRecordField {
    return {
      ...super.config,
      type: 'SingleLinkedRecord',
      table: this.table,
    }
  }
}
