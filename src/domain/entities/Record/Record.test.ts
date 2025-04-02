import { describe, test, expect } from 'bun:test'
import { Record } from './Record'
import type { RecordFieldAttachment, RecordFields } from './RecordTypes'

describe('Record', () => {
  const testId = 'test-id-123'
  const testCreatedAt = new Date('2023-01-01T12:00:00Z')
  const testUpdatedAt = new Date('2023-01-02T12:00:00Z')

  test('constructor initializes a Record with the provided values', () => {
    const fields = { name: 'Test Record', value: 42 }
    const record = new Record(testId, fields, testCreatedAt, testUpdatedAt)

    expect(record.id).toBe(testId)
    expect(record.fields).toEqual(fields)
    expect(record.created_at).toEqual(testCreatedAt)
    expect(record.updated_at).toEqual(testUpdatedAt)
  })

  test('toJson returns the correct JSON representation', () => {
    const fields = { name: 'Test Record', value: 42 }
    const record = new Record(testId, fields, testCreatedAt, testUpdatedAt)
    const json = record.toJson()

    expect(json).toEqual({
      id: testId,
      fields,
      created_at: testCreatedAt,
      updated_at: testUpdatedAt,
    })
  })

  test('getFieldAsString returns string values correctly', () => {
    const fields = {
      stringField: 'string value',
      numberField: 42,
      booleanField: true,
      dateField: new Date('2023-01-01'),
      nullField: null,
      undefinedField: undefined,
    }
    const record = new Record(testId, fields, testCreatedAt)

    expect(record.getFieldAsString('stringField')).toBe('string value')
    expect(record.getFieldAsString('numberField')).toBe('42')
    expect(record.getFieldAsString('booleanField')).toBe('true')
    expect(record.getFieldAsString('dateField')).toBe(new Date('2023-01-01').toString())
    expect(record.getFieldAsString('nullField')).toBeNull()
    expect(record.getFieldAsString('undefinedField')).toBeNull()
    expect(record.getFieldAsString('nonExistentField')).toBeNull()
  })

  test('getFieldAsDate returns Date values correctly', () => {
    const testDate = new Date('2023-01-01T12:00:00Z')
    const fields = {
      dateField: testDate,
      stringDateField: '2023-01-01T12:00:00Z',
      numberField: 42,
      booleanField: true,
      nullField: null,
      undefinedField: undefined,
    }
    const record = new Record(testId, fields, testCreatedAt)

    expect(record.getFieldAsDate('dateField')).toEqual(testDate)
    expect(record.getFieldAsDate('stringDateField')).toEqual(new Date('2023-01-01T12:00:00Z'))
    expect(record.getFieldAsDate('numberField')).toEqual(new Date('42'))
    expect(record.getFieldAsDate('booleanField')).toBeNull()
    expect(record.getFieldAsDate('nullField')).toBeNull()
    expect(record.getFieldAsDate('undefinedField')).toBeNull()
    expect(record.getFieldAsDate('nonExistentField')).toBeNull()
  })

  test('getFieldAsNumber returns number values correctly', () => {
    const fields = {
      numberField: 42,
      stringNumberField: '123.45',
      booleanField: true,
      dateField: new Date('2023-01-01'),
      nullField: null,
      undefinedField: undefined,
    }
    const record = new Record(testId, fields, testCreatedAt)

    expect(record.getFieldAsNumber('numberField')).toBe(42)
    expect(record.getFieldAsNumber('stringNumberField')).toBe(123.45)
    expect(record.getFieldAsNumber('booleanField')).toBeNull()
    expect(record.getFieldAsNumber('dateField')).toBeNaN()
    expect(record.getFieldAsNumber('nullField')).toBeNull()
    expect(record.getFieldAsNumber('undefinedField')).toBeNull()
    expect(record.getFieldAsNumber('nonExistentField')).toBeNull()
  })

  test('getFieldAsBoolean returns boolean values correctly', () => {
    const fields = {
      booleanField: true,
      falseField: false,
      stringField: 'true',
      numberField: 1,
      zeroField: 0,
      nullField: null,
      undefinedField: undefined,
    }
    const record = new Record(testId, fields, testCreatedAt)

    expect(record.getFieldAsBoolean('booleanField')).toBe(true)
    expect(record.getFieldAsBoolean('falseField')).toBe(false)
    expect(record.getFieldAsBoolean('stringField')).toBe(true)
    expect(record.getFieldAsBoolean('numberField')).toBe(true)
    expect(record.getFieldAsBoolean('zeroField')).toBe(false)
    expect(record.getFieldAsBoolean('nullField')).toBeNull()
    expect(record.getFieldAsBoolean('undefinedField')).toBeNull()
    expect(record.getFieldAsBoolean('nonExistentField')).toBeNull()
  })

  test('getFieldAsAttachments returns attachment arrays correctly', () => {
    const validAttachments: RecordFieldAttachment[] = [
      {
        id: 'attachment-1',
        url: 'https://example.com/file1.pdf',
        name: 'File 1',
        created_at: '2023-01-01T00:00:00Z',
      },
      {
        id: 'attachment-2',
        url: 'https://example.com/file2.pdf',
        name: 'File 2',
        created_at: '2023-01-02T00:00:00Z',
      },
    ]

    // Create a valid RecordFields object with the invalid attachments as a string array
    const fields: RecordFields = {
      validAttachments,
      invalidAttachments: ['invalid1', 'invalid2'], // Using string[] as a valid RecordFieldValue
      stringField: 'not an attachment',
      numberField: 42,
      booleanField: true,
      nullField: null,
      undefinedField: undefined,
    }

    const record = new Record(testId, fields, testCreatedAt)

    expect(record.getFieldAsAttachments('validAttachments')).toEqual(validAttachments)
    expect(record.getFieldAsAttachments('invalidAttachments')).toEqual([])
    expect(record.getFieldAsAttachments('stringField')).toEqual([])
    expect(record.getFieldAsAttachments('numberField')).toEqual([])
    expect(record.getFieldAsAttachments('booleanField')).toEqual([])
    expect(record.getFieldAsAttachments('nullField')).toEqual([])
    expect(record.getFieldAsAttachments('undefinedField')).toEqual([])
    expect(record.getFieldAsAttachments('nonExistentField')).toEqual([])
  })
})
