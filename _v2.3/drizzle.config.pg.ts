import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/infrastucture/db/migrations/pg',
  schema: './src/infrastucture/db/schema/pg/index.ts',
  dialect: 'postgresql',
})
