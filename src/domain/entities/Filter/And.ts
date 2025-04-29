import type { SchemaValidatorJson } from '../../services/SchemaValidator'
import { type Filter, type FilterDto } from '.'

export type AndFilterConfig = {
  and: FilterDto[]
}

export const andFilterSchema: SchemaValidatorJson = {
  type: 'object',
  properties: {},
  required: ['and'],
  additionalProperties: false,
}

export class AndFilter {
  constructor(public filters: Filter[]) {}

  toDto(): AndFilterConfig {
    return { and: this.filters.map((filter) => filter.toDto()) }
  }
}
