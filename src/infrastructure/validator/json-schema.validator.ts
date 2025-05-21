import { z } from 'zod/v4'

// JSONSchema7 Types
const JSONSchema7TypeName = z.enum([
  'string',
  'number',
  'integer',
  'boolean',
  'object',
  'array',
  'null',
])

const JSONSchema7Definition: z.ZodTypeAny = z.lazy(() =>
  z.union([
    JSONSchema7Object,
    z.boolean(), // Schema can also be a simple `true` or `false`
  ])
)

const JSONSchema7Object: z.ZodTypeAny = z
  .object({
    type: z.union([JSONSchema7TypeName, z.array(JSONSchema7TypeName)]).optional(),

    // Validation keywords
    properties: z.record(z.string(), JSONSchema7Definition).optional(),
    required: z.array(z.string()).optional(),
    items: z.union([JSONSchema7Definition, z.array(JSONSchema7Definition)]).optional(),
    additionalProperties: z.union([JSONSchema7Definition, z.boolean()]).optional(),
    enum: z.array(z.any()).optional(),
    const: z.any().optional(),

    // Metadata
    title: z.string().optional(),
    description: z.string().optional(),
    default: z.any().optional(),

    // Numeric constraints
    minimum: z.number().optional(),
    maximum: z.number().optional(),
    multipleOf: z.number().optional(),

    // String constraints
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
    pattern: z.string().optional(),

    // Array constraints
    minItems: z.number().optional(),
    maxItems: z.number().optional(),
    uniqueItems: z.boolean().optional(),

    // Combinators
    allOf: z.array(JSONSchema7Definition).optional(),
    anyOf: z.array(JSONSchema7Definition).optional(),
    oneOf: z.array(JSONSchema7Definition).optional(),
    not: JSONSchema7Definition.optional(),
  })
  .meta({
    title: 'JSON Schema',
    description: 'The JSON Schema is a schema that describes the structure of the data',
  })

export const jsonSchemaValidator = JSONSchema7Object
