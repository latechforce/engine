import type { Context, MiddlewareHandler } from 'hono'
import type { HonoType } from '@/infrastructure/service/server.service'

export const loggerMiddleware: MiddlewareHandler = async (c: Context<HonoType>, next) => {
  const logger = c.get('logger')
  const { method, url } = c.req

  if (
    url.includes('.js') ||
    url.includes('.css') ||
    url.includes('.png') ||
    url.includes('.ico') ||
    url.includes('.json')
  ) {
    await next()
    return
  }

  logger.http(`--> ${method} ${url}`)

  const start = Date.now()
  await next()
  const duration = Date.now() - start

  logger.http(`<-- ${method} ${url} ${c.res.status} ${duration}ms`)
}
