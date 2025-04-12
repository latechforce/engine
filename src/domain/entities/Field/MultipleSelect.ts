import { BaseField, type BaseFieldConfig } from './base'

export interface MultipleSelectFieldConfig extends BaseFieldConfig {
  type: 'MultipleSelect'
  options: string[]
}

export class MultipleSelectField extends BaseField {
  options: string[]

  constructor(config: Omit<MultipleSelectFieldConfig, 'type'>) {
    super(config)
    this.options = config.options
  }

  get config(): MultipleSelectFieldConfig {
    return {
      ...super.config,
      type: 'MultipleSelect',
      options: this.options,
    }
  }
}
