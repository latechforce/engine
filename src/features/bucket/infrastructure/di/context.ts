import type { Context } from 'hono'
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

export class BucketHonoContext {
  constructor(
    private readonly uploadObjectUseCase: UploadObjectUseCase,

    private readonly downloadObjectUseCase: DownloadObjectUseCase,

    private readonly deleteObjectUseCase: DeleteObjectUseCase,

    private readonly listObjectsUseCase: ListObjectsUseCase
  ) {}

  setVariables(c: Context) {
    c.set('uploadObjectUseCase', this.uploadObjectUseCase)
    c.set('downloadObjectUseCase', this.downloadObjectUseCase)
    c.set('deleteObjectUseCase', this.deleteObjectUseCase)
    c.set('listObjectsUseCase', this.listObjectsUseCase)
  }
}
