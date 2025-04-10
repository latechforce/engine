import {
  RunJavascriptCodeAction,
  type RunJavascriptCodeActionConfig,
  type RunJavascriptCodeActionServices,
} from '/domain/entities/Action/services/code/RunJavascript'

export type RunJavascriptCodeActionMapperServices = RunJavascriptCodeActionServices

export class RunJavascriptCodeActionMapper {
  static toEntity = (
    config: RunJavascriptCodeActionConfig,
    services: RunJavascriptCodeActionMapperServices
  ): RunJavascriptCodeAction => {
    return new RunJavascriptCodeAction(config, services)
  }
}
