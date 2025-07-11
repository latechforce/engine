// Third-party imports
import { Container } from 'inversify'

// App domain imports
import type { IAppRepository } from '../../domain/repository-interface/app-repository.interface'
import TYPES from '../../application/di/types'

// App application imports
import { StartAppUseCase } from '../../application/use-case/start-app.use-case'
import { GetAppMetadataUseCase } from '../../application/use-case/get-app-metadata.use-case'
import { ValidateAppUseCase } from '../../application/use-case/validate-app.use-case'

// App infrastructure imports
import { AppRepository } from '../repository/app.repository'
import { AppHonoContext } from './context'
import { GetAdminMetadataUseCase } from '../../application/use-case/get-admin-metadata.use-case'

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
  container
    .bind<GetAdminMetadataUseCase>(TYPES.UseCase.GetAdminMetadata)
    .to(GetAdminMetadataUseCase)
    .inSingletonScope()

  // Register context
  container.bind<AppHonoContext>(TYPES.HonoContext).to(AppHonoContext).inSingletonScope()

  return container
}
