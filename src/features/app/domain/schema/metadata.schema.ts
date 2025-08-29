import { z } from 'zod/v4'
import pkg from 'package.json'

export const metadataSchema = z
  .object({
    name: z.string().trim().min(3).default('My app'),
    description: z.string().trim().min(1).default('My app description'),
    icon: z
      .enum([
        'shopping-cart',
        'chart-bar',
        'users',
        'file-text',
        'calendar',
        'mail',
        'database',
        'cloud',
        'shield',
        'globe',
        'play-circle',
        'settings',
        'briefcase',
        'heart',
        'book',
        'dollar-sign',
        'truck',
        'home',
        'zap',
        'package',
      ])
      .default('globe'),
    color: z
      .enum([
        'blue',
        'emerald',
        'violet',
        'amber',
        'red',
        'cyan',
        'pink',
        'indigo',
        'lime',
        'orange',
        'teal',
        'purple',
      ])
      .default('blue'),
    appVersion: z.string().trim().min(5).default('1.0.0'),
    schemaVersion: z.string().trim().min(5).default('latest'),
  })
  .strict()
  .meta({
    title: 'Metadata',
    version: pkg.version,
  })

export type MetadataSchemaValidated = z.infer<typeof metadataSchema>
export type MetadataSchema = Partial<MetadataSchemaValidated>
