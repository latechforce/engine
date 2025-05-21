import { z } from 'zod/v4'

export const envValidator = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().optional(),
  BASE_URL: z.string().optional(),
  LOG_LEVEL: z.enum(['error', 'http', 'warn', 'info', 'debug', 'verbose']).default('http'),
  LOG_SILENT: z.string().default('false'),
  DATABASE_PROVIDER: z.enum(['postgres', 'sqlite']).default('sqlite'),
  DATABASE_URL: z.string().default(':memory:'),
  AUTH_ADMIN_EMAIL: z.string().default('admin@admin.com'),
  AUTH_ADMIN_PASSWORD: z.string().default('admin'),
  AUTH_ADMIN_NAME: z.string().default('admin'),
  AUTH_SECRET: z.string().default('secret'),
})

export type EnvSchema = z.infer<typeof envValidator>
