export type Env = {
  NODE_ENV: 'development' | 'production' | 'test'
  PORT: string
  BASE_URL: string
  LOG_LEVEL: 'error' | 'http' | 'warn' | 'info' | 'debug' | 'verbose'
  LOG_SILENT: string
  DATABASE_PROVIDER: 'postgres' | 'sqlite'
  DATABASE_URL: string
  AUTH_ADMIN_EMAIL: string
  AUTH_ADMIN_PASSWORD: string
  AUTH_ADMIN_NAME: string
  AUTH_SECRET: string
}
