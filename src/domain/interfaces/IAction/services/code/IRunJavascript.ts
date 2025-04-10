import type { RunJavascriptCodeActionConfig } from '/domain/entities/Action/services/code/RunJavascript'

export interface IRunJavascriptCodeAction extends RunJavascriptCodeActionConfig {
  service: 'Code'
  action: 'RunJavascript'
}
