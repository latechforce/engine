import type { RunJavascriptCodeActionConfig } from '/domain/entities/Action/services/code/RunJavascript'

/**
 * Interface for running JavaScript code
 * @title Run JavaScript
 * @description Executes JavaScript code with the specified input
 */
export interface RunJavascriptCodeServiceActionAutomationSchema {
  /**
   * The name for this action
   * @title Name
   * @description The name for this action
   */
  name: RunJavascriptCodeActionConfig['name']
  /**
   * The service type for this action
   * @title Service
   * @description The service type for this action
   */
  service: 'Code'
  /**
   * The action type for this action
   * @title Action
   * @description The action type for this action
   */
  action: 'RunJavascript'
  /**
   * The code for this action
   * @title Code
   * @description The code for this action
   */
  code: RunJavascriptCodeActionConfig['code']
  /**
   * The input for this action
   * @title Input
   * @description The input for this action
   */
  input?: RunJavascriptCodeActionConfig['input']
  /**
   * The environment variables for this action
   * @title Environment Variables
   * @description The environment variables for this action
   */
  env?: RunJavascriptCodeActionConfig['env']
}
