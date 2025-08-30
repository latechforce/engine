import { appSchema } from '../src/features/app/domain/schema/app.schema'
import { automationSchema } from '../src/features/automation/domain/schema/automation.schema'
import { tableSchema } from '../src/features/table/domain/schema/table.schema'
import { connectionSchema } from '../src/features/connection/domain/schema/connection.schema'
import { formSchema } from '../src/features/form/domain/schema/form.schema'
import { bucketSchema } from '../src/features/bucket/domain/schema/bucket.schema'
import { metadataSchema } from '../src/features/app/domain/schema/metadata.schema'
import pkg from '../package.json'

import fs from 'fs'
import { join } from 'path'
import { z } from 'zod/v4'

const schemaPath = join(__dirname, '..', 'schema', pkg.version)

if (!fs.existsSync(schemaPath)) {
  fs.mkdirSync(schemaPath, { recursive: true })
}

const schemas = [
  { name: 'app', schema: appSchema },
  { name: 'metadata', schema: metadataSchema },
  { name: 'automation', schema: automationSchema },
  { name: 'table', schema: tableSchema },
  { name: 'connection', schema: connectionSchema },
  { name: 'form', schema: formSchema },
  { name: 'bucket', schema: bucketSchema },
]

schemas.forEach(({ name, schema }) => {
  const filePath = join(schemaPath, `${name}.schema.json`)
  const jsonSchema = z.toJSONSchema(schema)
  fs.writeFileSync(filePath, JSON.stringify(jsonSchema, null, 2))
  console.log(`Write ${filePath}`)
})
