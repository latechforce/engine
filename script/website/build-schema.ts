import { appValidator } from '@/domain/schema/app.schema'
import fs from 'fs'
import { join } from 'path'
import { z } from 'zod/v4'

const websiteStaticPath = join(__dirname, '../..', 'website', 'static')

function createAppJsonSchema() {
  const schemaPath = join(websiteStaticPath, 'schema', 'app.schema.json')
  const schema = z.toJSONSchema(appValidator)
  fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2))
}

createAppJsonSchema()
