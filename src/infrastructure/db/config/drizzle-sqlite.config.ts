import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/infrastructure/db/migrations/sqlite',
  schema: './src/infrastructure/db/schema/sqlite/index.ts',
  dialect: 'sqlite',
})
