import { CheckboxField } from '@domain/entities/Field/Checkbox'
import type { ICheckboxField } from '@domain/interfaces/IField/ICheckbox'

export class CheckboxFieldMapper {
  static toEntity = (config: ICheckboxField): CheckboxField => {
    return new CheckboxField(config)
  }

  static toManyEntities = (configs: ICheckboxField[]): CheckboxField[] => {
    return configs.map((config) => this.toEntity(config))
  }
}
