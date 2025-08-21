export class Email {
  private static readonly EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  constructor(private readonly value: string) {
    if (typeof value !== 'string') {
      throw new Error('Email must be a string')
    }
    const trimmed = value.trim().toLowerCase()
    if (!Email.EMAIL_REGEX.test(trimmed)) {
      throw new Error('Invalid email format')
    }
    this.value = trimmed
  }

  getValue(): string {
    return this.value
  }

  toString(): string {
    return this.value
  }

  equals(other: Email): boolean {
    return this.value === other.value
  }

  getDomain(): string {
    return this.value.split('@')[1]!
  }

  getLocalPart(): string {
    return this.value.split('@')[0]!
  }
}
