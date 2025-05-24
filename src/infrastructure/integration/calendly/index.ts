import { OAuthIntegration } from '../oauth'
import ky from 'ky'
import type { Connection } from '@/domain/entity/connection.entity'
import type { Token } from '@/domain/value-object/token.value-object'

export class CalendlyIntegration extends OAuthIntegration {
  constructor(connection: Connection) {
    super(connection, 'https://api.calendly.com', 'https://auth.calendly.com')
  }

  async checkConnection(token?: Token): Promise<boolean> {
    if (!token) {
      return false
    }
    const { access_token } = token
    const response = await ky.get(this.baseUrl + '/users/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    return response.ok
  }
}
