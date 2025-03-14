import type { FormProps } from '/domain/entities/Form'

export const Form = ({ title, description, action, submitLabel, children }: FormProps) => {
  return (
    <div>
      {title ? <h1 className="text-2xl font-bold">{title}</h1> : null}
      {description ? <p>{description}</p> : null}
      <form action={action} method="POST">
        {children}
        <button type="submit">{submitLabel}</button>
      </form>
    </div>
  )
}
