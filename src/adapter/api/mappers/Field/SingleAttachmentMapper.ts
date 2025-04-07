import { SingleAttachmentField } from '/domain/entities/Field/SingleAttachment'
import type { ISingleAttachmentField } from '/domain/interfaces/IField/ISingleAttachment'

export class SingleAttachmentFieldMapper {
  static toEntity = (config: ISingleAttachmentField): SingleAttachmentField => {
    return new SingleAttachmentField(config)
  }
}
