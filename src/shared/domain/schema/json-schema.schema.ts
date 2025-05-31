import { z } from 'zod/v4'

// SchemaObject Types
const SchemaObjectTypeName = z.enum([
  'string',
  'number',
  'integer',
  'boolean',
  'object',
  'array',
  'null',
])

const SchemaObjectDefinition: z.ZodTypeAny = z.lazy(() =>
  z.union([
    SchemaObjectObject,
    z.boolean(), // Schema can also be a simple `true` or `false`
  ])
)

const SchemaObjectObject: z.ZodTypeAny = z
  .object({
    type: z.union([SchemaObjectTypeName, z.array(SchemaObjectTypeName)]).optional(),

    // Validation keywords
    properties: z.record(z.string(), SchemaObjectDefinition).optional(),
    required: z.array(z.string()).optional(),
    items: z.union([SchemaObjectDefinition, z.array(SchemaObjectDefinition)]).optional(),
    additionalProperties: z.union([SchemaObjectDefinition, z.boolean()]).optional(),
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
    allOf: z.array(SchemaObjectDefinition).optional(),
    anyOf: z.array(SchemaObjectDefinition).optional(),
    oneOf: z.array(SchemaObjectDefinition).optional(),
    not: SchemaObjectDefinition.optional(),
  })
  .meta({
    title: 'JSON Schema',
    description: 'The JSON Schema is a schema that describes the structure of the data',
  })

export const jsonSchemaSchema = SchemaObjectObject

export type JSONSchemaSchema = z.infer<typeof SchemaObjectObject>
