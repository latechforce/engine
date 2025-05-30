import { inject, injectable } from 'inversify'
import type { GetAppMetadataUseCase } from '../../application/use-case/get-app-metadata.use-case'
import type { App } from '../../domain/entity/app.entity'
import TYPES from '@/shared/application/di/types'
import type { Context } from 'hono'

export type AppHonoContextType = { app: App; getAppMetadataUseCase: GetAppMetadataUseCase }

@injectable()
export class AppHonoContext {
  constructor(
    @inject(TYPES.App.UseCase.GetMetadata)
    private readonly getAppMetadataUseCase: GetAppMetadataUseCase
  ) {}

  setVariables(c: Context, app: App) {
    c.set('app', app)
    c.set('getAppMetadataUseCase', this.getAppMetadataUseCase)
  }
}
