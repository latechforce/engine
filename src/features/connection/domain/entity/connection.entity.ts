import type { ConnectionSchema } from '../schema/connection.schema'

export class Connection {
  constructor(
    public readonly schema: ConnectionSchema,
    public readonly appBaseUrl: string
  ) {}

  get authType() {
    return 'clientId' in this.schema && 'clientSecret' in this.schema ? 'oauth' : 'api-key'
  }

  get redirectUri() {
    return this.appBaseUrl + '/api/connections/auth?id=' + this.schema.id
  }
}
