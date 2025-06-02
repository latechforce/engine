// Action infrastructure imports
import type { YouCanBookMeConnectionSchema } from '@/connection/domain/schema/integration/youcanbookme.schema'
import { YouCanBookMeActionIntegration } from '@/action/infrastructure/integration/youcanbookme'

export class YouCanBookMeConnectionIntegration {
  constructor(private readonly connection: YouCanBookMeConnectionSchema) {}

  async checkConnection(): Promise<boolean> {
    try {
      await new YouCanBookMeActionIntegration(
        this.connection.baseUrl,
        this.connection.username,
        this.connection.password
      ).getCurrentUser()
      return true
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
