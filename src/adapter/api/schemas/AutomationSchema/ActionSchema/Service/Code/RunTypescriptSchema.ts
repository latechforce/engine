import type { RunTypescriptCodeActionConfig } from '/domain/entities/Action/services/code/RunTypescript'

/**
 * Interface for running TypeScript code
 * @title Run TypeScript
 * @description Executes TypeScript code with the specified input
 */
export interface RunTypescriptCodeServiceActionAutomationSchema
  extends RunTypescriptCodeActionConfig {
  service: 'Code'
  action: 'RunTypescript'
}
