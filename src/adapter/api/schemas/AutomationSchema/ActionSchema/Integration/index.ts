import type { GoCardlessIntegrationActionAutomationSchema } from './GoCardless'
import type { GoogleIntegrationActionAutomationSchema } from './Google'
import type { NotionIntegrationActionAutomationSchema } from './Notion'
import type { PappersIntegrationActionAutomationSchema } from './Pappers'
import type { QontoIntegrationActionAutomationSchema } from './Qonto'

/**
 * Integration action type union
 * @title Integration
 * @description Union type of all possible integration actions that can be performed in automations
 * @example
 * {
 *   service: 'Integration',
 *   action: 'GetCompany',
 *   companyId: '123'
 * }
 */
export type IntegrationActionAutomationSchema =
  | PappersIntegrationActionAutomationSchema
  | QontoIntegrationActionAutomationSchema
  | NotionIntegrationActionAutomationSchema
  | GoogleIntegrationActionAutomationSchema
  | GoCardlessIntegrationActionAutomationSchema
