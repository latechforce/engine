import type { ISingleAttachmentField } from '/domain/interfaces/IField/ISingleAttachment'
import { BaseField, type IBaseField } from './base'

interface SingleAttachmentFieldParams extends IBaseField {}

export class SingleAttachmentField extends BaseField {
  constructor(config: SingleAttachmentFieldParams) {
    super(config)
  }

  get config(): ISingleAttachmentField {
    return {
      ...super.config,
      type: 'SingleAttachment',
    }
  }
}
