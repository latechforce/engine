import { BaseField, type BaseFieldConfig } from './base'

export interface SingleSelectFieldConfig extends BaseFieldConfig {
  type: 'SingleSelect'
  options: string[]
}

export class SingleSelectField extends BaseField {
  options: string[]

  constructor(config: Omit<SingleSelectFieldConfig, 'type'>) {
    super(config)
    this.options = config.options
  }

  get config(): SingleSelectFieldConfig {
    return {
      ...super.config,
      type: 'SingleSelect',
      options: this.options,
    }
  }
}
