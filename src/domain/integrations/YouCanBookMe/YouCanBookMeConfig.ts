import type { BaseConfig } from '../base'

export interface YouCanBookMeConfig extends BaseConfig {
  user: {
    username: string
    password: string
  }
}
