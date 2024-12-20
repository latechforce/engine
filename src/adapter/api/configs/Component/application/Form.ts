import type { RequestMethod } from '@domain/entities/Request'
import type { Config as Title } from '../content/Title'
import type { Config as Paragraph } from '../content/Paragraph'
import type { Config as Button } from '../base/Button'
import type { Config as Input } from '../base/Input'
import type { Base } from '../base/Base'

export interface Config extends Base {
  action: string
  method?: RequestMethod
  source?: string
  inputs: Input[]
  buttons: Button[]
  title?: Title
  paragraph?: Paragraph
  successMessage?: string
}

export interface Form extends Config {
  component: 'Form'
}
