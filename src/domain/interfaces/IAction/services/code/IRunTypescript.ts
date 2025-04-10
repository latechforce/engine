import type { RunTypescriptCodeActionConfig } from '/domain/entities/Action/services/code/RunTypescript'

export interface IRunTypescriptCodeAction extends RunTypescriptCodeActionConfig {
  service: 'Code'
  action: 'RunTypescript'
}
