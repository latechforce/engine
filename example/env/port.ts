import type { AppSchema, EnvSchema } from '@/types'

export const env: EnvSchema = {
  PORT: '4567',
}

export const inGuides = true

export default {
  name: 'Start with a custom PORT',
  description: 'App with custom PORT',
} satisfies AppSchema
