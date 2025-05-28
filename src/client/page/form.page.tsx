import { Form, type Field } from '@/client/component/form.component'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './layout'
import { TypographyH1, TypographyP } from '../ui/typography.ui'

const fields: Field[] = [
  {
    name: 'name',
    label: 'Name',
    description: 'This is the name of the user',
    type: 'single-line-text',
  },
]

export const FormPage = () => {
  const onSubmit = async (values: unknown) => {
    console.log(values)
  }
  return (
    <div className="container mx-auto max-w-2xl p-4">
      <div className="mb-4">
        <TypographyH1>Contact Us</TypographyH1>
        <TypographyP>Please fill in the form below to contact us.</TypographyP>
      </div>
      <Form
        fields={fields}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export const formRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/form/$path',
  component: FormPage,
  head: () => ({
    title: 'Form',
    meta: [
      {
        name: 'description',
        content: `Form page`,
      },
    ],
  }),
})
