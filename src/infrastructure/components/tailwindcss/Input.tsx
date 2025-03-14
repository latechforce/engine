import type { InputProps } from '/domain/entities/Form/Input'

export const Input = ({ field, type, label, description, placeholder, required }: InputProps) => {
  return (
    <div>
      {label ? <label htmlFor={field}>{label}</label> : null}
      {description ? <p>{description}</p> : null}
      <input type={type} name={field} placeholder={placeholder} required={!!required} />
    </div>
  )
}
