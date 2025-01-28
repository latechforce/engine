import { SingleSelectField } from '/domain/entities/Field/SingleSelect'
import type { ISingleSelectField } from '/domain/interfaces/IField/ISingleSelect'

export class SingleSelectFieldMapper {
  static toEntity = (config: ISingleSelectField): SingleSelectField => {
    return new SingleSelectField(config)
  }

  static toManyEntities = (configs: ISingleSelectField[]): SingleSelectField[] => {
    return configs.map((config) => this.toEntity(config))
  }
}
