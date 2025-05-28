import { useForm, type AnyFieldApi } from '@tanstack/react-form'

import { FormDescription, FormItem, FormLabel, FormMessage } from '@/client/ui/form.ui'
import { Input } from '../ui/input.ui'
import { Button } from '../ui/button.ui'
import type { InputDto } from '@/application/dto/input.dto'
import { Textarea } from '../ui/textarea.ui'

function FormInfo({ formField }: { formField: AnyFieldApi }) {
  return (
    <>
      {formField.state.meta.isTouched && !formField.state.meta.isValid ? (
        <em>{formField.state.meta.errors.join(',')}</em>
      ) : null}
      {formField.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

function FormInput({
  type,
  formField,
  required,
  placeholder,
}: {
  formField: AnyFieldApi
  type: InputDto['type']
  required?: boolean
  placeholder?: string
}) {
  const props = {
    id: formField.name,
    name: formField.name,
    value: String(formField.state.value ?? ''),
    onBlur: formField.handleBlur,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      formField.handleChange(e.target.value),
    required,
    placeholder,
  }
  switch (type) {
    case 'single-line-text':
      return (
        <Input
          {...props}
          type="text"
        />
      )
    case 'phone':
      return (
        <Input
          {...props}
          type="tel"
        />
      )
    case 'email':
      return (
        <Input
          {...props}
          type="email"
        />
      )
    case 'url':
      return (
        <Input
          {...props}
          type="url"
        />
      )
    case 'long-text':
      return <Textarea {...props} />
    default:
      return null
  }
}

type FormProps = {
  inputs: InputDto[]
  onSubmit: (values: unknown) => Promise<void>
}

export function Form({ inputs, onSubmit }: FormProps) {
  const form = useForm({
    onSubmit: async ({ value }) => {
      await onSubmit(value)
    },
  })

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className="space-y-4">
          {inputs.map((input) => {
            return (
              <form.Field
                key={input.name}
                name={input.name}
                children={(field) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>
                        <div className="flex w-full items-center justify-between gap-2">
                          <span>{input.label}</span>
                          {input.required ? <span className="text-red-500">*</span> : null}
                        </div>
                      </FormLabel>
                      <FormDescription>{input.description}</FormDescription>
                      <FormInput
                        formField={field}
                        type={input.type}
                        required={input.required}
                        placeholder={input.placeholder}
                      />
                      <FormMessage>
                        <FormInfo formField={field} />
                      </FormMessage>
                    </FormItem>
                  )
                }}
              />
            )
          })}
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="mt-4 flex justify-end gap-4">
              <Button
                type="submit"
                disabled={!canSubmit}
              >
                {isSubmitting ? '...' : 'Submit'}
              </Button>
            </div>
          )}
        />
      </form>
    </div>
  )
}
