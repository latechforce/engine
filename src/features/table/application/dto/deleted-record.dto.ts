export type DeletedRecordDto = {
  id: string
  deleted: boolean
}

export type MultipleDeletedRecordDto = {
  records: {
    id: string
    deleted: boolean
  }[]
}
