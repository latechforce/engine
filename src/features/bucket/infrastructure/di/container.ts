import { Container } from 'inversify'
import TYPES from '../../application/di/types'
import type { IBucketRepository } from '../../domain/repository-interface/bucket-repository.interface'
import { BucketRepository } from '../repository/bucket.repository'
import { BucketHonoContext } from './context'
import { DeleteObjectUseCase } from '../../application/use-case/delete-object.use-case'
import { UploadObjectUseCase } from '../../application/use-case/upload-object.use-case'
import { DownloadObjectUseCase } from '../../application/use-case/download-object.use-case'
import { BucketDatabaseService } from '../service/database.service'
import type { IObjectRepository } from '../../domain/repository-interface/object-repository.interface'
import { ObjectRepository } from '../repository/object.repository'
import { SetupBucketUseCase } from '../../application/use-case/setup-bucket.use-case'
import { ListObjectsUseCase } from '../../application/use-case/list-objects.use-case'

export function registerBucketDependencies(container: Container) {
  // Register repositories
  container.bind<IBucketRepository>(TYPES.Repository.Bucket).to(BucketRepository).inSingletonScope()
  container.bind<IObjectRepository>(TYPES.Repository.Object).to(ObjectRepository).inSingletonScope()

  // Register use cases
  container.bind<SetupBucketUseCase>(TYPES.UseCase.Setup).to(SetupBucketUseCase).inSingletonScope()
  container
    .bind<UploadObjectUseCase>(TYPES.UseCase.UploadObject)
    .to(UploadObjectUseCase)
    .inSingletonScope()
  container
    .bind<DownloadObjectUseCase>(TYPES.UseCase.DownloadObject)
    .to(DownloadObjectUseCase)
    .inSingletonScope()
  container
    .bind<DeleteObjectUseCase>(TYPES.UseCase.DeleteObject)
    .to(DeleteObjectUseCase)
    .inSingletonScope()
  container
    .bind<ListObjectsUseCase>(TYPES.UseCase.ListObjects)
    .to(ListObjectsUseCase)
    .inSingletonScope()

  // Register services
  container
    .bind<BucketDatabaseService>(TYPES.Service.Database)
    .to(BucketDatabaseService)
    .inSingletonScope()

  // Register context
  container.bind<BucketHonoContext>(TYPES.HonoContext).to(BucketHonoContext).inSingletonScope()

  return container
}
