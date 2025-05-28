import { cors } from 'hono/cors'
import type { Context, MiddlewareHandler } from 'hono'
import type { HonoType } from '@/infrastructure/di/server.di'

export const corsMiddleware: MiddlewareHandler = (c: Context<HonoType>, next) => {
  const env = c.get('env')
  return cors({
    origin: env.get('BASE_URL'),
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  })(c, next)
}
