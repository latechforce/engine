import type { ISingleSelectField } from '/domain/interfaces/IField/ISingleSelect'
import { BaseField, type IBaseField } from './base'

interface SingleSelectFieldParams extends IBaseField {
  options: string[]
}

export class SingleSelectField extends BaseField {
  options: string[]

  constructor(config: SingleSelectFieldParams) {
    super(config)
    this.options = config.options
  }

  get config(): ISingleSelectField {
    return {
      ...super.config,
      type: 'SingleSelect',
      options: this.options,
    }
  }
}
