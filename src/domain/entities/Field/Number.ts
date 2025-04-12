import { BaseField, type BaseFieldConfig } from './base'

export interface NumberFieldConfig extends BaseFieldConfig {
  type: 'Number'
}

export class NumberField extends BaseField {
  constructor(config: Omit<NumberFieldConfig, 'type'>) {
    super(config)
  }

  get config(): NumberFieldConfig {
    return {
      ...super.config,
      type: 'Number',
    }
  }
}
