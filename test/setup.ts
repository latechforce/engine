import { beforeAll } from 'bun:test'

beforeAll(async () => {
  if (process.env.LOG_LEVEL !== 'debug') {
    process.env.LOG_SILENT = 'true'
  }
})
