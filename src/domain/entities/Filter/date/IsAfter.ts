import { BaseFilter, type BaseFilterProps, buildFilterSchema } from '../base'

type Props = BaseFilterProps & {
  operator: 'IsAfter'
}

export type IsAfterDateFilterConfig = Props & {
  value: number | string
}

export type IsAfterDateFilterDto = Props & {
  value: string
}

export const onOrAfterDateFilterSchema = buildFilterSchema(
  {
    operator: { type: 'string', enum: ['IsAfter'] },
    value: { oneOf: [{ type: 'number' }, { type: 'string' }] },
  },
  ['operator', 'value']
)

export class IsAfterDateFilter extends BaseFilter {
  readonly value: string

  constructor(field: string, value: number | string) {
    super(field)
    if (typeof value === 'number') {
      this.value = new Date(value).toISOString()
    } else {
      this.value = value
    }
  }

  toDto(): IsAfterDateFilterDto {
    return {
      field: this.field,
      operator: 'IsAfter',
      value: this.value,
    }
  }
}
