import type { AppSchema, EnvSchema } from '@/types'

export const env: EnvSchema = {
  DATABASE_PROVIDER: 'sqlite',
  DATABASE_URL: './tmp/test.db',
}

export const sqliteDatabase: AppSchema = {
  name: 'My app with sqlite database',
}
