import type { Drivers } from '@adapter/spi/drivers'
import { AuthSpi } from '@adapter/spi/drivers/AuthSpi'
import { Auth, type AuthConfig, type AuthServices } from '@domain/services/Auth'

export class AuthMapper {
  static toService(
    drivers: Drivers,
    config: AuthConfig = {
      redirectOnLogin: '/',
      redirectOnLogout: '/',
      strategy: 'magic-link',
      confirmEmail: {
        from: 'noreply@latechforce.com',
        subject: 'Please confirm your email',
        text: 'Please confirm your email',
        html: 'Please confirm your email',
      },
      secret: 'secret',
    },
    services: AuthServices
  ): Auth {
    const driver = drivers.auth(config)
    const spi = new AuthSpi(driver)
    return new Auth(spi, services, config)
  }
}
