import type { AutomationConfig } from '../entities/Automation'
import type { IAction } from './IAction'
import type { ITrigger } from './ITrigger'

export interface IAutomation extends AutomationConfig {
  trigger: ITrigger
  actions: IAction[]
}
