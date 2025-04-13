import { RollupField } from '/domain/entities/Field/Rollup'
import { ConfigError } from '/domain/entities/Error/Config'
import type { RollupFieldSchema } from '../../schemas/TableSchema/FieldSchema/RollupSchema'
import type { FieldSchema } from '../../schemas/TableSchema/FieldSchema'

export class RollupFieldMapper {
  static toEntity = (config: RollupFieldSchema, fields: FieldSchema[]): RollupField => {
    const multipleLinkedRecord = fields.find((field) => field.name === config.multipleLinkedRecord)
    if (!multipleLinkedRecord || multipleLinkedRecord.type !== 'MultipleLinkedRecord') {
      throw new ConfigError({
        entity: 'Field',
        name: config.name,
        message: `RollupMapper: Field ${config.multipleLinkedRecord} not found`,
      })
    }
    return new RollupField({ ...config, multipleLinkedRecord })
  }
}
