import { z } from 'zod/v4'

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  BASE_URL: z.string().optional(),
  TIMEZONE: z.string().default('UTC'),
  LOG_LEVEL: z.enum(['silent', 'error', 'info', 'http', 'debug']).default('http'),
  DATABASE_PROVIDER: z.enum(['postgres', 'sqlite']).default('sqlite'),
  DATABASE_URL: z.string().default('./data/sqlite.db'),
  AUTH_ADMIN_EMAIL: z.string().default('admin@admin.com'),
  AUTH_ADMIN_PASSWORD: z.string().default('admin'),
  AUTH_ADMIN_NAME: z.string().default('admin'),
  AUTH_SECRET: z.string().default('secret'),
  RESEND_API_KEY: z.string().optional(),
  RESEND_EMAIL_FROM: z.string().default('onboarding@resend.dev'),
  SUPPORT_EMAILS: z.string().default('thomas.jeanneau@latechforce.com'),
})

export type EnvSchemaValidated = z.infer<typeof envSchema>
export type EnvSchema = Partial<EnvSchemaValidated>
