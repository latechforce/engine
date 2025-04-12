import { BaseField, type BaseFieldConfig } from './base'

export interface DateTimeFieldConfig extends BaseFieldConfig {
  type: 'DateTime'
}

export class DateTimeField extends BaseField {
  constructor(config: Omit<DateTimeFieldConfig, 'type'>) {
    super(config)
  }

  get config(): DateTimeFieldConfig {
    return {
      ...super.config,
      type: 'DateTime',
    }
  }
}
