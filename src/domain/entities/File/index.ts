import type { RecordFieldAttachment } from '../Record'

export interface FileProperties {
  name: string
  data: Buffer
}

export interface FileToSave {
  id: string
  name: string
  mime_type: string
  data: Buffer
  created_at: Date
}

export class File {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly mime_type: string,
    readonly data: Buffer,
    readonly url: string,
    readonly created_at: Date
  ) {}

  toAttachment = (): RecordFieldAttachment => {
    return {
      id: this.id,
      name: this.name,
      mime_type: this.mime_type,
      url: this.url,
      created_at: this.created_at.toISOString(),
    }
  }
}
