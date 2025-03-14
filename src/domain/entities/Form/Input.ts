import type { ConfigError } from '../Error/Config'

export interface InputConfig {
  field: string
  label?: string
  description?: string
  placeholder?: string
  required?: boolean
}

export class Input {
  constructor(public config: InputConfig) {}

  validateConfig = async (): Promise<ConfigError[]> => {
    return []
  }
}
