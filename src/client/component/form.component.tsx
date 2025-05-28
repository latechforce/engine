import { useForm, type AnyFieldApi } from '@tanstack/react-form'

import { FormDescription, FormItem, FormLabel, FormMessage } from '@/client/ui/form.ui'
import { Input } from '../ui/input.ui'
import { Button } from '../ui/button.ui'
import type { InputDto } from '@/application/dto/input.dto'
import { Textarea } from '../ui/textarea.ui'
import { Checkbox } from '../ui/checkbox.ui'
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select.ui'
import { Select } from '../ui/select.ui'

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

function FormInput({ field, input }: { field: AnyFieldApi; input: InputDto }) {
  const props = {
    id: field.name,
    name: field.name,
    value: String(field.state.value ?? ''),
    onBlur: field.handleBlur,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>) =>
      field.handleChange(e.target.value),
  }
  const textProps = {
    required: input.required,
    placeholder: 'placeholder' in input ? input.placeholder : undefined,
    defaultValue: 'defaultValue' in input ? String(input.defaultValue) : undefined,
  }
  switch (input.type) {
    case 'single-line-text':
      return (
        <Input
          {...props}
          type="text"
          {...textProps}
        />
      )
    case 'phone':
      return (
        <Input
          {...props}
          type="tel"
          {...textProps}
        />
      )
    case 'email':
      return (
        <Input
          {...props}
          type="email"
          {...textProps}
        />
      )
    case 'url':
      return (
        <Input
          {...props}
          type="url"
          {...textProps}
        />
      )
    case 'long-text':
      return (
        <Textarea
          {...props}
          {...textProps}
        />
      )
    case 'checkbox':
      return (
        <Checkbox
          id={field.name}
          name={field.name}
          checked={field.state.value === true}
          onCheckedChange={(checked) => field.handleChange(checked)}
          required={input.required}
          defaultChecked={input.defaultValue === true}
          onBlur={field.handleBlur}
        />
      )
    case 'single-select':
      return (
        <Select
          name={field.name}
          onValueChange={(value) => field.handleChange(value)}
          defaultValue={input.defaultValue}
          required={input.required}
          value={field.state.value}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder={input.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {input.options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    case 'single-attachment':
      return (
        <Input
          {...props}
          type="file"
          required={input.required}
          accept={input.accept}
          onChange={(e) => {
            field.handleChange(e.target.files?.[0])
          }}
        />
      )
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
                      <FormInput
                        field={field}
                        input={input}
                      />
                      <FormDescription>{input.description}</FormDescription>
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
