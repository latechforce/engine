import { BaseField, type BaseFieldConfig } from './base'
import { DateTimeField, type DateTimeFieldConfig } from './DateTime'
import { LongTextField, type LongTextFieldConfig } from './LongText'
import {
  MultipleLinkedRecordField,
  type MultipleLinkedRecordFieldConfig,
} from './MultipleLinkedRecord'
import { NumberField, type NumberFieldConfig } from './Number'
import { SingleLineTextField, type SingleLineTextFieldConfig } from './SingleLineText'

export interface RollupFieldConfig extends BaseFieldConfig {
  type: 'Rollup'
  formula: string
  multipleLinkedRecord: MultipleLinkedRecordFieldConfig
  linkedRecordField: string
  output: Omit<
    NumberFieldConfig | LongTextFieldConfig | SingleLineTextFieldConfig | DateTimeFieldConfig,
    'name' | 'required'
  >
}

export class RollupField extends BaseField {
  formula: string
  multipleLinkedRecord: MultipleLinkedRecordField
  linkedRecordField: string
  output: NumberField | LongTextField | SingleLineTextField | DateTimeField

  constructor(config: Omit<RollupFieldConfig, 'type'>) {
    super(config)
    const { name, output, formula, linkedRecordField } = config
    this.formula = formula
    this.multipleLinkedRecord = new MultipleLinkedRecordField(config.multipleLinkedRecord)
    this.linkedRecordField = linkedRecordField
    switch (config.output.type) {
      case 'Number':
        this.output = new NumberField({ ...output, name })
        break
      case 'LongText':
        this.output = new LongTextField({ ...output, name })
        break
      case 'SingleLineText':
        this.output = new SingleLineTextField({ ...output, name })
        break
      case 'DateTime':
        this.output = new DateTimeField({ ...output, name })
    }
  }

  get table() {
    return this.multipleLinkedRecord.table
  }

  get config(): RollupFieldConfig {
    return {
      ...super.config,
      type: 'Rollup',
      formula: this.formula,
      multipleLinkedRecord: this.multipleLinkedRecord.config,
      linkedRecordField: this.linkedRecordField,
      output: this.output.config,
    }
  }
}
