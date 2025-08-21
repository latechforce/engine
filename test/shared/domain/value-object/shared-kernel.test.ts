import { describe, it, expect } from 'bun:test'
import { Id, Name, Email, Url } from '../../../../src/shared/domain/value-object'

describe('Shared Kernel Value Objects', () => {
  describe('Id', () => {
    it('should create valid Id', () => {
      const id = new Id(123)
      expect(id.getValue()).toBe(123)
      expect(id.toString()).toBe('123')
    })

    it('should throw error for non-positive values', () => {
      expect(() => new Id(0)).toThrow('Id must be positive')
      expect(() => new Id(-1)).toThrow('Id must be positive')
    })

    it('should throw error for non-integer values', () => {
      expect(() => new Id(1.5)).toThrow('Id must be an integer')
    })

    it('should check equality correctly', () => {
      const id1 = new Id(123)
      const id2 = new Id(123)
      const id3 = new Id(456)

      expect(id1.equals(id2)).toBe(true)
      expect(id1.equals(id3)).toBe(false)
    })
  })

  describe('Name', () => {
    it('should create valid Name', () => {
      const name = new Name('Test Name')
      expect(name.getValue()).toBe('Test Name')
      expect(name.toString()).toBe('Test Name')
    })

    it('should trim whitespace', () => {
      const name = new Name('  Test Name  ')
      expect(name.getValue()).toBe('Test Name')
    })

    it('should throw error for short names', () => {
      expect(() => new Name('AB')).toThrow('Name must be at least 3 characters')
    })

    it('should throw error for empty names', () => {
      expect(() => new Name('')).toThrow('Name cannot be empty')
      expect(() => new Name('   ')).toThrow('Name cannot be empty')
    })

    it('should throw error for long names', () => {
      const longName = 'A'.repeat(101)
      expect(() => new Name(longName)).toThrow('Name must be at most 100 characters')
    })

    it('should check equality correctly', () => {
      const name1 = new Name('Test')
      const name2 = new Name('Test')
      const name3 = new Name('Other')

      expect(name1.equals(name2)).toBe(true)
      expect(name1.equals(name3)).toBe(false)
    })
  })

  describe('Email', () => {
    it('should create valid Email', () => {
      const email = new Email('test@example.com')
      expect(email.getValue()).toBe('test@example.com')
      expect(email.toString()).toBe('test@example.com')
    })

    it('should normalize email to lowercase', () => {
      const email = new Email('TEST@EXAMPLE.COM')
      expect(email.getValue()).toBe('test@example.com')
    })

    it('should extract domain and local part', () => {
      const email = new Email('user@domain.com')
      expect(email.getDomain()).toBe('domain.com')
      expect(email.getLocalPart()).toBe('user')
    })

    it('should throw error for invalid email format', () => {
      expect(() => new Email('invalid')).toThrow('Invalid email format')
      expect(() => new Email('invalid@')).toThrow('Invalid email format')
      expect(() => new Email('@invalid.com')).toThrow('Invalid email format')
    })

    it('should check equality correctly', () => {
      const email1 = new Email('test@example.com')
      const email2 = new Email('TEST@EXAMPLE.COM')
      const email3 = new Email('other@example.com')

      expect(email1.equals(email2)).toBe(true)
      expect(email1.equals(email3)).toBe(false)
    })
  })

  describe('Url', () => {
    it('should create valid Url', () => {
      const url = new Url('https://example.com')
      expect(url.getValue()).toBe('https://example.com')
      expect(url.toString()).toBe('https://example.com')
    })

    it('should extract URL components', () => {
      const url = new Url('https://api.example.com/v1/users')
      expect(url.getHost()).toBe('api.example.com')
      expect(url.getProtocol()).toBe('https:')
      expect(url.getPath()).toBe('/v1/users')
      expect(url.isHttps()).toBe(true)
    })

    it('should handle HTTP URLs', () => {
      const url = new Url('http://example.com')
      expect(url.getProtocol()).toBe('http:')
      expect(url.isHttps()).toBe(false)
    })

    it('should throw error for invalid URL format', () => {
      expect(() => new Url('invalid')).toThrow('Invalid URL format')
      expect(() => new Url('not-a-url')).toThrow('Invalid URL format')
    })

    it('should check equality correctly', () => {
      const url1 = new Url('https://example.com')
      const url2 = new Url('https://example.com')
      const url3 = new Url('https://other.com')

      expect(url1.equals(url2)).toBe(true)
      expect(url1.equals(url3)).toBe(false)
    })
  })
})
