import { MultipleLinkedRecordField } from '@domain/entities/Field/MultipleLinkedRecord'
import type { IMultipleLinkedRecordField } from '@domain/interfaces/IField/IMultipleLinkedRecord'

export class MultipleLinkedRecordFieldMapper {
  static toEntity = (config: IMultipleLinkedRecordField): MultipleLinkedRecordField => {
    return new MultipleLinkedRecordField(config)
  }

  static toManyEntities = (configs: IMultipleLinkedRecordField[]): MultipleLinkedRecordField[] => {
    return configs.map((config) => this.toEntity(config))
  }
}
