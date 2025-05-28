import { Form } from '@/client/component/form.component'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './layout'
import { TypographyH1, TypographyP } from '../ui/typography.ui'
import { client } from '@/client/lib/client.lib'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import type { FormDto } from '@/application/dto/form.dto'
import { Suspense } from 'react'
import { FormSkeleton } from '../ui/form.ui'

const FormDataPage = () => {
  const { path } = formRoute.useParams()
  const { data } = useSuspenseQuery(formQueryOptions(path))

  if ('error' in data) return <div>Error: {data.error}</div>

  const onSubmit = async (values: unknown) => {
    console.log(values)
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-8">
        <div className="mb-2">
          <TypographyH1>{data.form.title}</TypographyH1>
        </div>
        <div className="text-gray-600">
          <TypographyP>{data.form.description}</TypographyP>
        </div>
      </div>
      <div className="p-8">
        <Form
          inputs={data.form.inputs}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}

const FormPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-3xl px-4">
        <Suspense fallback={<FormSkeleton />}>
          <FormDataPage />
        </Suspense>
      </div>
    </div>
  )
}

const formQueryOptions = (path: string) =>
  queryOptions<{ form: FormDto } | { error: string }>({
    queryKey: ['formData'],
    queryFn: async () => {
      const response = await client.form[':path'].$get({ param: { path } })
      const data = await response.json()
      return data
    },
  })

export const formRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/form/$path',
  component: FormPage,
  loader: async ({ context: { queryClient }, params: { path } }) =>
    queryClient.ensureQueryData(formQueryOptions(path)),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData && 'form' in loaderData ? `${loaderData.form.title} - Form` : '',
      },
      {
        name: 'description',
        content: loaderData && 'form' in loaderData ? loaderData.form.description : '',
      },
    ],
  }),
})
