import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/infrastucture/db/migrations/sqlite',
  schema: './src/infrastucture/db/schema/sqlite/index.ts',
  dialect: 'sqlite',
})
