import type { INumberField } from '@domain/interfaces/IField/INumber'
import { BaseField, type IBaseField } from './base'

export class NumberField extends BaseField {
  constructor(config: IBaseField) {
    super(config)
  }

  get config(): INumberField {
    return {
      ...super.config,
      type: 'Number',
    }
  }
}
