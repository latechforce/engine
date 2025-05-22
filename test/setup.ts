import { beforeAll } from 'bun:test'

beforeAll(async () => {
  if (process.env.LOG_LEVEL !== 'debug') {
    process.env.LOG_SILENT = 'true'
  }
  process.env.PORT = '*'
  process.env.DATABASE_URL = ':memory:'
})
