import { SingleLineTextField } from '/domain/entities/Field/SingleLineText'
import type { ISingleLineTextField } from '/domain/interfaces/IField/ISingleLineText'

export class SingleLineTextFieldMapper {
  static toEntity = (config: ISingleLineTextField): SingleLineTextField => {
    return new SingleLineTextField(config)
  }
}
