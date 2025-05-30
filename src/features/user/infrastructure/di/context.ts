// Third-party imports
import { inject, injectable } from 'inversify'
import type { Context } from 'hono'

// Shared imports
import TYPES from '@/shared/application/di/types'

// User infrastructure imports
import type { AuthService, AuthType } from '../service/auth.service'

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
