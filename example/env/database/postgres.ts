import type { AppSchema, EnvSchema } from '@/types'

export const env: EnvSchema = {
  DATABASE_PROVIDER: 'postgres',
  DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/postgres',
}

export default {
  name: 'PostgreSQL database',
  description: 'App with PostgreSQL database',
} satisfies AppSchema
