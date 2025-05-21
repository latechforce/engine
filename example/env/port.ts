import type { AppSchema, EnvSchema } from '@/types'

export const env: EnvSchema = {
  PORT: '4567',
}

export default {
  name: 'Custom PORT',
  description: 'App with custom PORT',
} satisfies AppSchema
