export type DeleteMultipleRecordsDto = {
  records: {
    id: string
    deleted: boolean
  }[]
}
