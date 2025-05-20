import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/infrastructure/db/migrations/postgres',
  schema: './src/infrastructure/db/schema/postgres/index.ts',
  dialect: 'postgresql',
})
