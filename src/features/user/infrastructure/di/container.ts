import { Container } from 'inversify'
import TYPES from '@/shared/application/di/types'
import { AuthService } from '../service/auth.service'
import { UserHonoContext } from './context'

export function registerUserDependencies(container: Container) {
  // Register services
  container.bind<AuthService>(TYPES.User.Service.Auth).to(AuthService).inSingletonScope()

  // Register context
  container.bind<UserHonoContext>(TYPES.User.HonoContext).to(UserHonoContext).inSingletonScope()

  return container
}
