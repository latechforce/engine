import { SimpleContainer } from '../../../shared/infrastructure/di/simple-container'
import type { DatabaseService } from '../../../shared/infrastructure/service/database.service'

// Infrastructure
import { BucketRepository } from './repository/bucket.repository'
import { ObjectRepository } from './repository/object.repository'
import { BucketDatabaseService } from './service/database.service'

// Use Cases
import { SetupBucketUseCase } from '../application/use-case/setup-bucket.use-case'
import { ListObjectsUseCase } from '../application/use-case/list-objects.use-case'
import { UploadObjectUseCase } from '../application/use-case/upload-object.use-case'
import { DownloadObjectUseCase } from '../application/use-case/download-object.use-case'
import { DeleteObjectUseCase } from '../application/use-case/delete-object.use-case'

// Context
import { BucketHonoContext } from './di/context'
import type { ServerService } from '../../../shared/infrastructure/service/server.service'

export interface BucketServices {
  repositories: {
    bucket: BucketRepository
    object: ObjectRepository
  }
  useCases: {
    setup: SetupBucketUseCase
    listObjects: ListObjectsUseCase
    uploadObject: UploadObjectUseCase
    downloadObject: DownloadObjectUseCase
    deleteObject: DeleteObjectUseCase
  }
  services: {
    database: BucketDatabaseService
  }
  context: BucketHonoContext
}

export function createBucketServices(container: SimpleContainer): BucketServices {
  // Get shared services from container
  const database = container.get<DatabaseService>('database')
  const server = container.get<ServerService>('server')

  // Create database service
  const bucketDatabase = new BucketDatabaseService(database)

  // Create repositories
  const bucketRepository = new BucketRepository(bucketDatabase, server)
  const objectRepository = new ObjectRepository(bucketDatabase)

  // Create use cases
  const setupUseCase = new SetupBucketUseCase(bucketRepository)
  const listObjectsUseCase = new ListObjectsUseCase(objectRepository)
  const uploadObjectUseCase = new UploadObjectUseCase(objectRepository)
  const downloadObjectUseCase = new DownloadObjectUseCase(objectRepository)
  const deleteObjectUseCase = new DeleteObjectUseCase(objectRepository)

  container.set('bucketRepository', bucketRepository)
  container.set('objectRepository', objectRepository)
  container.set('setupBucketUseCase', setupUseCase)

  // Create context
  const context = new BucketHonoContext(
    uploadObjectUseCase,
    downloadObjectUseCase,
    deleteObjectUseCase,
    listObjectsUseCase
  )

  return {
    repositories: {
      bucket: bucketRepository,
      object: objectRepository,
    },
    useCases: {
      setup: setupUseCase,
      listObjects: listObjectsUseCase,
      uploadObject: uploadObjectUseCase,
      downloadObject: downloadObjectUseCase,
      deleteObject: deleteObjectUseCase,
    },
    services: {
      database: bucketDatabase,
    },
    context,
  }
}
