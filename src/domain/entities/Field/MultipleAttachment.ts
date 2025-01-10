import type { IMultipleAttachmentField } from '@domain/interfaces/IField/IMultipleAttachment'
import { BaseField, type IBaseField } from './base'

interface MultipleAttachmentFieldParams extends IBaseField {}

export class MultipleAttachmentField extends BaseField {
  constructor(config: MultipleAttachmentFieldParams) {
    super(config)
  }

  get config(): IMultipleAttachmentField {
    return {
      ...super.config,
      type: 'MultipleAttachment',
    }
  }
}
