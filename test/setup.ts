import { beforeAll } from 'bun:test'

beforeAll(async () => {
  if (!process.env.LOG_LEVEL) {
    process.env.LOG_LEVEL = 'silent'
  }
  process.env.PORT = '*'
  process.env.DATABASE_URL = ':memory:'
})
