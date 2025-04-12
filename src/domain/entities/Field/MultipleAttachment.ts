import { BaseField, type BaseFieldConfig } from './base'

export interface MultipleAttachmentFieldConfig extends BaseFieldConfig {
  type: 'MultipleAttachment'
}

export class MultipleAttachmentField extends BaseField {
  constructor(config: Omit<MultipleAttachmentFieldConfig, 'type'>) {
    super(config)
  }

  get config(): MultipleAttachmentFieldConfig {
    return {
      ...super.config,
      type: 'MultipleAttachment',
    }
  }
}
