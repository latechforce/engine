import { beforeEach, it, describe, expect } from 'bun:test'
import { AirtableTableRecord } from './AirtableTableRecord'

let airtableTableRecord: AirtableTableRecord

beforeEach(() => {
  const mockProperties = {
    title: 'Test Title',
    checkbox: true,
    createdBy: 'Creator',
    createdTime: new Date('2023-01-01T00:00:00Z'),
    email: 'test@example.com',
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
    dateFormula: new Date('2023-02-01T00:00:00Z'),
    lastEditedBy: 'Editor',
    lastEditedTime: new Date('2023-01-03T00:00:00Z'),
    stringArrayRollup: ['string1', 'string2', 'string3'],
    numberArrayRollup: [1, 2, 3],
    booleanArrayRollup: [true, false, true],
    numberRollup: 1,
    dateRollup: new Date('2023-02-01T00:00:00Z'),
    status: 'In Progress',
    url: 'https://example.com',
  }

  airtableTableRecord = new AirtableTableRecord(
    'pageid',
    mockProperties,
    new Date('2023-01-01T00:00:00Z')
  )
})

describe('id', () => {
  it('should return id without -', () => {
    const id = airtableTableRecord.id
    expect(id).toBe('pageid')
  })
})

describe('getTitle', () => {
  it('should return title as a string', () => {
    const title = airtableTableRecord.getTitle('title')
    expect(title).toBe('Test Title')
  })

  it('should throw an error for non-existing property', () => {
    expect(() => airtableTableRecord.getTitle('nonExisting')).toThrowError(
      'Field "nonExisting" does not exist'
    )
  })
})

describe('getCheckbox', () => {
  it('should return checkbox as a boolean', () => {
    const checkbox = airtableTableRecord.getCheckbox('checkbox')
    expect(checkbox).toBe(true)
  })
})

describe('getCreatedBy', () => {
  it('should return createdBy as a string and not null', () => {
    const createdBy = airtableTableRecord.getCreatedBy('createdBy')
    expect(createdBy).toBe('Creator')
  })

  it('should throw an error if createdBy is null', () => {
    airtableTableRecord.fields.createdBy = null
    expect(() => airtableTableRecord.getCreatedBy('createdBy')).toThrowError(
      'Field "createdBy" should not be null'
    )
  })
})

describe('getCreatedTime', () => {
  it('should return created time as a Date object and not null', () => {
    const createdTime = airtableTableRecord.getCreatedTime('createdTime')
    expect(createdTime).toEqual(new Date('2023-01-01T00:00:00Z'))
  })

  it('should throw an error if createdTime is missing', () => {
    airtableTableRecord.fields.createdTime = null
    expect(() => airtableTableRecord.getCreatedTime('createdTime')).toThrowError(
      'Field "createdTime" should not be null'
    )
  })
})

describe('getEmail', () => {
  it('should return email as a string', () => {
    const email = airtableTableRecord.getEmail('email')
    expect(email).toBe('test@example.com')
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
})

describe('getNumberFormula', () => {
  it('should return number formula as a number', () => {
    const formula = airtableTableRecord.getNumberFormula('numberFormula')
    expect(formula).toBe(100)
  })
})

describe('getBooleanFormula', () => {
  it('should return boolean formula as a boolean', () => {
    const formula = airtableTableRecord.getBooleanFormula('booleanFormula')
    expect(formula).toBe(false)
  })
})

describe('getDateFormula', () => {
  it('should return date formula as a Date object', () => {
    const formula = airtableTableRecord.getDateFormula('dateFormula')
    expect(formula).toEqual(new Date('2023-02-01T00:00:00Z'))
  })
})

describe('getLastEditedBy', () => {
  it('should return last edited by as a string and not null', () => {
    const lastEditedBy = airtableTableRecord.getLastEditedBy('lastEditedBy')
    expect(lastEditedBy).toBe('Editor')
  })

  it('should throw an error if lastEditedBy is null', () => {
    airtableTableRecord.fields.lastEditedBy = null
    expect(() => airtableTableRecord.getLastEditedBy('lastEditedBy')).toThrowError(
      'Field "lastEditedBy" should not be null'
    )
  })
})

describe('getLastEditedTime', () => {
  it('should return last edited time as a Date object and not null', () => {
    const lastEditedTime = airtableTableRecord.getLastEditedTime('lastEditedTime')
    expect(lastEditedTime).toEqual(new Date('2023-01-03T00:00:00Z'))
  })

  it('should throw an error if lastEditedTime is null', () => {
    airtableTableRecord.fields.lastEditedTime = null
    expect(() => airtableTableRecord.getLastEditedTime('lastEditedTime')).toThrowError(
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

describe('getDateRollup', () => {
  it('should return the first date rollup as a Date object', () => {
    const dateRollup = airtableTableRecord.getDateRollup('dateRollup')
    expect(dateRollup).toEqual(new Date('2023-02-01T00:00:00Z'))
  })

  it('should return null if there is no date rollup', () => {
    airtableTableRecord.fields.dateRollup = null
    const dateRollup = airtableTableRecord.getDateRollup('dateRollup')
    expect(dateRollup).toBeNull()
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

describe('getStatus', () => {
  it('should return status as a string', () => {
    const status = airtableTableRecord.getStatus('status')
    expect(status).toBe('In Progress')
  })
})

describe('getUrl', () => {
  it('should return URL as a string', () => {
    const url = airtableTableRecord.getUrl('url')
    expect(url).toBe('https://example.com')
  })
})
