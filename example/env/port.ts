import type { AppSchema, EnvSchema } from '@/types'

export const env: EnvSchema = {
  PORT: '3000',
}

export const port: AppSchema = {
  name: 'My app with port',
}
