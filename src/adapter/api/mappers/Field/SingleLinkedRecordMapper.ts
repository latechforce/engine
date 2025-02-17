import { SingleLinkedRecordField } from '/domain/entities/Field/SingleLinkedRecord'
import type { ISingleLinkedRecordField } from '/domain/interfaces/IField/ISingleLinkedRecord'

export class SingleLinkedRecordFieldMapper {
  static toEntity = (config: ISingleLinkedRecordField): SingleLinkedRecordField => {
    return new SingleLinkedRecordField(config)
  }
}
