import { Form } from '@/shared/interface/component/form.component'
import { createRoute, Navigate } from '@tanstack/react-router'
import { rootRoute } from '@/shared/interface/page/root.layout'
import { TypographyH1, TypographyP } from '@/shared/interface/ui/typography.ui'
import { client } from '@/shared/interface/lib/client.lib'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import type { GetFormDto } from '@/form/application/dto/get-form.dto'
import { Suspense } from 'react'
import { FormSkeleton } from '@/shared/interface/ui/form.ui'

const FormDataPage = () => {
  const { path } = formRoute.useParams()
  const { data } = useSuspenseQuery(formQueryOptions(path))

  if ('error' in data) {
    if (data.status === 404) {
      return <Navigate to="/404" />
    }
    return <div>Error: {data.error}</div>
  }

  const onSubmit = async (values: unknown) => {
    const { action } = data.form
    if (action.startsWith('/api/automations/')) {
      const path = action.replace('/api/automations/', '')
      const response = await client.automations[':path'].$post({
        param: { path },
        // @ts-expect-error TODO: fix this
        form: values,
      })
      console.log(response.status)
    } else if (data.form.action.startsWith('http')) {
      const response = await fetch(action, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(response.status)
    }
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
  queryOptions<GetFormDto | { error: string; status: number }>({
    queryKey: ['formData'],
    queryFn: async () => {
      const response = await client.forms[':path'].$get({ param: { path } })
      const data = await response.json()
      return { ...data, status: response.status }
    },
  })

export const formRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/forms/$path',
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
