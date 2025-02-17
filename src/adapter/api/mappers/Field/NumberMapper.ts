import { NumberField } from '/domain/entities/Field/Number'
import type { INumberField } from '/domain/interfaces/IField/INumber'

export class NumberFieldMapper {
  static toEntity = (config: INumberField): NumberField => {
    return new NumberField(config)
  }
}
