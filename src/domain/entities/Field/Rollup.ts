import type { IRollupField } from '@domain/interfaces/IField/IRollup'
import { BaseField, type IBaseField } from './base'
import type { DateTimeField } from './DateTime'
import type { LongTextField } from './LongText'
import type { MultipleLinkedRecordField } from './MultipleLinkedRecord'
import type { NumberField } from './Number'
import type { SingleLineTextField } from './SingleLineText'

interface RollupFieldConfig extends IBaseField {
  formula: string
  multipleLinkedRecord: MultipleLinkedRecordField
  linkedRecordField: string
  output: NumberField | LongTextField | SingleLineTextField | DateTimeField
}

export class RollupField extends BaseField {
  formula: string
  multipleLinkedRecord: MultipleLinkedRecordField
  linkedRecordField: string
  output: NumberField | LongTextField | SingleLineTextField | DateTimeField

  constructor(config: RollupFieldConfig) {
    super(config)
    this.formula = config.formula
    this.multipleLinkedRecord = config.multipleLinkedRecord
    this.linkedRecordField = config.linkedRecordField
    this.output = config.output
  }

  get table() {
    return this.multipleLinkedRecord.table
  }

  get config(): IRollupField {
    return {
      ...super.config,
      type: 'Rollup',
      formula: this.formula,
      multipleLinkedRecord: this.table,
      linkedRecordField: this.linkedRecordField,
      output: this.output.config,
    }
  }
}
