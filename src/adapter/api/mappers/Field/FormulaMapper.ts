import { FormulaField } from '/domain/entities/Field/Formula'
import type { IFormulaField } from '/domain/interfaces/IField/IFormula'
import { FieldMapper } from '.'

export class FormulaFieldMapper {
  static toEntity = (config: IFormulaField): FormulaField => {
    const { name, output, ...res } = config
    const outputEntity = FieldMapper.toOutputEntity({ ...output, name })
    return new FormulaField({ ...res, name, output: outputEntity })
  }

  static toManyEntities = (configs: IFormulaField[]): FormulaField[] => {
    return configs.map((config) => this.toEntity(config))
  }
}
