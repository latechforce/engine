export {}

process.env.FDT_APP_NAME = 'base'

jest.mock('fs-extra')
jest.mock('server-database/src/apps')

beforeEach(() => {
  jest.clearAllMocks()
})