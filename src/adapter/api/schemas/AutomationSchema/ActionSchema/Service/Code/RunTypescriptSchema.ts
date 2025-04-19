import type { RunTypescriptCodeActionConfig } from '/domain/entities/Action/services/code/RunTypescript'

/**
 * Interface for running TypeScript code
 * @title Run TypeScript
 * @description Executes TypeScript code with the specified input
 */
export interface RunTypescriptCodeServiceActionAutomationSchema {
  /**
   * The name for this action
   * @title Name
   * @description The name for this action
   */
  name: RunTypescriptCodeActionConfig['name']
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
  action: 'RunTypescript'
  /**
   * The code for this action
   * @title Code
   * @description The code for this action
   */
  code: RunTypescriptCodeActionConfig['code']
  /**
   * The input for this action
   * @title Input
   * @description The input for this action
   */
  input?: RunTypescriptCodeActionConfig['input']
  /**
   * The environment variables for this action
   * @title Environment Variables
   * @description The environment variables for this action
   */
  env?: RunTypescriptCodeActionConfig['env']
}
