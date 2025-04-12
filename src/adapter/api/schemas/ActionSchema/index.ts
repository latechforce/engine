import type { ActionServiceSchema } from './services'
import type { ActionIntegrationSchema } from './integrations'

/**
 * Action type union
 * @title Action types
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
