import { inject, injectable } from 'inversify'
import type { Context } from 'hono'
import TYPES from '../../application/di/types'
import type { UploadObjectUseCase } from '../../application/use-case/upload-object.use-case'
import type { DownloadObjectUseCase } from '../../application/use-case/download-object.use-case'
import type { DeleteObjectUseCase } from '../../application/use-case/delete-object.use-case'
import type { ListObjectsUseCase } from '../../application/use-case/list-objects.use-case'

export type BucketHonoContextType = {
  uploadObjectUseCase: UploadObjectUseCase
  downloadObjectUseCase: DownloadObjectUseCase
  deleteObjectUseCase: DeleteObjectUseCase
  listObjectsUseCase: ListObjectsUseCase
}

@injectable()
export class BucketHonoContext {
  constructor(
    @inject(TYPES.UseCase.UploadObject)
    private readonly uploadObjectUseCase: UploadObjectUseCase,
    @inject(TYPES.UseCase.DownloadObject)
    private readonly downloadObjectUseCase: DownloadObjectUseCase,
    @inject(TYPES.UseCase.DeleteObject)
    private readonly deleteObjectUseCase: DeleteObjectUseCase,
    @inject(TYPES.UseCase.ListObjects)
    private readonly listObjectsUseCase: ListObjectsUseCase
  ) {}

  setVariables(c: Context) {
    c.set('uploadObjectUseCase', this.uploadObjectUseCase)
    c.set('downloadObjectUseCase', this.downloadObjectUseCase)
    c.set('deleteObjectUseCase', this.deleteObjectUseCase)
    c.set('listObjectsUseCase', this.listObjectsUseCase)
  }
}
