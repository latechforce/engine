import type { RunJavascriptCodeActionConfig } from '/domain/entities/Action/services/code/RunJavascript'

/**
 * Interface for running JavaScript code
 * @title Run JavaScript Code Action
 * @description Executes JavaScript code with the specified input
 *
 * @example
 * {
 *   service: 'Code',
 *   action: 'RunJavascript',
 *   code: 'return { result: input.value * 2 }',
 *   input: {
 *     value: 5
 *   }
 * }
 */
export interface RunJavascriptCodeActionSchema extends RunJavascriptCodeActionConfig {
  service: 'Code'
  action: 'RunJavascript'
}
