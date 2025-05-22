import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin } from 'better-auth/plugins'
import { drizzle } from 'drizzle-orm/node-postgres'

export const auth = betterAuth({
  database: drizzleAdapter(drizzle(process.env.DATABASE_URL!), {
    provider: 'pg',
  }),
  plugins: [admin()],
})
