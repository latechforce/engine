import type { ILongTextField } from '/domain/interfaces/IField/ILongText'
import { BaseField, type IBaseField } from './base'

export class LongTextField extends BaseField {
  constructor(config: IBaseField) {
    super(config)
  }

  get config(): ILongTextField {
    return {
      ...super.config,
      type: 'LongText',
    }
  }
}
