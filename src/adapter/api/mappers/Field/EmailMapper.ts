import { EmailField } from '/domain/entities/Field/Email'
import type { IEmailField } from '/domain/interfaces/IField/IEmail'

export class EmailFieldMapper {
  static toEntity = (config: IEmailField): EmailField => {
    return new EmailField(config)
  }
}
