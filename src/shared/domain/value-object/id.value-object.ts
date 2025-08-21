export class Id {
  constructor(private readonly value: number) {
    if (!Number.isInteger(value)) {
      throw new Error('Id must be an integer')
    }
    if (value <= 0) {
      throw new Error('Id must be positive')
    }
  }

  getValue(): number {
    return this.value
  }

  toString(): string {
    return this.value.toString()
  }

  equals(other: Id): boolean {
    return this.value === other.value
  }
}
