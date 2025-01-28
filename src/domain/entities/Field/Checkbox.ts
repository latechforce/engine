import type { ICheckboxField } from '/domain/interfaces/IField/ICheckbox'
import { BaseField, type IBaseField } from './base'

export class CheckboxField extends BaseField {
  constructor(config: IBaseField) {
    super(config)
  }

  get config(): ICheckboxField {
    return {
      ...super.config,
      type: 'Checkbox',
    }
  }
}
