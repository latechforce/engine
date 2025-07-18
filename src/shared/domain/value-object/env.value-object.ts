export type Env = {
  NODE_ENV: 'development' | 'production' | 'test'
  PORT: string
  BASE_URL: string
  TIMEZONE: string
  LOG_LEVEL: 'silent' | 'error' | 'info' | 'http' | 'debug'
  DATABASE_PROVIDER: 'postgres' | 'sqlite'
  DATABASE_URL: string
  AUTH_ADMIN_EMAIL: string
  AUTH_ADMIN_PASSWORD: string
  AUTH_ADMIN_NAME: string
  AUTH_SECRET: string
  RESEND_API_KEY?: string
  RESEND_EMAIL_FROM: string
  SUPPORT_EMAILS: string
}
