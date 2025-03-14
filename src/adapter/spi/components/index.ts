import type { FormProps } from '/domain/entities/Form'
import type { InputProps } from '/domain/entities/Form/Input'
import type { PageProps } from '/domain/entities/Page'

export interface Components {
  Page: React.ComponentType<PageProps>
  Form: React.ComponentType<FormProps>
  Input: React.ComponentType<InputProps>
}
