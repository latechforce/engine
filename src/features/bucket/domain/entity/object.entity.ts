import crypto from 'crypto'

export class Object {
  constructor(
    public readonly key: string,
    public readonly bucketId: number,
    public readonly data: Uint8Array,
    public readonly contentType: string | null,
    public readonly size: number | null,
    public readonly id: string = crypto.randomUUID(),
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}
}
