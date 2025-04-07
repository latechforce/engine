import type { FormProps } from '/domain/components/Form'

export const FormContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-neutral-800">
      <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">{children}</div>
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
      <div id={`${id}-form-container`} className="mx-auto max-w-xl">
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
                  className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
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
