import type { SchemaValidatorJson } from '/domain/services/SchemaValidator'

export type BaseFilterProps = {
  field: string
}

export function buildFilterSchema(
  properties: SchemaValidatorJson['properties'],
  required: SchemaValidatorJson['required'] = []
): SchemaValidatorJson {
  return {
    type: 'object',
    properties: {
      field: { type: 'string' },
      ...properties,
    },
    required: ['field', ...required],
    additionalProperties: false,
  }
}

export class BaseFilter {
  constructor(readonly field: string) {}

  toDto(): BaseFilterProps {
    throw new Error('Method not implemented.')
  }
}
