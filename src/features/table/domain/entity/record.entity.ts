import type { Fields } from '../object-value/fields.object-value'

export class Record {
  constructor(
    public readonly fields: Fields,
    public readonly id: string = crypto.randomUUID(),
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}
}
