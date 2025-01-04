import type { IAction } from './IAction'
import type { ITrigger } from './ITrigger'

export interface IAutomation {
  name: string
  trigger: ITrigger
  actions: IAction[]
}
