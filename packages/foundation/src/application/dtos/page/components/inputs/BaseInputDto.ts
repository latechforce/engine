import { JSONSchemaType } from '@application/utils/SchemaValidator'

export interface BaseInputDto {
  field: string
  label?: string
}

export const BaseInputDtoSchema: JSONSchemaType<BaseInputDto> = {
  type: 'object',
  properties: {
    field: { type: 'string' },
    label: { type: 'string', nullable: true },
  },
  required: ['field'],
  additionalProperties: false,
}
