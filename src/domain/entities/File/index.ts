import type { RecordFieldAttachment } from '../Record'

export interface FileProperties {
  name: string
  data: Buffer
}

export interface FileToSave {
  id: string
  name: string
  data: Buffer
  created_at: Date
}

export class File {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly data: Buffer,
    readonly url: string,
    readonly created_at: Date
  ) {}

  toAttachment = (): RecordFieldAttachment => {
    return {
      id: this.id,
      name: this.name,
      url: this.url,
      created_at: this.created_at.toISOString(),
    }
  }
}
