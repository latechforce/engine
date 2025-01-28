import type { IBaseField } from '/domain/interfaces/IField/base'

export type { IBaseField }

export class BaseField implements IBaseField {
  name: string
  required?: boolean
  onMigration?: {
    replace?: string
  }

  constructor(config: IBaseField) {
    this.name = config.name
    this.required = config.required
    this.onMigration = config.onMigration
  }

  get config(): IBaseField {
    return {
      name: this.name,
      required: this.required,
      onMigration: this.onMigration,
    }
  }
}
