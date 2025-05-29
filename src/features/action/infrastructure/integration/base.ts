import type { IntegrationAction } from '@/action/domain/entity/integration-action.entity'
import type { Token } from '@/connection/domain/value-object/token.value-object'

export class BaseActionIntegration {
  constructor(protected readonly baseUrl: string) {}

  async runAction(_action: IntegrationAction, _token: Token): Promise<object> {
    throw new Error('Not implemented')
  }

  getTokenHeader(token: Token) {
    return {
      Authorization: `Bearer ${token.access_token}`,
    }
  }
}
