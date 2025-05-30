import type { AuthService, AuthType } from '../service/auth.service'
import { inject, injectable } from 'inversify'
import TYPES from '@/shared/application/di/types'
import type { Context } from 'hono'

export type UserHonoContextType = AuthType & {
  auth: AuthService
}

@injectable()
export class UserHonoContext {
  constructor(
    @inject(TYPES.User.Service.Auth)
    private readonly auth: AuthService
  ) {}

  setVariables(c: Context) {
    c.set('auth', this.auth)
  }
}
