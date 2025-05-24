import type { ConnectionSchema } from '@/domain/validator/connection'

export class Connection {
  constructor(
    public readonly schema: ConnectionSchema,
    public readonly appBaseUrl: string
  ) {}

  get authType() {
    return this.schema.clientId && this.schema.clientSecret ? 'oauth' : 'api-key'
  }
}
