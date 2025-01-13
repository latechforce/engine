import { log, onBunErrors } from '../helpers'

log('Start building server...')

const externals: string[] = [
  'ajv',
  'fs-extra',
  'debug',
  'express',
  'cors',
  'helmet',
  'cookie-parser',
  'better-sqlite3',
  'pg',
  'pg-boss',
  'handlebars',
  'uuid',
  'nanoid',
  '@sentry/node',
  '@sentry/profiling-node',
  'winston',
  'winston-elasticsearch',
  '@elastic/elasticsearch',
  'dotenv',
  'xml2js',
  'date-fns',
  'googleapis',
  'airtable',
  'typescript',
  'axios',
  '@notionhq/client',
  'lodash',
  '@ngrok/ngrok',
]

const entrypoints: string[] = [
  'index.ts',
  'infrastructure/instrument/index.ts',
  'bun.js',
  'node.js',
]

const { success, logs } = await Bun.build({
  target: 'node',
  entrypoints: entrypoints.map((entry) => 'src/' + entry),
  outdir: 'dist',
  external: externals,
})
if (!success) onBunErrors('js', logs)

log('✓ Server builded')
