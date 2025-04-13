import type { CreateClientQontoIntegrationActionAutomationSchema } from './CreateClientSchema'
import type { RetrieveAttachmentQontoIntegrationActionAutomationSchema } from './RetrieveAttachmentSchema'

/**
 * The schema for the Qonto integration action.
 * @title Qonto
 * @description The Qonto integration action.
 */
export type QontoIntegrationActionAutomationSchema =
  | CreateClientQontoIntegrationActionAutomationSchema
  | RetrieveAttachmentQontoIntegrationActionAutomationSchema
