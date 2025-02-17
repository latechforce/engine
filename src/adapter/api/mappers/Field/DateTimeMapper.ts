import type { IDateTimeField } from '/domain/interfaces/IField/IDateTime'
import { DateTimeField } from '/domain/entities/Field/DateTime'

export class DateTimeFieldMapper {
  static toEntity = (config: IDateTimeField): DateTimeField => {
    return new DateTimeField(config)
  }
}
