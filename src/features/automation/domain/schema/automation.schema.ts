// Third-party imports
import { z } from 'zod/v4'
import pkg from 'package.json'

// Action domain imports
import { actionSchema } from '../../../action/domain/schema/action.schema'

// Trigger domain imports
import { triggerSchema } from '../../../trigger/domain/schema/trigger.schema'

export const automationSchema = z
  .object({
    id: z
      .number()
      .int()
      .positive()
      .describe('Unique identifier for the automation')
      .meta({
        title: 'Automation ID',
        readOnly: true,
        examples: [1, 2, 100],
      }),
    name: z
      .string()
      .trim()
      .min(3)
      .describe('Name of the automation workflow')
      .meta({
        title: 'Automation Name',
        placeholder: 'Enter automation name',
        examples: ['Send Welcome Email', 'Process Order', 'Sync Customer Data'],
      }),
    description: z
      .string()
      .trim()
      .optional()
      .describe('Detailed description of what this automation does')
      .meta({
        title: 'Description',
        placeholder: 'Describe what this automation does',
        examples: [
          'Sends a welcome email when a new user signs up',
          'Processes incoming orders and updates inventory',
        ],
        uiSchema: { 'ui:widget': 'textarea', 'ui:rows': 2 },
      }),
    editUrl: z
      .url()
      .optional()
      .describe('URL to edit this automation in an external tool')
      .meta({
        title: 'Edit URL',
        placeholder: 'https://example.com/automations/edit/123',
        examples: ['https://zapier.com/app/editor/123456', 'https://make.com/scenario/edit/789'],
        uiSchema: { 'ui:widget': 'uri' },
      }),
    trigger: triggerSchema.describe('The event or condition that starts this automation').meta({
      title: 'Trigger',
      uiSchema: { 'ui:widget': 'trigger-selector' },
    }),
    actions: z
      .array(actionSchema)
      .default([])
      .describe('Sequence of actions to execute when triggered')
      .meta({
        title: 'Actions',
        uiSchema: {
          'ui:ArrayFieldTemplate': 'collapsible',
          'ui:options': { orderable: true, removable: true, addable: true },
        },
      }),
  })
  .strict()
  .meta({
    title: 'Automation Workflow',
    description:
      'A workflow that executes a series of actions when triggered by specific events or conditions',
    version: pkg.version,
  })

export type AutomationSchema = z.infer<typeof automationSchema>
