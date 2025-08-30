import { z } from 'zod/v4'
import pkg from '../../../../package.json'

import { calendlyConnectionSchema } from '../productivity/calendly/calendly-connection.schema'
import { googleConnectionSchema } from '../communication/google/google-connection.schema'
import { airtableConnectionSchema } from '../productivity/airtable/airtable-connection.schema'
import { facebookConnectionSchema } from '../social/facebook/facebook-connection.schema'
import { linkedinConnectionSchema } from '../social/linkedin/linkedin-connection.schema'
import { notionConnectionSchema } from '../productivity/notion/notion-connection.schema'

export const connectionSchema = z
  .union([
    calendlyConnectionSchema,
    airtableConnectionSchema,
    googleConnectionSchema,
    linkedinConnectionSchema,
    facebookConnectionSchema,
    notionConnectionSchema,
  ])
  .describe('Configuration for connecting to external services and APIs')
  .meta({
    title: 'Service Connection',
    description:
      'Connect your application to external services like Calendly, Airtable, Google, LinkedIn, or Facebook',
    discriminator: 'type',
    uiSchema: {
      'ui:widget': 'connection-selector',
      'ui:options': {
        showIcon: true,
        groupBy: 'category',
      },
    },
    version: pkg.version,
  })

export type ConnectionSchema = z.infer<typeof connectionSchema>
