import { inject, injectable } from 'inversify'
import type { GetAppMetadataUseCase } from '../../application/use-case/get-app-metadata.use-case'
import type { App } from '../../domain/entity/app.entity'
import TYPES from '../../../../shared/application/di/types'
import type { Context } from 'hono'
import type { GetAdminMetadataUseCase } from '../../application/use-case/get-admin-metadata.use-case'

export type AppHonoContextType = {
  app: App
  getAppMetadataUseCase: GetAppMetadataUseCase
  getAdminMetadataUseCase: GetAdminMetadataUseCase
}

@injectable()
export class AppHonoContext {
  constructor(
    @inject(TYPES.App.UseCase.GetMetadata)
    private readonly getAppMetadataUseCase: GetAppMetadataUseCase,
    @inject(TYPES.App.UseCase.GetAdminMetadata)
    private readonly getAdminMetadataUseCase: GetAdminMetadataUseCase
  ) {}

  setVariables(c: Context, app: App) {
    c.set('app', app)
    c.set('getAppMetadataUseCase', this.getAppMetadataUseCase)
    c.set('getAdminMetadataUseCase', this.getAdminMetadataUseCase)
  }
}
