import type { ISingleLineTextField } from '@domain/interfaces/IField/ISingleLineText'
import { BaseField, type IBaseField } from './base'

export class SingleLineTextField extends BaseField {
  constructor(config: IBaseField) {
    super(config)
  }

  get config(): ISingleLineTextField {
    return {
      ...super.config,
      type: 'SingleLineText',
    }
  }
}
