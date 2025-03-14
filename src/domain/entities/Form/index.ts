import type { InputConfig } from '../Input'
import type { ConfigError } from '/domain/entities/Error/Config'

export interface FormConfig {
  name: string
  title: string
  description: string
  table: string
  inputs: InputConfig[]
}

export class Form {
  constructor(_config: FormConfig) {}

  init = async () => {}

  validateConfig = async (): Promise<ConfigError[]> => {
    return []
  }
}
