import { BaseField, type BaseFieldConfig } from './base'
import { DateTimeField, type DateTimeFieldConfig } from './DateTime'
import { LongTextField, type LongTextFieldConfig } from './LongText'
import { NumberField, type NumberFieldConfig } from './Number'
import { SingleLineTextField, type SingleLineTextFieldConfig } from './SingleLineText'

export interface FormulaFieldConfig extends BaseFieldConfig {
  type: 'Formula'
  formula: string
  output: Omit<
    NumberFieldConfig | LongTextFieldConfig | SingleLineTextFieldConfig | DateTimeFieldConfig,
    'name' | 'required'
  >
}

export class FormulaField extends BaseField {
  formula: string
  output: NumberField | LongTextField | SingleLineTextField | DateTimeField

  constructor(config: Omit<FormulaFieldConfig, 'type'>) {
    super(config)
    const { name, output, formula } = config
    this.formula = formula
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
        break
    }
  }

  get config(): FormulaFieldConfig {
    return {
      ...super.config,
      type: 'Formula',
      formula: this.formula,
      output: this.output.config,
    }
  }
}
