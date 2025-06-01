const TYPES = {
  HonoContext: Symbol.for('BucketHonoContext'),
  Repository: {
    Bucket: Symbol.for('IBucketRepository'),
    Object: Symbol.for('IObjectRepository'),
  },
  UseCase: {
    Setup: Symbol.for('SetupBucketUseCase'),
    ListObjects: Symbol.for('ListObjectsUseCase'),
    UploadObject: Symbol.for('UploadObjectUseCase'),
    DownloadObject: Symbol.for('DownloadObjectUseCase'),
    DeleteObject: Symbol.for('DeleteObjectUseCase'),
  },
  Service: {
    Database: Symbol.for('BucketDatabaseService'),
  },
}

export default TYPES
