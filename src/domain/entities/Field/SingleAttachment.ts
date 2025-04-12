import { BaseField, type BaseFieldConfig } from './base'

export interface SingleAttachmentFieldConfig extends BaseFieldConfig {
  type: 'SingleAttachment'
}

export class SingleAttachmentField extends BaseField {
  constructor(config: Omit<SingleAttachmentFieldConfig, 'type'>) {
    super(config)
  }

  get config(): SingleAttachmentFieldConfig {
    return {
      ...super.config,
      type: 'SingleAttachment',
    }
  }
}
