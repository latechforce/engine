import { RollupField } from '/domain/entities/Field/Rollup'
import type { IRollupField } from '/domain/interfaces/IField/IRollup'
import type { IField } from '/domain/interfaces/IField'
import { FieldMapper } from '.'
import { ConfigError } from '/domain/entities/Error/Config'
import { MultipleLinkedRecordFieldMapper } from './MultipleLinkedRecordMapper'

export class RollupFieldMapper {
  static toEntity = (config: IRollupField, fields: IField[]): RollupField => {
    const { name, output, ...res } = config
    const outputEntity = FieldMapper.toOutputEntity({ ...output, name })
    const multipleLinkedRecordField = fields.find(
      (field) => field.name === config.multipleLinkedRecord
    )
    if (!multipleLinkedRecordField || multipleLinkedRecordField.type !== 'MultipleLinkedRecord') {
      throw new ConfigError({
        entity: 'Field',
        name: config.name,
        message: `RollupMapper: Field ${config.multipleLinkedRecord} not found`,
      })
    }
    const multipleLinkedRecord = MultipleLinkedRecordFieldMapper.toEntity(multipleLinkedRecordField)
    return new RollupField({ ...res, name, output: outputEntity, multipleLinkedRecord })
  }
}
