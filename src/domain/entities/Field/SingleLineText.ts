import { BaseField, type BaseFieldConfig } from './base'

export interface SingleLineTextFieldConfig extends BaseFieldConfig {
  type: 'SingleLineText'
}

export class SingleLineTextField extends BaseField {
  constructor(config: Omit<SingleLineTextFieldConfig, 'type'>) {
    super(config)
  }

  get config(): SingleLineTextFieldConfig {
    return {
      ...super.config,
      type: 'SingleLineText',
    }
  }
}
