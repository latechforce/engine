export interface IBaseField {
  name: string
  required?: boolean
  onMigration?: {
    replace?: string
  }
}
