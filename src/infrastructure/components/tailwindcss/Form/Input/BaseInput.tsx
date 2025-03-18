type InputLabelProps = {
  label: string
  field: string
}

export const InputLabel = ({ label, field }: InputLabelProps) => {
  return (
    <label htmlFor={field} className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
      {label}
    </label>
  )
}

type InputDescriptionProps = {
  description: string
}

export const InputDescription = ({ description }: InputDescriptionProps) => {
  return <p className="mb-2 text-sm text-gray-500 dark:text-neutral-500">{description}</p>
}
