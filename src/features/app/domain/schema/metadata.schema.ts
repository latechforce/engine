import { z } from 'zod/v4'
import pkg from '../../../../../package.json'

export const metadataSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3)
      .default('My app')
      .describe('The name of your application')
      .meta({
        title: 'Application Name',
        examples: ['My E-commerce App', 'Customer Portal', 'Admin Dashboard'],
        placeholder: 'Enter your application name',
      }),
    description: z
      .string()
      .trim()
      .min(1)
      .default('My app description')
      .describe('A brief description of what your application does')
      .meta({
        title: 'Application Description',
        examples: ['A platform for managing customer orders', 'Internal tool for data analytics'],
        placeholder: 'Describe your application purpose',
        uiSchema: { 'ui:widget': 'textarea', 'ui:rows': 3 },
      }),
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
      .default('globe')
      .describe('The icon that represents your application')
      .meta({
        title: 'Application Icon',
        enumNames: [
          'Shopping Cart',
          'Chart Bar',
          'Users',
          'File Text',
          'Calendar',
          'Mail',
          'Database',
          'Cloud',
          'Shield',
          'Globe',
          'Play Circle',
          'Settings',
          'Briefcase',
          'Heart',
          'Book',
          'Dollar Sign',
          'Truck',
          'Home',
          'Zap',
          'Package',
        ],
        placeholder: 'Select an icon',
      }),
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
      .default('blue')
      .describe('The primary color theme for your application')
      .meta({
        title: 'Theme Color',
        enumNames: [
          'Blue',
          'Emerald',
          'Violet',
          'Amber',
          'Red',
          'Cyan',
          'Pink',
          'Indigo',
          'Lime',
          'Orange',
          'Teal',
          'Purple',
        ],
        placeholder: 'Select a color theme',
      }),
    appVersion: z
      .string()
      .trim()
      .min(5)
      .default('1.0.0')
      .describe('The version of your application following semantic versioning')
      .meta({
        title: 'Application Version',
        examples: ['1.0.0', '2.1.3', '0.5.0-beta'],
        placeholder: '1.0.0',
        pattern: '^\\d+\\.\\d+\\.\\d+(-[a-zA-Z0-9]+)?$',
      }),
    schemaVersion: z
      .string()
      .trim()
      .min(5)
      .default('latest')
      .describe('The version of the schema format being used')
      .meta({
        title: 'Schema Version',
        examples: ['latest', '1.0.0', '2.0.0'],
        placeholder: 'latest',
        readOnly: true,
      }),
  })
  .strict()
  .meta({
    title: 'Application Metadata',
    description: 'Essential information about your application',
    version: pkg.version,
  })

export type MetadataSchemaValidated = z.infer<typeof metadataSchema>
export type MetadataSchema = Partial<MetadataSchemaValidated>
