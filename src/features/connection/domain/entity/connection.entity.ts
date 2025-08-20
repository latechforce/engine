import crypto from 'crypto'
import type { ConnectionSchema } from '../../../../shared/integrations/core/connection.schema'

export class Connection {
  public state: string

  constructor(public readonly schema: ConnectionSchema) {
    this.state = crypto.randomBytes(32).toString('base64url')
  }

  get id() {
    return this.schema.id
  }

  get name() {
    return this.schema.name
  }

  get service() {
    return this.schema.service
  }

  get clientId() {
    return this.schema.clientId
  }

  get clientSecret() {
    return this.schema.clientSecret
  }
}
