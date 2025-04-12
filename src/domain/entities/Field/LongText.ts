import { BaseField, type BaseFieldConfig } from './base'

export interface LongTextFieldConfig extends BaseFieldConfig {
  type: 'LongText'
}

export class LongTextField extends BaseField {
  constructor(config: Omit<LongTextFieldConfig, 'type'>) {
    super(config)
  }

  get config(): LongTextFieldConfig {
    return {
      ...super.config,
      type: 'LongText',
    }
  }
}
