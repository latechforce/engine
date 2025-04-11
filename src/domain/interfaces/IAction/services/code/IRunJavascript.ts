import type { RunJavascriptCodeActionConfig } from '/domain/entities/Action/services/code/RunJavascript'

/**
 * Interface for running JavaScript code in an automation
 * @title Run JavaScript Code Action
 * @description Executes JavaScript code with optional input and environment variables
 *
 * @example
 * {
 *   service: 'Code',
 *   action: 'RunJavascript',
 *   code: 'return { result: input.value * 2 }',
 *   input: { value: 5 },
 *   env: {
 *     API_KEY: '{{secrets.apiKey}}'
 *   }
 * }
 *
 * @property {string} service - Always 'Code' for code execution actions
 * @property {string} action - Always 'RunJavascript' for JavaScript execution
 * @property {string} code - The JavaScript code to execute
 * @property {object} [input] - Optional input data passed to the code
 * @property {object} [env] - Optional environment variables available to the code
 */
export interface IRunJavascriptCodeAction extends RunJavascriptCodeActionConfig {
  service: 'Code'
  action: 'RunJavascript'
}
