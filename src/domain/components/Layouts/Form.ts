export interface FormProps extends React.PropsWithChildren {
  id: string
  title: string
  submitLabel: string
  description?: string
  formClientProps?: Record<string, string>
}

export type Form = React.ComponentType<FormProps>
