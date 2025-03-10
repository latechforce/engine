import { MultipleAttachmentField } from '/domain/entities/Field/MultipleAttachment'
import type { IMultipleAttachmentField } from '/domain/interfaces/IField/IMultipleAttachment'

export class MultipleAttachmentFieldMapper {
  static toEntity = (config: IMultipleAttachmentField): MultipleAttachmentField => {
    return new MultipleAttachmentField(config)
  }
}
