import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/shared/infrastructure/db/migrations/postgres',
  schema: './src/shared/infrastructure/db/schema/postgres.ts',
  dialect: 'postgresql',
})
