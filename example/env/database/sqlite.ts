import type { AppSchema, EnvSchema } from '@/types'

export const env: EnvSchema = {
  DATABASE_PROVIDER: 'sqlite',
  DATABASE_URL: './tmp/test.db',
}

export default {
  name: 'SQLite database',
  description: 'App with SQLite database',
} satisfies AppSchema
