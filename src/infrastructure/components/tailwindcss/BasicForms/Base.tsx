type LabelProps = {
  label: string
  field: string
  required?: boolean
}

export const Label = ({ label, field, required = false }: LabelProps) => {
  return (
    <label htmlFor={field} className="mb-2 block text-sm font-medium text-gray-700 dark:text-white">
      {label}
      {required ? <span className="text-red-500"> *</span> : null}
    </label>
  )
}

type DescriptionProps = {
  description: string
}

export const Description = ({ description }: DescriptionProps) => {
  return <p className="mb-2 text-sm text-gray-500 dark:text-neutral-500">{description}</p>
}

type ContextProps = {
  label?: string
  description?: string
  field: string
  required?: boolean
  children: React.ReactNode
}

export const Context = ({ label, description, field, required, children }: ContextProps) => {
  return (
    <div>
      {label && label !== '' ? <Label label={label} field={field} required={required} /> : null}
      {description ? <Description description={description} /> : null}
      {children}
    </div>
  )
}
