import type { RunTypescriptCodeActionConfig } from '/domain/entities/Action/services/code/RunTypescript'

/**
 * Interface for running TypeScript code
 * @title Run TypeScript Code Action
 * @description Executes TypeScript code with the specified input
 *
 * @example
 * {
 *   service: 'Code',
 *   action: 'RunTypescript',
 *   code: 'return { result: input.value * 2 }',
 *   input: {
 *     value: 5
 *   }
 * }
 */
export interface RunTypescriptCodeActionSchema extends RunTypescriptCodeActionConfig {
  service: 'Code'
  action: 'RunTypescript'
}
