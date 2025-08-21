import type { GetAppMetadataUseCase } from '../../application/use-case/get-app-metadata.use-case'
import type { App } from '../../domain/entity/app.entity'
import type { Context } from 'hono'
import type { GetAdminMetadataUseCase } from '../../application/use-case/get-admin-metadata.use-case'

export type AppHonoContextType = {
  app: App
  getAppMetadataUseCase: GetAppMetadataUseCase
  getAdminMetadataUseCase: GetAdminMetadataUseCase
}

export class AppHonoContext {
  constructor(
    private readonly getAppMetadataUseCase: GetAppMetadataUseCase,

    private readonly getAdminMetadataUseCase: GetAdminMetadataUseCase
  ) {}

  setVariables(c: Context, app: App) {
    c.set('app', app)
    c.set('getAppMetadataUseCase', this.getAppMetadataUseCase)
    c.set('getAdminMetadataUseCase', this.getAdminMetadataUseCase)
  }
}
