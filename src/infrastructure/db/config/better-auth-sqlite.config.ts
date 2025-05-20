import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin } from 'better-auth/plugins'
import { drizzle } from 'drizzle-orm/bun-sqlite'

export const auth = betterAuth({
  database: drizzleAdapter(drizzle(process.env.DATABASE_URL!), {
    provider: 'sqlite',
  }),
  plugins: [admin()],
})
