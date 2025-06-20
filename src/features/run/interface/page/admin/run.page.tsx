import { queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { type GetRunDto } from '../../../application/dto/get-run.dto'
import { client } from '../../../../../shared/interface/lib/client.lib'
import Layout from '../../../../app/interface/page/admin/layout'
import { TypographyH3 } from '../../../../../shared/interface/ui/typography.ui'
import { createRoute, useParams } from '@tanstack/react-router'
import { TableSkeleton } from '../../../../../shared/interface/ui/table.ui'
import { Suspense } from 'react'
import { adminRoute } from '../../../../app/interface/page/router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../../shared/interface/ui/card.ui'
import { format } from 'date-fns'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../../shared/interface/ui/tabs.ui'
import { type Steps } from '../../../domain/value-object.ts/step.value-object'
import { type ActionStep } from '../../../domain/value-object.ts/action-step.value-object'
import type { RunDto } from '../../../application/dto/run.dto'

const runQueryOptions = (runId: string) =>
  queryOptions<GetRunDto>({
    queryKey: ['runData', runId],
    queryFn: () => client.runs[':runId'].$get({ param: { runId } }).then((res) => res.json()),
  })

type StepCardProps = {
  run: RunDto
  steps: Steps | ActionStep[]
  startIndex?: number
}

const StepsCards = ({ run, steps, startIndex = 0 }: StepCardProps) => {
  return steps.map((step, index) => {
    switch (step.type) {
      case 'trigger':
        return (
          <Card
            key={index}
            className="mb-4"
          >
            <CardHeader>
              <CardTitle>{index + 1}. Trigger</CardTitle>
              <CardDescription>
                {format(new Date(run.createdAt), 'dd/MM/yyyy HH:mm:ss')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="output">
                <TabsList>
                  <TabsTrigger value="schema">Schema</TabsTrigger>
                  <TabsTrigger value="output">Output Data</TabsTrigger>
                </TabsList>
                <TabsContent value="schema">
                  <pre className="text-muted-foreground mt-4 overflow-hidden text-sm break-words whitespace-pre-wrap">
                    {JSON.stringify(step.schema, null, 2)}
                  </pre>
                </TabsContent>
                <TabsContent value="output">
                  <pre className="text-muted-foreground mt-4 overflow-hidden text-sm break-words whitespace-pre-wrap">
                    {JSON.stringify(step.output ?? {}, null, 2)}
                  </pre>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )
      case 'action':
        return (
          <Card
            key={index + startIndex}
            className="mt-4"
          >
            <CardHeader>
              <CardTitle>
                {index + startIndex + 1}. {step.schema.name}
              </CardTitle>
              <CardDescription>
                {format(new Date(step.createdAt), 'dd/MM/yyyy HH:mm:ss')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="output">
                <TabsList>
                  <TabsTrigger value="schema">Schema</TabsTrigger>
                  <TabsTrigger value="input">Input Data</TabsTrigger>
                  <TabsTrigger value="output">Output Data</TabsTrigger>
                </TabsList>
                <TabsContent value="schema">
                  <pre className="text-muted-foreground mt-4 overflow-hidden text-sm break-words whitespace-pre-wrap">
                    {JSON.stringify(step.schema, null, 2)}
                  </pre>
                </TabsContent>
                <TabsContent value="input">
                  <pre className="text-muted-foreground mt-4 overflow-hidden text-sm break-words whitespace-pre-wrap">
                    {JSON.stringify(step.input, null, 2)}
                  </pre>
                </TabsContent>
                <TabsContent value="output">
                  <pre className="text-muted-foreground mt-4 overflow-hidden text-sm break-words whitespace-pre-wrap">
                    {JSON.stringify(step.output ?? {}, null, 2)}
                  </pre>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )
      case 'paths':
        return (
          <Card key={index + startIndex}>
            <CardHeader>
              <CardTitle>{index + startIndex + 1}. Paths</CardTitle>
              <CardDescription>
                {format(new Date(step.createdAt), 'dd/MM/yyyy HH:mm:ss')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={step.paths[0]!.schema.name}>
                <TabsList>
                  {step.paths.map((path, index) => (
                    <TabsTrigger
                      key={index}
                      value={path.schema.name}
                    >
                      {path.schema.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {step.paths.map((path, index) => (
                  <TabsContent
                    key={index}
                    value={path.schema.name}
                  >
                    <Card
                      key={index}
                      className="mt-4"
                    >
                      <CardHeader>
                        <CardTitle>1. {path.schema.name}</CardTitle>
                        <CardDescription>
                          {format(new Date(step.createdAt), 'dd/MM/yyyy HH:mm:ss')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Tabs defaultValue="output">
                          <TabsList>
                            <TabsTrigger value="schema">Schema</TabsTrigger>
                            <TabsTrigger value="input">Input Data</TabsTrigger>
                            <TabsTrigger value="output">Output Data</TabsTrigger>
                          </TabsList>
                          <TabsContent value="schema">
                            <pre className="text-muted-foreground mt-4 overflow-hidden text-sm break-words whitespace-pre-wrap">
                              {JSON.stringify(path.schema, null, 2)}
                            </pre>
                          </TabsContent>
                          <TabsContent value="input">
                            <pre className="text-muted-foreground mt-4 overflow-hidden text-sm break-words whitespace-pre-wrap">
                              {JSON.stringify(path.input, null, 2)}
                            </pre>
                          </TabsContent>
                          <TabsContent value="output">
                            <pre className="text-muted-foreground mt-4 overflow-hidden text-sm break-words whitespace-pre-wrap">
                              {JSON.stringify(path.output ?? {}, null, 2)}
                            </pre>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                    <StepsCards
                      run={run}
                      steps={path.actions}
                      startIndex={index + startIndex}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        )
    }
  })
}

const RunDataPage = () => {
  const { runId } = useParams({ from: '/admin/automations/$automationId/runs/$runId' })
  const { data } = useSuspenseQuery(runQueryOptions(runId))
  return (
    <div>
      <TypographyH3 className="mb-4">{data.run.automationName}</TypographyH3>
      <StepsCards
        run={data.run}
        steps={data.steps}
      />
    </div>
  )
}

const RunPage = () => {
  const { runId } = useParams({ from: '/admin/automations/$automationId/runs/$runId' })
  const { data } = useQuery(runQueryOptions(runId))
  return (
    <Layout
      breadcrumbs={[
        { title: 'Automations', url: '/admin/automations' },
        {
          title: data?.run.automationName ?? '...',
          url: '/admin/automations/' + data?.run.automationId,
        },
        { title: 'Run ' + data?.run.id, url: '/admin/runs/' + data?.run.id },
      ]}
    >
      <div className="container p-6">
        <Suspense fallback={<TableSkeleton />}>
          <RunDataPage />
        </Suspense>
      </div>
    </Layout>
  )
}

export const runAdminRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/automations/$automationId/runs/$runId',
  loader: async ({ context: { queryClient }, params }) => {
    return queryClient.ensureQueryData(runQueryOptions(params.runId))
  },
  component: RunPage,
  head: ({ loaderData }) => {
    const run = loaderData?.run
    return {
      meta: [
        {
          title: run ? `Run ${run.automationName} - Admin` : 'Run - Admin',
        },
        {
          name: 'description',
          content: run ? `Run ${run.automationName} page for admin` : 'Run page for admin',
        },
      ],
    }
  },
})
