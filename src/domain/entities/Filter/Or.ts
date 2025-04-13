import type { SchemaValidatorJson } from '/domain/services/SchemaValidator'
import { type Filter, type FilterDto } from '.'

export type OrFilterConfig = {
  or: FilterDto[]
}

export const orFilterSchema: SchemaValidatorJson = {
  type: 'object',
  properties: {},
  required: ['or'],
  additionalProperties: false,
}

export class OrFilter {
  constructor(public filters: Filter[]) {}

  toDto(): OrFilterConfig {
    return { or: this.filters.map((filter) => filter.toDto()) }
  }
}
