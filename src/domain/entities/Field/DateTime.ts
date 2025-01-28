import type { IDateTimeField } from '/domain/interfaces/IField/IDateTime'
import { BaseField, type IBaseField } from './base'

export class DateTimeField extends BaseField {
  constructor(config: IBaseField) {
    super(config)
  }

  get config(): IDateTimeField {
    return {
      ...super.config,
      type: 'DateTime',
    }
  }
}
