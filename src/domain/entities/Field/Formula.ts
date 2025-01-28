import type { IFormulaField } from '/domain/interfaces/IField/IFormula'
import { BaseField, type IBaseField } from './base'
import type { DateTimeField } from './DateTime'
import type { LongTextField } from './LongText'
import type { NumberField } from './Number'
import type { SingleLineTextField } from './SingleLineText'

interface FormulaFieldConfig extends IBaseField {
  formula: string
  output: NumberField | LongTextField | SingleLineTextField | DateTimeField
}

export class FormulaField extends BaseField {
  formula: string
  output: NumberField | LongTextField | SingleLineTextField | DateTimeField

  constructor(config: FormulaFieldConfig) {
    super(config)
    this.formula = config.formula
    this.output = config.output
  }

  get config(): IFormulaField {
    return {
      ...super.config,
      type: 'Formula',
      formula: this.formula,
      output: this.output.config,
    }
  }
}
