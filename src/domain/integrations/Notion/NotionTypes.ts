export type ConvertToNotionTablePageProperties<T> = {
  [K in keyof T]: NotionTablePagePropertyValue
}

export type NotionTablePageProperties = Record<string, NotionTablePagePropertyValue>

export type NotionTablePagePropertyFile = { name: string; url: string }

export type NotionTablePagePropertyValue =
  | string
  | number
  | boolean
  | Date
  | NotionTablePagePropertyValue[]
  | NotionTablePagePropertyFile[]
  | null
  | undefined

export type NotionTablePageJson = {
  id: string
  properties: NotionTablePageProperties
  createdTime: Date
  lastEditedTime: Date
  archived: boolean
}

export type NotionTableAction = 'INSERT'

export type UpdateNotionTablePageProperties<T extends NotionTablePageProperties> = {
  id: string
  page: Partial<T>
}
