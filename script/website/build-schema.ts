import { appSchema } from '../../src/features/app/domain/schema/app.schema'
import fs from 'fs'
import { join } from 'path'
import { z } from 'zod/v4'

const websiteStaticPath = join(__dirname, '../..', 'website', 'static')

function createAppJsonSchema() {
  const schemaPath = join(websiteStaticPath, 'schema', 'app.schema.json')
  const schema = z.toJSONSchema(appSchema)
  fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2))
}

createAppJsonSchema()
