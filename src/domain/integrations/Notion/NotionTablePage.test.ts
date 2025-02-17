import { beforeEach, it, describe, expect } from 'bun:test'
import { NotionTablePage, type NotionTablePagePropertyFile } from './NotionTablePage'

type MockProperties = {
  title: string | null
  checkbox: boolean | null
  createdBy: string | null
  createdTime: string | null
  date: string | null
  email: string | null
  files: NotionTablePagePropertyFile[]
  number: number | null
  multiSelect: string[]
  people: string[]
  phone: string | null
  relation: string[]
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

let notionTablePage: NotionTablePage<MockProperties>

beforeEach(() => {
  const mockProperties: MockProperties = {
    title: 'Test Title',
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
    relation: ['relation1'],
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

  notionTablePage = new NotionTablePage<MockProperties>(
    'page-id',
    mockProperties,
    new Date('2023-01-01T00:00:00Z'),
    new Date('2023-01-02T00:00:00Z'),
    false
  )
})

describe('id', () => {
  it('should return id without -', () => {
    const id = notionTablePage.id
    expect(id).toBe('pageid')
  })
})

describe('getTitle', () => {
  it('should return title as a string', () => {
    const title = notionTablePage.getTitle('title')
    expect(title).toBe('Test Title')
  })

  it('should throw an error for non-existing property', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(() => notionTablePage.getTitle('nonExisting')).toThrowError(
      'Property "nonExisting" does not exist'
    )
  })
})

describe('getTitleOrThrow', () => {
  it('should return title as a string', () => {
    const title = notionTablePage.getTitleOrThrow('title')
    expect(title).toBe('Test Title')
  })

  it('should throw an error if title is null', () => {
    notionTablePage.properties.title = null
    expect(() => notionTablePage.getTitleOrThrow('title')).toThrowError(
      'Property "title" should not be null'
    )
  })
})

describe('getCheckbox', () => {
  it('should return checkbox as a boolean', () => {
    const checkbox = notionTablePage.getCheckbox('checkbox')
    expect(checkbox).toBe(true)
  })

  it('should return null if checkbox is null', () => {
    notionTablePage.properties.checkbox = null
    const checkbox = notionTablePage.getCheckbox('checkbox')
    expect(checkbox).toBe(null)
  })
})

describe('getCheckboxOrThrow', () => {
  it('should return checkbox as a boolean', () => {
    notionTablePage.properties.checkbox = true
    const checkbox = notionTablePage.getCheckboxOrThrow('checkbox')
    expect(checkbox).toBe(true)
  })

  it('should throw an error if checkbox is null', () => {
    notionTablePage.properties.checkbox = null
    expect(() => notionTablePage.getCheckboxOrThrow('checkbox')).toThrowError(
      'Property "checkbox" should not be null'
    )
  })
})

describe('getCreatedByOrThrow', () => {
  it('should return createdBy as a string and not null', () => {
    const createdBy = notionTablePage.getCreatedByOrThrow('createdBy')
    expect(createdBy).toBe('Creator')
  })

  it('should throw an error if createdBy is null', () => {
    notionTablePage.properties.createdBy = null
    expect(() => notionTablePage.getCreatedByOrThrow('createdBy')).toThrowError(
      'Property "createdBy" should not be null'
    )
  })
})

describe('getCreatedTimeOrThrow', () => {
  it('should return created time as a Date object and not null', () => {
    const createdTime = notionTablePage.getCreatedTimeOrThrow('createdTime')
    expect(createdTime).toEqual(new Date('2023-01-01T00:00:00Z'))
  })

  it('should throw an error if createdTime is missing', () => {
    notionTablePage.properties.createdTime = null
    expect(() => notionTablePage.getCreatedTimeOrThrow('createdTime')).toThrowError(
      'Property "createdTime" should not be null'
    )
  })
})

describe('getDate', () => {
  it('should return date as a Date object', () => {
    const date = notionTablePage.getDate('date')
    expect(date).toEqual(new Date('2023-02-01T00:00:00Z'))
  })

  it('should return null if date is null', () => {
    notionTablePage.properties.date = null
    const date = notionTablePage.getDate('date')
    expect(date).toBe(null)
  })
})

describe('getDateOrThrow', () => {
  it('should return date as a Date object', () => {
    const date = notionTablePage.getDateOrThrow('date')
    expect(date).toEqual(new Date('2023-02-01T00:00:00Z'))
  })

  it('should throw an error if date is null', () => {
    notionTablePage.properties.date = null
    expect(() => notionTablePage.getDateOrThrow('date')).toThrowError(
      'Property "date" should not be null'
    )
  })
})

describe('getEmail', () => {
  it('should return email as a string', () => {
    const email = notionTablePage.getEmail('email')
    expect(email).toBe('test@example.com')
  })

  it('should return null if email is null', () => {
    notionTablePage.properties.email = null
    const email = notionTablePage.getEmail('email')
    expect(email).toBe(null)
  })
})

describe('getEmailOrThrow', () => {
  it('should return email as a string', () => {
    const email = notionTablePage.getEmailOrThrow('email')
    expect(email).toBe('test@example.com')
  })

  it('should throw an error if email is null', () => {
    notionTablePage.properties.email = null
    expect(() => notionTablePage.getEmailOrThrow('email')).toThrowError(
      'Property "email" should not be null'
    )
  })
})

describe('getFiles', () => {
  it('should return files as an array of objects', () => {
    const files = notionTablePage.getFiles('files')
    expect(files).toEqual([
      { name: 'file1', url: 'https://example.com/file1' },
      { name: 'file2', url: 'https://example.com/file2' },
    ])
  })
})

describe('getStringFormula', () => {
  it('should return string formula as a string', () => {
    const formula = notionTablePage.getStringFormula('stringFormula')
    expect(formula).toBe('Formula String')
  })

  it('should return null if string formula is null', () => {
    notionTablePage.properties.stringFormula = null
    const formula = notionTablePage.getStringFormula('stringFormula')
    expect(formula).toBe(null)
  })
})

describe('getStringFormulaOrThrow', () => {
  it('should return string formula as a string', () => {
    const formula = notionTablePage.getStringFormulaOrThrow('stringFormula')
    expect(formula).toBe('Formula String')
  })

  it('should throw an error if string formula is null', () => {
    notionTablePage.properties.stringFormula = null
    expect(() => notionTablePage.getStringFormulaOrThrow('stringFormula')).toThrowError(
      'Property "stringFormula" should not be null'
    )
  })
})

describe('getNumberFormula', () => {
  it('should return number formula as a number', () => {
    const formula = notionTablePage.getNumberFormula('numberFormula')
    expect(formula).toBe(100)
  })

  it('should return null if number formula is null', () => {
    notionTablePage.properties.numberFormula = null
    const formula = notionTablePage.getNumberFormula('numberFormula')
    expect(formula).toBe(null)
  })
})

describe('getNumberFormulaOrThrow', () => {
  it('should return number formula as a number', () => {
    const formula = notionTablePage.getNumberFormulaOrThrow('numberFormula')
    expect(formula).toBe(100)
  })

  it('should throw an error if number formula is null', () => {
    notionTablePage.properties.numberFormula = null
    expect(() => notionTablePage.getNumberFormulaOrThrow('numberFormula')).toThrowError(
      'Property "numberFormula" should not be null'
    )
  })
})

describe('getBooleanFormula', () => {
  it('should return boolean formula as a boolean', () => {
    const formula = notionTablePage.getBooleanFormula('booleanFormula')
    expect(formula).toBe(false)
  })

  it('should return null if boolean formula is null', () => {
    notionTablePage.properties.booleanFormula = null
    const formula = notionTablePage.getBooleanFormula('booleanFormula')
    expect(formula).toBe(null)
  })
})

describe('getBooleanFormulaOrThrow', () => {
  it('should return boolean formula as a boolean', () => {
    const formula = notionTablePage.getBooleanFormulaOrThrow('booleanFormula')
    expect(formula).toBe(false)
  })

  it('should throw an error if boolean formula is null', () => {
    notionTablePage.properties.booleanFormula = null
    expect(() => notionTablePage.getBooleanFormulaOrThrow('booleanFormula')).toThrowError(
      'Property "booleanFormula" should not be null'
    )
  })
})

describe('getDateFormula', () => {
  it('should return date formula as a Date object', () => {
    const formula = notionTablePage.getDateFormula('dateFormula')
    expect(formula).toEqual(new Date('2023-02-01T00:00:00Z'))
  })

  it('should return null if date formula is null', () => {
    notionTablePage.properties.dateFormula = null
    const formula = notionTablePage.getDateFormula('dateFormula')
    expect(formula).toBe(null)
  })
})

describe('getDateFormulaOrThrow', () => {
  it('should return date formula as a Date object', () => {
    const formula = notionTablePage.getDateFormulaOrThrow('dateFormula')
    expect(formula).toEqual(new Date('2023-02-01T00:00:00Z'))
  })

  it('should throw an error if date formula is null', () => {
    notionTablePage.properties.dateFormula = null
    expect(() => notionTablePage.getDateFormulaOrThrow('dateFormula')).toThrowError(
      'Property "dateFormula" should not be null'
    )
  })
})

describe('getLastEditedBy', () => {
  it('should return last edited by as a string and not null', () => {
    const lastEditedBy = notionTablePage.getLastEditedBy('lastEditedBy')
    expect(lastEditedBy).toBe('Editor')
  })

  it('should return null if lastEditedBy is null', () => {
    notionTablePage.properties.lastEditedBy = null
    const lastEditedBy = notionTablePage.getLastEditedBy('lastEditedBy')
    expect(lastEditedBy).toBe(null)
  })
})

describe('getLastEditedByOrThrow', () => {
  it('should return last edited by as a string and not null', () => {
    const lastEditedBy = notionTablePage.getLastEditedByOrThrow('lastEditedBy')
    expect(lastEditedBy).toBe('Editor')
  })

  it('should throw an error if lastEditedBy is null', () => {
    notionTablePage.properties.lastEditedBy = null
    expect(() => notionTablePage.getLastEditedByOrThrow('lastEditedBy')).toThrowError(
      'Property "lastEditedBy" should not be null'
    )
  })
})

describe('getLastEditedTime', () => {
  it('should return last edited time as a Date object and not null', () => {
    const lastEditedTime = notionTablePage.getLastEditedTime('lastEditedTime')
    expect(lastEditedTime).toEqual(new Date('2023-01-03T00:00:00Z'))
  })

  it('should return null if lastEditedTime is null', () => {
    notionTablePage.properties.lastEditedTime = null
    const lastEditedTime = notionTablePage.getLastEditedTime('lastEditedTime')
    expect(lastEditedTime).toBe(null)
  })
})

describe('getLastEditedTimeOrThrow', () => {
  it('should return last edited time as a Date object and not null', () => {
    const lastEditedTime = notionTablePage.getLastEditedTimeOrThrow('lastEditedTime')
    expect(lastEditedTime).toEqual(new Date('2023-01-03T00:00:00Z'))
  })

  it('should throw an error if lastEditedTime is null', () => {
    notionTablePage.properties.lastEditedTime = null
    expect(() => notionTablePage.getLastEditedTimeOrThrow('lastEditedTime')).toThrowError(
      'Property "lastEditedTime" should not be null'
    )
  })
})

describe('getMultiSelect', () => {
  it('should return multi-select as an array of strings', () => {
    const multiSelect = notionTablePage.getMultiSelect('multiSelect')
    expect(multiSelect).toEqual(['option1', 'option2'])
  })
})

describe('getNumber', () => {
  it('should return number as a number', () => {
    const number = notionTablePage.getNumber('number')
    expect(number).toBe(42)
  })

  it('should return null if number is null', () => {
    notionTablePage.properties.number = null
    const number = notionTablePage.getNumber('number')
    expect(number).toBe(null)
  })
})

describe('getNumberOrThrow', () => {
  it('should return number as a number', () => {
    const number = notionTablePage.getNumberOrThrow('number')
    expect(number).toBe(42)
  })

  it('should throw an error if number is null', () => {
    notionTablePage.properties.number = null
    expect(() => notionTablePage.getNumberOrThrow('number')).toThrowError(
      'Property "number" should not be null'
    )
  })
})

describe('getPeople', () => {
  it('should return people as an array of strings', () => {
    const people = notionTablePage.getPeople('people')
    expect(people).toEqual(['Person A', 'Person B'])
  })
})

describe('getPhone', () => {
  it('should return phone as a string', () => {
    const phone = notionTablePage.getPhone('phone')
    expect(phone).toBe('123-456-7890')
  })

  it('should return null if phone is null', () => {
    notionTablePage.properties.phone = null
    const phone = notionTablePage.getPhone('phone')
    expect(phone).toBe(null)
  })
})

describe('getPhoneOrThrow', () => {
  it('should return phone as a string', () => {
    const phone = notionTablePage.getPhoneOrThrow('phone')
    expect(phone).toBe('123-456-7890')
  })

  it('should throw an error if phone is null', () => {
    notionTablePage.properties.phone = null
    expect(() => notionTablePage.getPhoneOrThrow('phone')).toThrowError(
      'Property "phone" should not be null'
    )
  })
})

describe('getRelation', () => {
  it('should return relation as a string', () => {
    const relation = notionTablePage.getRelation('relation')
    expect(relation).toEqual('relation1')
  })

  it('should return null if there is no relation', () => {
    notionTablePage.properties.relation = []
    const relation = notionTablePage.getRelation('relation')
    expect(relation).toBe(null)
  })
})

describe('getRelationOrThrow', () => {
  it('should return relation as a string', () => {
    const relation = notionTablePage.getRelationOrThrow('relation')
    expect(relation).toEqual('relation1')
  })

  it('should throw an error if there is no relation', () => {
    notionTablePage.properties.relation = []
    expect(() => notionTablePage.getRelationOrThrow('relation')).toThrowError(
      'Property "relation" should not be null'
    )
  })
})

describe('getRelations', () => {
  it('should return relations as an array of strings', () => {
    const relations = notionTablePage.getRelations('relations')
    expect(relations).toEqual(['relation1', 'relation2'])
  })
})

describe('getSingleRelation', () => {
  it('should return the first relation as a string', () => {
    const singleRelation = notionTablePage.getSingleRelation('relations')
    expect(singleRelation).toBe('relation1')
  })

  it('should return null if there are no relations', () => {
    notionTablePage.properties.relations = []
    const singleRelation = notionTablePage.getSingleRelation('relations')
    expect(singleRelation).toBeNull()
  })
})

describe('getSingleRelationOrThrow', () => {
  it('should return the first relation as a string', () => {
    const singleRelation = notionTablePage.getSingleRelationOrThrow('relations')
    expect(singleRelation).toBe('relation1')
  })

  it('should throw an error if there are no relations', () => {
    notionTablePage.properties.relations = []
    expect(() => notionTablePage.getSingleRelationOrThrow('relations')).toThrowError(
      'Property "relations" should not be null'
    )
  })
})

describe('getNumberArrayRollup', () => {
  it('should return number array rollup as an array of numbers', () => {
    const rollup = notionTablePage.getNumberArrayRollup('numberArrayRollup')
    expect(rollup).toEqual([1, 2, 3])
  })
})

describe('getBooleanArrayRollup', () => {
  it('should return boolean array rollup as an array of booleans', () => {
    const rollup = notionTablePage.getBooleanArrayRollup('booleanArrayRollup')
    expect(rollup).toEqual([true, false, true])
  })
})

describe('getSingleStringRollup', () => {
  it('should return the first string rollup as a string', () => {
    const singleStringRollup = notionTablePage.getSingleStringRollup('stringArrayRollup')
    expect(singleStringRollup).toBe('string1')
  })

  it('should return null if there are no string rollups', () => {
    notionTablePage.properties.stringArrayRollup = []
    const singleStringRollup = notionTablePage.getSingleStringRollup('stringArrayRollup')
    expect(singleStringRollup).toBeNull()
  })
})

describe('getSingleStringRollupOrThrow', () => {
  it('should return the first string rollup as a string', () => {
    const singleStringRollup = notionTablePage.getSingleStringRollupOrThrow('stringArrayRollup')
    expect(singleStringRollup).toBe('string1')
  })

  it('should throw an error if there are no string rollups', () => {
    notionTablePage.properties.stringArrayRollup = []
    expect(() => notionTablePage.getSingleStringRollupOrThrow('stringArrayRollup')).toThrowError(
      'Property "stringArrayRollup" should not be null'
    )
  })
})

describe('getDateRollup', () => {
  it('should return the first date rollup as a Date object', () => {
    const dateRollup = notionTablePage.getDateRollup('dateRollup')
    expect(dateRollup).toEqual(new Date('2023-02-01T00:00:00Z'))
  })

  it('should return null if there is no date rollup', () => {
    notionTablePage.properties.dateRollup = null
    const dateRollup = notionTablePage.getDateRollup('dateRollup')
    expect(dateRollup).toBeNull()
  })
})

describe('getDateRollupOrThrow', () => {
  it('should return the first date rollup as a Date object', () => {
    const dateRollup = notionTablePage.getDateRollupOrThrow('dateRollup')
    expect(dateRollup).toEqual(new Date('2023-02-01T00:00:00Z'))
  })

  it('should throw an error if there is no date rollup', () => {
    notionTablePage.properties.dateRollup = null
    expect(() => notionTablePage.getDateRollupOrThrow('dateRollup')).toThrowError(
      'Property "dateRollup" should not be null'
    )
  })
})

describe('getNumberRollup', () => {
  it('should return the first number rollup as a number', () => {
    const numberRollup = notionTablePage.getNumberRollup('numberRollup')
    expect(numberRollup).toBe(1)
  })

  it('should return null if there are no number rollups', () => {
    notionTablePage.properties.numberRollup = null
    const numberRollup = notionTablePage.getNumberRollup('numberRollup')
    expect(numberRollup).toBeNull()
  })
})

describe('getNumberRollupOrThrow', () => {
  it('should return the first number rollup as a number', () => {
    const numberRollup = notionTablePage.getNumberRollupOrThrow('numberRollup')
    expect(numberRollup).toBe(1)
  })

  it('should throw an error if there are no number rollups', () => {
    notionTablePage.properties.numberRollup = null
    expect(() => notionTablePage.getNumberRollupOrThrow('numberRollup')).toThrowError(
      'Property "numberRollup" should not be null'
    )
  })
})

describe('getStatus', () => {
  it('should return status as a string', () => {
    const status = notionTablePage.getStatus('status')
    expect(status).toBe('In Progress')
  })

  it('should return null if status is null', () => {
    notionTablePage.properties.status = null
    const status = notionTablePage.getStatus('status')
    expect(status).toBe(null)
  })
})

describe('getStatusOrThrow', () => {
  it('should return status as a string', () => {
    const status = notionTablePage.getStatusOrThrow('status')
    expect(status).toBe('In Progress')
  })

  it('should throw an error if status is null', () => {
    notionTablePage.properties.status = null
    expect(() => notionTablePage.getStatusOrThrow('status')).toThrowError(
      'Property "status" should not be null'
    )
  })
})

describe('getUrl', () => {
  it('should return URL as a string', () => {
    const url = notionTablePage.getUrl('url')
    expect(url).toBe('https://example.com')
  })

  it('should return null if URL is null', () => {
    notionTablePage.properties.url = null
    const url = notionTablePage.getUrl('url')
    expect(url).toBe(null)
  })
})

describe('getUrlOrThrow', () => {
  it('should return URL as a string', () => {
    const url = notionTablePage.getUrlOrThrow('url')
    expect(url).toBe('https://example.com')
  })

  it('should throw an error if URL is null', () => {
    notionTablePage.properties.url = null
    expect(() => notionTablePage.getUrlOrThrow('url')).toThrowError(
      'Property "url" should not be null'
    )
  })
})
