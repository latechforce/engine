import type { RunTypescriptCodeActionConfig } from '/domain/entities/Action/services/code/RunTypescript'

/**
 * Interface for running TypeScript code in an automation
 * @title Run TypeScript Code Action
 * @description Executes TypeScript code with type checking and optional input
 *
 * @example
 * {
 *   service: 'Code',
 *   action: 'RunTypescript',
 *   code: `
 *     interface Input { value: number }
 *     interface Output { result: number }
 *     return { result: input.value * 2 } as Output
 *   `,
 *   input: { value: 5 }
 * }
 *
 * @property {string} service - Always 'Code' for code execution actions
 * @property {string} action - Always 'RunTypescript' for TypeScript execution
 * @property {string} code - The TypeScript code to execute
 * @property {object} [input] - Optional input data passed to the code
 */
export interface IRunTypescriptCodeAction extends RunTypescriptCodeActionConfig {
  service: 'Code'
  action: 'RunTypescript'
}
