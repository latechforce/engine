import type { IMultipleSelectField } from '@domain/interfaces/IField/IMultipleSelect'
import { BaseField, type IBaseField } from './base'

interface MultipleSelectFieldParams extends IBaseField {
  options: string[]
}

export class MultipleSelectField extends BaseField {
  options: string[]

  constructor(config: MultipleSelectFieldParams) {
    super(config)
    this.options = config.options
  }

  get config(): IMultipleSelectField {
    return {
      ...super.config,
      type: 'MultipleSelect',
      options: this.options,
    }
  }
}
