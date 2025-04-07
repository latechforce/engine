import type { FileDto } from '../dtos/FileDto'
import { type FileToSave, File } from '/domain/entities/File'

export class FileMapper {
  static toDto = (fileToSave: FileToSave): FileDto => {
    return fileToSave
  }

  static toEntity = (file: FileDto, endpoint: string) => {
    const url = `${endpoint}/${file.id}`
    return new File(file.id, file.name, file.mime_type, file.data, url, file.created_at)
  }
}
