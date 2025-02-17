import { beforeEach, it, describe, expect } from 'bun:test'
import { AirtableTableRecord, type AirtableTableRecordFieldFile } from './AirtableTableRecord'

type MockProperties = {
  singleLineText: string | null
  longText: string | null
  checkbox: boolean | null
  createdBy: string | null
  createdTime: string | null
  date: string | null
  email: string | null
  files: AirtableTableRecordFieldFile[]
  number: number | null
  multiSelect: string[]
  people: string[]
  phone: string | null
  relations: string[]
  stringFormula: string | null
  numberFormula: number | null
  booleanFormula: boolean | null
  dateFormula: string | null
  lastEditedBy: string | null
  lastEditedTime: string | null
  stringArrayRollup: string[]
  numberArrayRollup: number[]
  booleanArrayRollup: boolean[]
  numberRollup: number | null
  dateRollup: string | null
  status: string | null
  url: string | null
}

let airtableTableRecord: AirtableTableRecord<MockProperties>

beforeEach(() => {
  const mockProperties: MockProperties = {
    singleLineText: 'Test Title',
    longText: 'Test Description',
    checkbox: true,
    createdBy: 'Creator',
    createdTime: '2023-01-01T00:00:00Z',
    email: 'test@example.com',
    date: '2023-02-01T00:00:00Z',
    files: [
      { name: 'file1', url: 'https://example.com/file1' },
      { name: 'file2', url: 'https://example.com/file2' },
    ],
    number: 42,
    multiSelect: ['option1', 'option2'],
    people: ['Person A', 'Person B'],
    phone: '123-456-7890',
    relations: ['relation1', 'relation2'],
    stringFormula: 'Formula String',
    numberFormula: 100,
    booleanFormula: false,
    dateFormula: '2023-02-01T00:00:00Z',
    lastEditedBy: 'Editor',
    lastEditedTime: '2023-01-03T00:00:00Z',
    stringArrayRollup: ['string1', 'string2', 'string3'],
    numberArrayRollup: [1, 2, 3],
    booleanArrayRollup: [true, false, true],
    numberRollup: 1,
    dateRollup: '2023-02-01T00:00:00Z',
    status: 'In Progress',
    url: 'https://example.com',
  }

  airtableTableRecord = new AirtableTableRecord<MockProperties>(
    'pageid',
    mockProperties,
    '2023-01-01T00:00:00Z'
  )
})

describe('id', () => {
  it('should return id without -', () => {
    const id = airtableTableRecord.id
    expect(id).toBe('pageid')
  })
})

describe('getSingleLineText', () => {
  it('should return single line text as a string', () => {
    const singleLineText = airtableTableRecord.getSingleLineText('singleLineText')
    expect(singleLineText).toBe('Test Title')
  })

  it('should return null if single line text is null', () => {
    airtableTableRecord.fields.singleLineText = null
    const singleLineText = airtableTableRecord.getSingleLineText('singleLineText')
    expect(singleLineText).toBeNull()
  })
})

describe('getSingleLineTextOrThrow', () => {
  it('should return single line text as a string', () => {
    const singleLineText = airtableTableRecord.getSingleLineTextOrThrow('singleLineText')
    expect(singleLineText).toBe('Test Title')
  })

  it('should throw an error if single line text is null', () => {
    airtableTableRecord.fields.singleLineText = null
    expect(() => airtableTableRecord.getSingleLineTextOrThrow('singleLineText')).toThrowError(
      'Field "singleLineText" should not be null'
    )
  })
})

describe('getLongText', () => {
  it('should return long text as a string', () => {
    const longText = airtableTableRecord.getLongText('longText')
    expect(longText).toBe('Test Description')
  })

  it('should return null if long text is null', () => {
    airtableTableRecord.fields.longText = null
    const longText = airtableTableRecord.getLongText('longText')
    expect(longText).toBeNull()
  })
})

describe('getCheckbox', () => {
  it('should return checkbox as a boolean', () => {
    const checkbox = airtableTableRecord.getCheckbox('checkbox')
    expect(checkbox).toBe(true)
  })

  it('should return null if checkbox is null', () => {
    airtableTableRecord.fields.checkbox = false
    const checkbox = airtableTableRecord.getCheckbox('checkbox')
    expect(checkbox).toBe(false)
  })
})

describe('getCheckboxOrThrow', () => {
  it('should return checkbox as a boolean', () => {
    const checkbox = airtableTableRecord.getCheckboxOrThrow('checkbox')
    expect(checkbox).toBe(true)
  })

  it('should throw an error if checkbox is null', () => {
    airtableTableRecord.fields.checkbox = null
    expect(() => airtableTableRecord.getCheckboxOrThrow('checkbox')).toThrowError(
      'Field "checkbox" should not be null'
    )
  })
})

describe('getCheckboxOrThrow', () => {
  it('should return checkbox as a boolean', () => {
    const checkbox = airtableTableRecord.getCheckboxOrThrow('checkbox')
    expect(checkbox).toBe(true)
  })

  it('should throw an error if checkbox is null', () => {
    airtableTableRecord.fields.checkbox = null
    expect(() => airtableTableRecord.getCheckboxOrThrow('checkbox')).toThrowError(
      'Field "checkbox" should not be null'
    )
  })
})

describe('getCreatedByOrThrow', () => {
  it('should return createdBy as a string and not null', () => {
    const createdBy = airtableTableRecord.getCreatedByOrThrow('createdBy')
    expect(createdBy).toBe('Creator')
  })

  it('should throw an error if createdBy is null', () => {
    airtableTableRecord.fields.createdBy = null
    expect(() => airtableTableRecord.getCreatedByOrThrow('createdBy')).toThrowError(
      'Field "createdBy" should not be null'
    )
  })
})

describe('getCreatedTimeOrThrow', () => {
  it('should return created time as a Date object and not null', () => {
    const createdTime = airtableTableRecord.getCreatedTimeOrThrow('createdTime')
    expect(createdTime).toEqual(new Date('2023-01-01T00:00:00Z'))
  })

  it('should throw an error if createdTime is missing', () => {
    airtableTableRecord.fields.createdTime = null
    expect(() => airtableTableRecord.getCreatedTimeOrThrow('createdTime')).toThrowError(
      'Field "createdTime" should not be null'
    )
  })
})

describe('getEmail', () => {
  it('should return email as a string', () => {
    const email = airtableTableRecord.getEmail('email')
    expect(email).toBe('test@example.com')
  })

  it('should return null if email is null', () => {
    airtableTableRecord.fields.email = null
    const email = airtableTableRecord.getEmail('email')
    expect(email).toBeNull()
  })
})

describe('getEmailOrThrow', () => {
  it('should return email as a string', () => {
    const email = airtableTableRecord.getEmailOrThrow('email')
    expect(email).toBe('test@example.com')
  })

  it('should throw an error if email is null', () => {
    airtableTableRecord.fields.email = null
    expect(() => airtableTableRecord.getEmailOrThrow('email')).toThrowError(
      'Field "email" should not be null'
    )
  })
})

describe('getDate', () => {
  it('should return date as a Date object', () => {
    const date = airtableTableRecord.getDate('date')
    expect(date).toEqual(new Date('2023-02-01T00:00:00Z'))
  })

  it('should return null if date is null', () => {
    airtableTableRecord.fields.date = null
    const date = airtableTableRecord.getDate('date')
    expect(date).toBeNull()
  })
})

describe('getDateOrThrow', () => {
  it('should return date as a Date object', () => {
    const date = airtableTableRecord.getDateOrThrow('date')
    expect(date).toEqual(new Date('2023-02-01T00:00:00Z'))
  })

  it('should throw an error if date is null', () => {
    airtableTableRecord.fields.date = null
    expect(() => airtableTableRecord.getDateOrThrow('date')).toThrowError(
      'Field "date" should not be null'
    )
  })
})

describe('getFiles', () => {
  it('should return files as an array of objects', () => {
    const files = airtableTableRecord.getFiles('files')
    expect(files).toEqual([
      { name: 'file1', url: 'https://example.com/file1' },
      { name: 'file2', url: 'https://example.com/file2' },
    ])
  })
})

describe('getStringFormula', () => {
  it('should return string formula as a string', () => {
    const formula = airtableTableRecord.getStringFormula('stringFormula')
    expect(formula).toBe('Formula String')
  })

  it('should return null if string formula is null', () => {
    airtableTableRecord.fields.stringFormula = null
    const formula = airtableTableRecord.getStringFormula('stringFormula')
    expect(formula).toBeNull()
  })
})

describe('getStringFormulaOrThrow', () => {
  it('should return string formula as a string', () => {
    const formula = airtableTableRecord.getStringFormulaOrThrow('stringFormula')
    expect(formula).toBe('Formula String')
  })

  it('should throw an error if string formula is null', () => {
    airtableTableRecord.fields.stringFormula = null
    expect(() => airtableTableRecord.getStringFormulaOrThrow('stringFormula')).toThrowError(
      'Field "stringFormula" should not be null'
    )
  })
})

describe('getNumberFormula', () => {
  it('should return number formula as a number', () => {
    const formula = airtableTableRecord.getNumberFormula('numberFormula')
    expect(formula).toBe(100)
  })

  it('should return null if number formula is null', () => {
    airtableTableRecord.fields.numberFormula = null
    const formula = airtableTableRecord.getNumberFormula('numberFormula')
    expect(formula).toBeNull()
  })
})

describe('getNumberFormulaOrThrow', () => {
  it('should return number formula as a number', () => {
    const formula = airtableTableRecord.getNumberFormulaOrThrow('numberFormula')
    expect(formula).toBe(100)
  })

  it('should throw an error if number formula is null', () => {
    airtableTableRecord.fields.numberFormula = null
    expect(() => airtableTableRecord.getNumberFormulaOrThrow('numberFormula')).toThrowError(
      'Field "numberFormula" should not be null'
    )
  })
})

describe('getBooleanFormula', () => {
  it('should return boolean formula as a boolean', () => {
    const formula = airtableTableRecord.getBooleanFormula('booleanFormula')
    expect(formula).toBe(false)
  })

  it('should return null if boolean formula is null', () => {
    airtableTableRecord.fields.booleanFormula = null
    const formula = airtableTableRecord.getBooleanFormula('booleanFormula')
    expect(formula).toBeNull()
  })
})

describe('getBooleanFormulaOrThrow', () => {
  it('should return boolean formula as a boolean', () => {
    const formula = airtableTableRecord.getBooleanFormulaOrThrow('booleanFormula')
    expect(formula).toBe(false)
  })

  it('should throw an error if boolean formula is null', () => {
    airtableTableRecord.fields.booleanFormula = null
    expect(() => airtableTableRecord.getBooleanFormulaOrThrow('booleanFormula')).toThrowError(
      'Field "booleanFormula" should not be null'
    )
  })
})

describe('getDateFormula', () => {
  it('should return date formula as a Date object', () => {
    const formula = airtableTableRecord.getDateFormula('dateFormula')
    expect(formula).toEqual('2023-02-01T00:00:00Z')
  })

  it('should return null if date formula is null', () => {
    airtableTableRecord.fields.dateFormula = null
    const formula = airtableTableRecord.getDateFormula('dateFormula')
    expect(formula).toBeNull()
  })
})

describe('getDateFormulaOrThrow', () => {
  it('should return date formula as a Date object', () => {
    const formula = airtableTableRecord.getDateFormulaOrThrow('dateFormula')
    expect(formula).toEqual(new Date('2023-02-01T00:00:00Z'))
  })

  it('should throw an error if date formula is null', () => {
    airtableTableRecord.fields.dateFormula = null
    expect(() => airtableTableRecord.getDateFormulaOrThrow('dateFormula')).toThrowError(
      'Field "dateFormula" should not be null'
    )
  })
})

describe('getLastEditedBy', () => {
  it('should return last edited by as a string and not null', () => {
    const lastEditedBy = airtableTableRecord.getLastEditedBy('lastEditedBy')
    expect(lastEditedBy).toBe('Editor')
  })

  it('should return null if lastEditedBy is null', () => {
    airtableTableRecord.fields.lastEditedBy = null
    const lastEditedBy = airtableTableRecord.getLastEditedBy('lastEditedBy')
    expect(lastEditedBy).toBeNull()
  })
})

describe('getLastEditedByOrThrow', () => {
  it('should return last edited by as a string and not null', () => {
    const lastEditedBy = airtableTableRecord.getLastEditedByOrThrow('lastEditedBy')
    expect(lastEditedBy).toBe('Editor')
  })

  it('should throw an error if lastEditedBy is null', () => {
    airtableTableRecord.fields.lastEditedBy = null
    expect(() => airtableTableRecord.getLastEditedByOrThrow('lastEditedBy')).toThrowError(
      'Field "lastEditedBy" should not be null'
    )
  })
})

describe('getLastEditedTime', () => {
  it('should return last edited time as a Date object and not null', () => {
    const lastEditedTime = airtableTableRecord.getLastEditedTime('lastEditedTime')
    expect(lastEditedTime).toEqual(new Date('2023-01-03T00:00:00Z'))
  })

  it('should return null if lastEditedTime is null', () => {
    airtableTableRecord.fields.lastEditedTime = null
    const lastEditedTime = airtableTableRecord.getLastEditedTime('lastEditedTime')
    expect(lastEditedTime).toBeNull()
  })
})

describe('getLastEditedTimeOrThrow', () => {
  it('should return last edited time as a Date object and not null', () => {
    const lastEditedTime = airtableTableRecord.getLastEditedTimeOrThrow('lastEditedTime')
    expect(lastEditedTime).toEqual(new Date('2023-01-03T00:00:00Z'))
  })

  it('should throw an error if lastEditedTime is null', () => {
    airtableTableRecord.fields.lastEditedTime = null
    expect(() => airtableTableRecord.getLastEditedTimeOrThrow('lastEditedTime')).toThrowError(
      'Field "lastEditedTime" should not be null'
    )
  })
})

describe('getMultiSelect', () => {
  it('should return multi-select as an array of strings', () => {
    const multiSelect = airtableTableRecord.getMultiSelect('multiSelect')
    expect(multiSelect).toEqual(['option1', 'option2'])
  })
})

describe('getNumber', () => {
  it('should return number as a number', () => {
    const number = airtableTableRecord.getNumber('number')
    expect(number).toBe(42)
  })

  it('should return null if number is null', () => {
    airtableTableRecord.fields.number = null
    const number = airtableTableRecord.getNumber('number')
    expect(number).toBeNull()
  })
})

describe('getNumberOrThrow', () => {
  it('should return number as a number', () => {
    const number = airtableTableRecord.getNumberOrThrow('number')
    expect(number).toBe(42)
  })

  it('should throw an error if number is null', () => {
    airtableTableRecord.fields.number = null
    expect(() => airtableTableRecord.getNumberOrThrow('number')).toThrowError(
      'Field "number" should not be null'
    )
  })
})

describe('getPeople', () => {
  it('should return people as an array of strings', () => {
    const people = airtableTableRecord.getPeople('people')
    expect(people).toEqual(['Person A', 'Person B'])
  })
})

describe('getPhone', () => {
  it('should return phone as a string', () => {
    const phone = airtableTableRecord.getPhone('phone')
    expect(phone).toBe('123-456-7890')
  })

  it('should return null if phone is null', () => {
    airtableTableRecord.fields.phone = null
    const phone = airtableTableRecord.getPhone('phone')
    expect(phone).toBeNull()
  })
})

describe('getPhoneOrThrow', () => {
  it('should return phone as a string', () => {
    const phone = airtableTableRecord.getPhoneOrThrow('phone')
    expect(phone).toBe('123-456-7890')
  })

  it('should throw an error if phone is null', () => {
    airtableTableRecord.fields.phone = null
    expect(() => airtableTableRecord.getPhoneOrThrow('phone')).toThrowError(
      'Field "phone" should not be null'
    )
  })
})

describe('getRelations', () => {
  it('should return relations as an array of strings', () => {
    const relations = airtableTableRecord.getRelations('relations')
    expect(relations).toEqual(['relation1', 'relation2'])
  })
})

describe('getSingleRelation', () => {
  it('should return the first relation as a string', () => {
    const singleRelation = airtableTableRecord.getSingleRelation('relations')
    expect(singleRelation).toBe('relation1')
  })

  it('should return null if there are no relations', () => {
    airtableTableRecord.fields.relations = []
    const singleRelation = airtableTableRecord.getSingleRelation('relations')
    expect(singleRelation).toBeNull()
  })
})

describe('getNumberArrayRollup', () => {
  it('should return number array rollup as an array of numbers', () => {
    const rollup = airtableTableRecord.getNumberArrayRollup('numberArrayRollup')
    expect(rollup).toEqual([1, 2, 3])
  })
})

describe('getBooleanArrayRollup', () => {
  it('should return boolean array rollup as an array of booleans', () => {
    const rollup = airtableTableRecord.getBooleanArrayRollup('booleanArrayRollup')
    expect(rollup).toEqual([true, false, true])
  })
})

describe('getSingleStringRollup', () => {
  it('should return the first string rollup as a string', () => {
    const singleStringRollup = airtableTableRecord.getSingleStringRollup('stringArrayRollup')
    expect(singleStringRollup).toBe('string1')
  })

  it('should return null if there are no string rollups', () => {
    airtableTableRecord.fields.stringArrayRollup = []
    const singleStringRollup = airtableTableRecord.getSingleStringRollup('stringArrayRollup')
    expect(singleStringRollup).toBeNull()
  })
})

describe('getSingleStringRollupOrThrow', () => {
  it('should return the first string rollup as a string', () => {
    const singleStringRollup = airtableTableRecord.getSingleStringRollupOrThrow('stringArrayRollup')
    expect(singleStringRollup).toBe('string1')
  })

  it('should throw an error if there are no string rollups', () => {
    airtableTableRecord.fields.stringArrayRollup = []
    expect(() =>
      airtableTableRecord.getSingleStringRollupOrThrow('stringArrayRollup')
    ).toThrowError('Field "stringArrayRollup" should not be null')
  })
})

describe('getDateRollup', () => {
  it('should return the first date rollup as a Date object', () => {
    const dateRollup = airtableTableRecord.getDateRollup('dateRollup')
    expect(dateRollup).toEqual('2023-02-01T00:00:00Z')
  })

  it('should return null if there is no date rollup', () => {
    airtableTableRecord.fields.dateRollup = null
    const dateRollup = airtableTableRecord.getDateRollup('dateRollup')
    expect(dateRollup).toBeNull()
  })
})

describe('getDateRollupOrThrow', () => {
  it('should return the first date rollup as a Date object', () => {
    const dateRollup = airtableTableRecord.getDateRollupOrThrow('dateRollup')
    expect(dateRollup).toEqual(new Date('2023-02-01T00:00:00Z'))
  })

  it('should throw an error if there is no date rollup', () => {
    airtableTableRecord.fields.dateRollup = null
    expect(() => airtableTableRecord.getDateRollupOrThrow('dateRollup')).toThrowError(
      'Field "dateRollup" should not be null'
    )
  })
})

describe('getNumberRollup', () => {
  it('should return the first number rollup as a number', () => {
    const numberRollup = airtableTableRecord.getNumberRollup('numberRollup')
    expect(numberRollup).toBe(1)
  })

  it('should return null if there are no number rollups', () => {
    airtableTableRecord.fields.numberRollup = null
    const numberRollup = airtableTableRecord.getNumberRollup('numberRollup')
    expect(numberRollup).toBeNull()
  })
})

describe('getNumberRollupOrThrow', () => {
  it('should return the first number rollup as a number', () => {
    const numberRollup = airtableTableRecord.getNumberRollupOrThrow('numberRollup')
    expect(numberRollup).toBe(1)
  })

  it('should throw an error if there are no number rollups', () => {
    airtableTableRecord.fields.numberRollup = null
    expect(() => airtableTableRecord.getNumberRollupOrThrow('numberRollup')).toThrowError(
      'Field "numberRollup" should not be null'
    )
  })
})

describe('getUrl', () => {
  it('should return URL as a string', () => {
    const url = airtableTableRecord.getUrl('url')
    expect(url).toBe('https://example.com')
  })

  it('should return null if URL is null', () => {
    airtableTableRecord.fields.url = null
    const url = airtableTableRecord.getUrl('url')
    expect(url).toBeNull()
  })
})

describe('getUrlOrThrow', () => {
  it('should return URL as a string', () => {
    const url = airtableTableRecord.getUrlOrThrow('url')
    expect(url).toBe('https://example.com')
  })

  it('should throw an error if URL is null', () => {
    airtableTableRecord.fields.url = null
    expect(() => airtableTableRecord.getUrlOrThrow('url')).toThrowError(
      'Field "url" should not be null'
    )
  })
})
