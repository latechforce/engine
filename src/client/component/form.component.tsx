import { Field, useForm, type AnyFieldApi } from '@tanstack/react-form'

import { FormDescription, FormItem, FormLabel, FormMessage } from '@/client/ui/form.ui'
import { Input } from '../ui/input.ui'
import { Button } from '../ui/button.ui'

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

function FormInput({ type, formField }: { formField: AnyFieldApi; type: 'single-line-text' }) {
  switch (type) {
    case 'single-line-text':
      return (
        <Input
          id={formField.name}
          name={formField.name}
          value={String(formField.state.value ?? '')}
          onBlur={formField.handleBlur}
          onChange={(e) => formField.handleChange(e.target.value)}
        />
      )
    default:
      return null
  }
}

export type Field = {
  name: string
  label?: string
  description?: string
  type: 'single-line-text'
}

type FormProps = {
  fields: Field[]
  onSubmit: (values: unknown) => Promise<void>
}

export function Form({ fields, onSubmit }: FormProps) {
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
        <div>
          {fields.map((field) => {
            return (
              <form.Field
                key={field.name}
                name={field.name}
                children={(formField) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor={formField.name}>{field.label}</FormLabel>
                      <FormDescription>{field.description}</FormDescription>
                      <FormInput
                        formField={formField}
                        type={field.type}
                      />
                      <FormMessage>
                        <FormInfo formField={formField} />
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
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={!canSubmit}
              >
                {isSubmitting ? '...' : 'Submit'}
              </Button>
              <Button
                type="reset"
                onClick={() => form.reset()}
                variant="secondary"
              >
                Reset
              </Button>
            </div>
          )}
        />
      </form>
    </div>
  )
}
