import type { IUrlField } from '/domain/interfaces/IField/IUrl'
import { BaseField, type IBaseField } from './base'

export class UrlField extends BaseField {
  constructor(config: IBaseField) {
    super(config)
  }

  get config(): IUrlField {
    return {
      ...super.config,
      type: 'Url',
    }
  }
}
