import { MultipleLinkedRecordField } from '/domain/entities/Field/MultipleLinkedRecord'
import type { IMultipleLinkedRecordField } from '/domain/interfaces/IField/IMultipleLinkedRecord'

export class MultipleLinkedRecordFieldMapper {
  static toEntity = (config: IMultipleLinkedRecordField): MultipleLinkedRecordField => {
    return new MultipleLinkedRecordField(config)
  }
}
