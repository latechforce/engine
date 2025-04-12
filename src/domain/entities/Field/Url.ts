import { BaseField, type BaseFieldConfig } from './base'

export interface UrlFieldConfig extends BaseFieldConfig {
  type: 'Url'
}

export class UrlField extends BaseField {
  constructor(config: Omit<UrlFieldConfig, 'type'>) {
    super(config)
  }

  get config(): UrlFieldConfig {
    return {
      ...super.config,
      type: 'Url',
    }
  }
}
