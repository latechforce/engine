import type { AppSchema, EnvSchema } from '@/types'

export const env: EnvSchema = {
  DATABASE_PROVIDER: 'postgres',
  DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/postgres',
}

export const inGuides = true

export default {
  name: 'Start with a PostgreSQL database',
  description: 'App with PostgreSQL database',
} satisfies AppSchema
