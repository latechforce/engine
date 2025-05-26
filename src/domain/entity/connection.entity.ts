import type { ConnectionSchema } from '@/domain/validator/connection'

export class Connection {
  constructor(
    public readonly schema: ConnectionSchema,
    public readonly appBaseUrl: string
  ) {}

  get authType() {
    return 'clientId' in this.schema && 'clientSecret' in this.schema ? 'oauth' : 'api-key'
  }
}
