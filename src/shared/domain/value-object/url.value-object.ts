export class Url {
  constructor(private readonly value: string) {
    if (typeof value !== 'string') {
      throw new Error('URL must be a string')
    }
    const trimmed = value.trim()
    try {
      new URL(trimmed)
    } catch {
      throw new Error('Invalid URL format')
    }
    this.value = trimmed
  }

  getValue(): string {
    return this.value
  }

  toString(): string {
    return this.value
  }

  equals(other: Url): boolean {
    return this.value === other.value
  }

  getHost(): string {
    return new URL(this.value).hostname
  }

  getProtocol(): string {
    return new URL(this.value).protocol
  }

  getPath(): string {
    return new URL(this.value).pathname
  }

  isHttps(): boolean {
    return this.getProtocol() === 'https:'
  }
}
