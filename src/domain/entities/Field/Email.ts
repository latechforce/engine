import { BaseField, type BaseFieldConfig } from './base'

export interface EmailFieldConfig extends BaseFieldConfig {
  type: 'Email'
}

export class EmailField extends BaseField {
  constructor(config: Omit<EmailFieldConfig, 'type'>) {
    super(config)
  }

  get config(): EmailFieldConfig {
    return {
      ...super.config,
      type: 'Email',
    }
  }
}
