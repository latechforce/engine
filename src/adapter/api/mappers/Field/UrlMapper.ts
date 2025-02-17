import { UrlField } from '/domain/entities/Field/Url'
import type { IUrlField } from '/domain/interfaces/IField/IUrl'

export class UrlFieldMapper {
  static toEntity = (config: IUrlField): UrlField => {
    return new UrlField(config)
  }
}
