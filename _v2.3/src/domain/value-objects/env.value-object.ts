export type Env = {
  NODE_ENV: 'development' | 'production' | 'test'
  PORT: string
  DATABASE_CLIENT: 'sqlite' | 'postgres'
  DATABASE_URL: string
}
