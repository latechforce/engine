import type { HonoType } from '../../../../shared/infrastructure/service'
import type { Context, MiddlewareHandler } from 'hono'

export const authMiddleware: MiddlewareHandler = async (c: Context<HonoType>, next) => {
  const session = await c.get('auth').api.getSession({ headers: c.req.raw.headers })

  if (!session) {
    c.set('user', null)
    c.set('session', null)
    return next()
  }

  c.set('user', session.user)
  c.set('session', session.session)
  return next()
}
