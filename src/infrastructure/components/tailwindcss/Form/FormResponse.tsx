import type { FormResponseProps } from '/domain/components/Form/FormResponse'

export const FormResponse = ({ id, message }: FormResponseProps) => {
  return (
    <div id={`${id}-form-container`} className="mx-auto max-w-xl">
      <div className="text-center">
        <p className="mt-10 text-gray-600 dark:text-neutral-400">{message}</p>
      </div>
    </div>
  )
}
