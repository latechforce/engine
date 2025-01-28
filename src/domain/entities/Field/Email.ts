import type { IEmailField } from '/domain/interfaces/IField/IEmail'
import { BaseField, type IBaseField } from './base'

export class EmailField extends BaseField {
  constructor(config: IBaseField) {
    super(config)
  }

  get config(): IEmailField {
    return {
      ...super.config,
      type: 'Email',
    }
  }
}
