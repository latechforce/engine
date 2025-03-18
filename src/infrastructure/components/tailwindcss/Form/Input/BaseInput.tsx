type InputLabelProps = {
  label: string
  field: string
  required?: boolean
}

export const InputLabel = ({ label, field, required = false }: InputLabelProps) => {
  return (
    <label htmlFor={field} className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
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
      {label ? <InputLabel label={label} field={field} required={required} /> : null}
      {description ? <InputDescription description={description} /> : null}
      {children}
    </div>
  )
}
