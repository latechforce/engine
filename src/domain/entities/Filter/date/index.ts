import type { FilterWithOperatorConfig } from '..'
import {
  IsAfterDateFilter,
  type IsAfterDateFilterConfig,
  type IsAfterDateFilterDto,
} from './IsAfter'
import {
  IsBeforeDateFilter,
  type IsBeforeDateFilterConfig,
  type IsBeforeDateFilterDto,
} from './IsBefore'
import {
  OnOrAfterDateFilter,
  onOrAfterDateFilterSchema,
  type OnOrAfterDateFilterConfig,
  type OnOrAfterDateFilterDto,
} from './OnOrAfter'

export type DateFilterConfig =
  | OnOrAfterDateFilterConfig
  | IsAfterDateFilterConfig
  | IsBeforeDateFilterConfig

export type DateFilterDto = OnOrAfterDateFilterDto | IsAfterDateFilterDto | IsBeforeDateFilterDto

export const dateFilterSchemas = [onOrAfterDateFilterSchema]

export type DateFilter = OnOrAfterDateFilter | IsBeforeDateFilter | IsAfterDateFilter

export const isDateFilter = (config: FilterWithOperatorConfig): config is DateFilterConfig => {
  return (
    config.operator === 'OnOrAfter' ||
    config.operator === 'IsAfter' ||
    config.operator === 'IsBefore'
  )
}

export class DateFilterMapper {
  static toEntity = (config: DateFilterConfig): DateFilter => {
    const { operator, field, value } = config
    switch (operator) {
      case 'OnOrAfter':
        return new OnOrAfterDateFilter(field, value)
      case 'IsAfter':
        return new IsAfterDateFilter(field, value)
      case 'IsBefore':
        return new IsBeforeDateFilter(field, value)
    }
  }
}
