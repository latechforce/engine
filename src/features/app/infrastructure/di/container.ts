import { Container } from 'inversify'
import { AppRepository } from '../repository/app.repository'
import { StartAppUseCase } from '../../application/use-case/start-app.use-case'
import TYPES from '../../application/di/types'
import type { IAppRepository } from '../../domain/repository-interface/app-repository.interface'
import { GetAppMetadataUseCase } from '../../application/use-case/get-app-metadata.use-case'
import { AppHonoContext } from './context'
import { ValidateAppUseCase } from '@/app/application/use-case/validate-app.use-case'
import { MockAppUseCase } from '@/app/application/use-case/mock-app.use-case'

export function registerAppDependencies(container: Container) {
  // Register repositories
  container.bind<IAppRepository>(TYPES.Repository).to(AppRepository).inSingletonScope()

  // Register use cases
  container.bind<StartAppUseCase>(TYPES.UseCase.Start).to(StartAppUseCase).inSingletonScope()
  container
    .bind<ValidateAppUseCase>(TYPES.UseCase.Validate)
    .to(ValidateAppUseCase)
    .inSingletonScope()
  container
    .bind<GetAppMetadataUseCase>(TYPES.UseCase.GetMetadata)
    .to(GetAppMetadataUseCase)
    .inSingletonScope()
  container.bind<MockAppUseCase>(TYPES.UseCase.Mock).to(MockAppUseCase).inSingletonScope()

  // Register context
  container.bind<AppHonoContext>(TYPES.HonoContext).to(AppHonoContext).inSingletonScope()

  return container
}
