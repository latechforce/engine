import { appSchema } from '../src/features/app/domain/schema/app.schema'
import { automationSchema } from '../src/features/automation/domain/schema/automation.schema'
import { tableSchema } from '../src/features/table/domain/schema/table.schema'
import { connectionSchema } from '../src/features/connection/domain/schema/connection.schema'
import { formSchema } from '../src/features/form/domain/schema/form.schema'
import { bucketSchema } from '../src/features/bucket/domain/schema/bucket.schema'
import { metadataSchema } from '../src/features/app/domain/schema/metadata.schema'
import pkg from 'package.json'

import fs from 'fs'
import { join } from 'path'
import { z } from 'zod/v4'

const schemaPath = join(__dirname, '..', 'schema', pkg.version)

if (!fs.existsSync(schemaPath)) {
  fs.mkdirSync(schemaPath)
}

fs.writeFileSync(
  join(schemaPath, 'app.schema.json'),
  JSON.stringify(z.toJSONSchema(appSchema), null, 2)
)

fs.writeFileSync(
  join(schemaPath, 'metadata.schema.json'),
  JSON.stringify(z.toJSONSchema(metadataSchema), null, 2)
)

fs.writeFileSync(
  join(schemaPath, 'automation.schema.json'),
  JSON.stringify(z.toJSONSchema(automationSchema), null, 2)
)

fs.writeFileSync(
  join(schemaPath, 'table.schema.json'),
  JSON.stringify(z.toJSONSchema(tableSchema), null, 2)
)

fs.writeFileSync(
  join(schemaPath, 'connection.schema.json'),
  JSON.stringify(z.toJSONSchema(connectionSchema), null, 2)
)

fs.writeFileSync(
  join(schemaPath, 'form.schema.json'),
  JSON.stringify(z.toJSONSchema(formSchema), null, 2)
)

fs.writeFileSync(
  join(schemaPath, 'bucket.schema.json'),
  JSON.stringify(z.toJSONSchema(bucketSchema), null, 2)
)
