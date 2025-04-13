import type { RunJavascriptCodeServiceActionAutomationSchema } from './RunJavascriptSchema'
import type { RunTypescriptCodeServiceActionAutomationSchema } from './RunTypescriptSchema'

/**
 * The schema for the Code action.
 * @title Code
 * @description The Code action.
 */
export type CodeServiceActionAutomationSchema =
  | RunJavascriptCodeServiceActionAutomationSchema
  | RunTypescriptCodeServiceActionAutomationSchema
