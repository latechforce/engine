import { BaseField, type BaseFieldConfig } from './base'

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: 'Checkbox'
}

export class CheckboxField extends BaseField {
  constructor(config: Omit<CheckboxFieldConfig, 'type'>) {
    super(config)
  }

  get config(): CheckboxFieldConfig {
    return {
      ...super.config,
      type: 'Checkbox',
    }
  }
}
