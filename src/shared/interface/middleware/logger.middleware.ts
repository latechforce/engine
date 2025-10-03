import type { Context, MiddlewareHandler } from 'hono'
import type { HonoType } from '../../infrastructure/service'

export const loggerMiddleware: MiddlewareHandler = async (c: Context<HonoType>, next) => {
  const logger = c.get('logger')
  const { method, url } = c.req
  const path = new URL(url).pathname

  if (
    path.includes('.js') ||
    path.includes('.css') ||
    path.includes('.png') ||
    path.includes('.ico') ||
    path.includes('.json')
  ) {
    await next()
    return
  }

  logger.http(`--> ${method} ${path}`)

  const start = Date.now()
  await next()
  const duration = Date.now() - start

  logger.http(`<-- ${method} ${path} ${c.res.status} ${duration}ms`)
}
