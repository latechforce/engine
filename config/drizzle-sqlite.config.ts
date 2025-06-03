import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/shared/infrastructure/db/migrations/sqlite',
  schema: './src/shared/infrastructure/db/schema/sqlite.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: './data/sqlite.db',
  },
})
