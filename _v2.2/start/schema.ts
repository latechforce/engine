import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import env from './env.js'
import type { AppSchema } from '../app/schemas/app_schema.js'
import { appValidator } from '../app/validators/app_validators.js'

const appSchemaUrl = env.get('APP_SCHEMA_URL')

let appSchema: unknown

if (appSchemaUrl.startsWith('http://') || appSchemaUrl.startsWith('https://')) {
  appSchema = (await fetch(appSchemaUrl).then((res) => res.json())) as AppSchema
} else {
  const schemaPath = join(process.cwd(), appSchemaUrl)
  const fileContent = await readFile(schemaPath, 'utf-8')
  appSchema = JSON.parse(fileContent)
}

const appSchemaValidated: AppSchema = await appValidator.validate(appSchema)

export default appSchemaValidated
