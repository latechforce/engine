export class Name {
  constructor(private readonly value: string) {
    if (typeof value !== 'string') {
      throw new Error('Name must be a string')
    }
    const trimmed = value.trim()
    if (trimmed.length < 1) {
      throw new Error('Name cannot be empty')
    }
    if (trimmed.length < 3) {
      throw new Error('Name must be at least 3 characters')
    }
    if (trimmed.length > 100) {
      throw new Error('Name must be at most 100 characters')
    }
    this.value = trimmed
  }

  getValue(): string {
    return this.value
  }

  toString(): string {
    return this.value
  }

  equals(other: Name): boolean {
    return this.value === other.value
  }
}
