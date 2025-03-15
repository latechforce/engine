import type { FormProps, FormResponseProps } from '/domain/entities/Form'

export const FormContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="w-full h-screen bg-gray-50 dark:bg-neutral-800">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">{children}</div>
    </div>
  )
}

export const FormResponse = ({ id, message }: FormResponseProps) => {
  return (
    <div id={`${id}-form-container`} className="max-w-xl mx-auto">
      <div className="text-center">
        <p className="mt-10 text-gray-600 dark:text-neutral-400">{message}</p>
      </div>
    </div>
  )
}

export const Form = ({
  id,
  title,
  description,
  submitLabel,
  children,
  formClientProps = {},
}: FormProps) => {
  return (
    <FormContainer>
      <div id={`${id}-form-container`} className="max-w-xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">{title}</h1>
          {description ? (
            <p className="mt-1 text-gray-600 dark:text-neutral-400">{description}</p>
          ) : null}
        </div>
        <div className="mt-12">
          <form {...formClientProps}>
            <div className="grid gap-4 lg:gap-6">
              {children}
              <div className="mt-6 grid">
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {submitLabel}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </FormContainer>
  )
}
