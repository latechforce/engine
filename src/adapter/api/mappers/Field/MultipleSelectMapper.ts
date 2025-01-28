import { MultipleSelectField } from '/domain/entities/Field/MultipleSelect'
import type { IMultipleSelectField } from '/domain/interfaces/IField/IMultipleSelect'

export class MultipleSelectFieldMapper {
  static toEntity = (config: IMultipleSelectField): MultipleSelectField => {
    return new MultipleSelectField(config)
  }

  static toManyEntities = (configs: IMultipleSelectField[]): MultipleSelectField[] => {
    return configs.map((config) => this.toEntity(config))
  }
}
