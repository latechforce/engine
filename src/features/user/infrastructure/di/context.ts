// Third-party imports
import type { Context } from 'hono'

// Shared imports

// User infrastructure imports
import type { AuthService, AuthType } from '../service/auth.service'

export type UserHonoContextType = AuthType & {
  auth: AuthService
}

export class UserHonoContext {
  constructor(private readonly auth: AuthService) {}

  setVariables(c: Context) {
    c.set('auth', this.auth)
  }
}
