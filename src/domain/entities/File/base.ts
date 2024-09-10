export interface FileFields {
  id: string
  name: string
  data: Buffer
  created_at: Date
}

export interface FileJson extends Omit<FileFields, 'data' | 'created_at'> {
  data: string
  created_at: string
}

export class Base {
  constructor(readonly fields: FileFields) {}

  get id(): string {
    return this.fields.id
  }

  get name(): string {
    return this.fields.name
  }

  get data(): Buffer {
    return this.fields.data
  }

  toJson(): FileJson {
    const { data, created_at, ...res } = this.fields
    return {
      ...res,
      data: data.toString(),
      created_at: created_at.toISOString(),
    }
  }
}