import { BaseFilter, type BaseFilterProps, buildFilterSchema } from '../base'

type Props = BaseFilterProps & {
  operator: 'IsBefore'
}

export type IsBeforeDateFilterConfig = Props & {
  value: number | string
}

export type IsBeforeDateFilterDto = Props & {
  value: string
}

export const onOrAfterDateFilterSchema = buildFilterSchema(
  {
    operator: { type: 'string', enum: ['IsBefore'] },
    value: { oneOf: [{ type: 'number' }, { type: 'string' }] },
  },
  ['operator', 'value']
)

export class IsBeforeDateFilter extends BaseFilter {
  readonly value: string

  constructor(field: string, value: number | string) {
    super(field)
    if (typeof value === 'number') {
      this.value = new Date(value).toISOString()
    } else {
      this.value = value
    }
  }

  toDto(): IsBeforeDateFilterDto {
    return {
      field: this.field,
      operator: 'IsBefore',
      value: this.value,
    }
  }
}
