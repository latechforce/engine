type InputLabelProps = {
  label: string
  field: string
  required?: boolean
}

export const InputLabel = ({ label, field, required = false }: InputLabelProps) => {
  return (
    <label htmlFor={field} className="mb-2 block text-sm font-medium text-gray-700 dark:text-white">
      {label}
      {required ? <span className="text-red-500"> *</span> : null}
    </label>
  )
}

type InputDescriptionProps = {
  description: string
}

export const InputDescription = ({ description }: InputDescriptionProps) => {
  return <p className="mb-2 text-sm text-gray-500 dark:text-neutral-500">{description}</p>
}

type InputContextProps = {
  label?: string
  description?: string
  field: string
  required?: boolean
  children: React.ReactNode
}

export const InputContext = ({
  label,
  description,
  field,
  required,
  children,
}: InputContextProps) => {
  return (
    <div>
      <InputLabel label={label ?? field} field={field} required={required} />
      {description ? <InputDescription description={description} /> : null}
      {children}
    </div>
  )
}
