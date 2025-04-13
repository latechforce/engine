import type { ActionServiceSchema } from './Services'
import type { ActionIntegrationSchema } from './Integrations'

/**
 * Action type union
 * @title Action
 * @description Union type of all possible actions that can be performed in automations
 *
 * @example
 * {
 *   service: 'Database',
 *   action: 'ReadRecord',
 *   table: 'users',
 *   id: 'user_123'
 * }
 */
export type ActionSchema = ActionIntegrationSchema | ActionServiceSchema
