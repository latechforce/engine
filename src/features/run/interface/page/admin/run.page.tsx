import { queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { type GetRunDto } from '../../../application/dto/get-run.dto'
import { client } from '../../../../../shared/interface/lib/client.lib'
import Layout from '../../../../app/interface/page/admin/layout'
import { TypographyH3, TypographySmall } from '../../../../../shared/interface/ui/typography.ui'
import { createRoute, useParams } from '@tanstack/react-router'
import { TableSkeleton } from '../../../../../shared/interface/ui/table.ui'
import { Suspense, useState } from 'react'
import { adminRoute } from '../../../../app/interface/page/router'
import {
  Card,
  CardAction,
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
import { Switch } from '../../../../../shared/interface/ui/switch.ui'
import { Button } from '../../../../../shared/interface/ui/button.ui'
import { PencilIcon, ArrowDown } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { setStatusMutation } from '../../../../automation/interface/mutations/set-status.mutation'
import { RunStatus } from '../../component/status.component'
import type { TriggerStep } from '../../../domain/value-object.ts/trigger-step.value-object'
import type { PathsStep } from '../../../domain/value-object.ts/paths-step.value-object'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../../../shared/interface/ui/collapsible.ui'
import { ChevronsUpDown } from 'lucide-react'
import { runsAdminRoute } from './runs.page'
import { automationAdminRoute } from '../../../../automation/interface/page/admin/automation.page'

const runQueryOptions = (runId: string) =>
  queryOptions<GetRunDto>({
    queryKey: ['runData', runId],
    queryFn: () => client.runs[':runId'].$get({ param: { runId } }).then((res) => res.json()),
  })

type StepCardProps = {
  run: RunDto
  steps: Steps | ActionStep[]
  startNumber?: number
}

type TriggerStepCardProps = {
  run: RunDto
  step: TriggerStep
  number: number
}

type CollapsibleStepCardProps = {
  title: string
  status: RunDto['status']
  description: string
  children: React.ReactNode
}

const JsonViewer = ({ data }: { data: Record<string, unknown> }) => {
  return (
    <pre className="text-muted-foreground mt-4 overflow-hidden text-sm break-words whitespace-pre-wrap">
      {JSON.stringify(data, null, 2)}
    </pre>
  )
}

const CollapsibleStepCard = ({
  title,
  status,
  description,
  children,
}: CollapsibleStepCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Card className="mt-4 gap-0 p-0">
        <CollapsibleTrigger
          asChild
          className="gap-0"
        >
          <CardHeader className="cursor-pointer p-6">
            <div className="flex gap-6">
              <RunStatus status={status} />
              <div className="flex flex-col gap-2">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </div>
            </div>
            <CardAction className="my-auto">
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
              >
                <ChevronsUpDown />
                <span className="sr-only">Toggle</span>
              </Button>
            </CardAction>
          </CardHeader>
        </CollapsibleTrigger>
        <CardContent>
          <CollapsibleContent className="pb-6">{children}</CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  )
}

const TriggerStepCard = ({ run, step, number }: TriggerStepCardProps) => {
  return (
    <CollapsibleStepCard
      title={`${number}. Trigger - ${step.schema.service} / ${step.schema.event}`}
      status="success"
      description={format(new Date(run.createdAt), 'dd/MM/yyyy HH:mm:ss')}
    >
      <Tabs defaultValue="output">
        <TabsList>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="output">Output Data</TabsTrigger>
        </TabsList>
        <TabsContent value="schema">
          <JsonViewer data={step.schema} />
        </TabsContent>
        <TabsContent value="output">
          <JsonViewer data={step.output ?? {}} />
        </TabsContent>
      </Tabs>
    </CollapsibleStepCard>
  )
}

type ActionStepCardProps = {
  step: ActionStep
  number: number
}

const ActionStepCard = ({ step, number }: ActionStepCardProps) => {
  const status =
    step.schema.service === 'filter' && step.schema.action === 'only-continue-if'
      ? step.output?.canContinue === true
        ? 'success'
        : 'filtered'
      : step.error
        ? 'stopped'
        : step.output
          ? 'success'
          : 'playing'
  return (
    <CollapsibleStepCard
      key={number}
      title={`${number}. ${step.schema.name} - ${step.schema.service} / ${step.schema.action}`}
      status={status}
      description={format(new Date(step.startedAt), 'dd/MM/yyyy HH:mm:ss')}
    >
      <Tabs defaultValue={step.error ? 'error' : 'output'}>
        <TabsList>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="input">Input Data</TabsTrigger>
          {!step.error && <TabsTrigger value="output">Output Data</TabsTrigger>}
          {step.error && <TabsTrigger value="error">Error</TabsTrigger>}
        </TabsList>
        <TabsContent value="schema">
          <JsonViewer data={step.schema} />
        </TabsContent>
        <TabsContent value="input">
          <JsonViewer data={step.input} />
        </TabsContent>
        <TabsContent value="output">
          <JsonViewer data={step.output ?? {}} />
        </TabsContent>
        <TabsContent value="error">
          <JsonViewer data={step.error ?? {}} />
        </TabsContent>
      </Tabs>
    </CollapsibleStepCard>
  )
}

type PathsStepCardProps = {
  run: RunDto
  step: PathsStep
  number: number
}

const PathsStepCard = ({ run, step, number }: PathsStepCardProps) => {
  return (
    <CollapsibleStepCard
      title={`${number}. ${step.schema.name}`}
      status="success"
      description={format(new Date(step.startedAt), 'dd/MM/yyyy HH:mm:ss')}
    >
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
            <CollapsibleStepCard
              title={`1. ${path.schema.name}`}
              status="success"
              description={format(new Date(step.startedAt), 'dd/MM/yyyy HH:mm:ss')}
            >
              <Tabs defaultValue="output">
                <TabsList>
                  <TabsTrigger value="schema">Schema</TabsTrigger>
                  <TabsTrigger value="input">Input Data</TabsTrigger>
                  <TabsTrigger value="output">Output Data</TabsTrigger>
                </TabsList>
                <TabsContent value="schema">
                  <JsonViewer data={path.schema} />
                </TabsContent>
                <TabsContent value="input">
                  <JsonViewer data={path.input} />
                </TabsContent>
                <TabsContent value="output">
                  <JsonViewer data={path.output ?? {}} />
                </TabsContent>
              </Tabs>
            </CollapsibleStepCard>
            <StepsCards
              run={run}
              steps={path.actions}
              startNumber={1}
            />
          </TabsContent>
        ))}
      </Tabs>
    </CollapsibleStepCard>
  )
}

const StepsCards = ({ run, steps, startNumber = 0 }: StepCardProps) => {
  return (
    <>
      {steps.map((step, index) => {
        const number = index + startNumber + 1
        const stepElement = (() => {
          switch (step.type) {
            case 'trigger':
              return (
                <TriggerStepCard
                  run={run}
                  step={step}
                  number={number}
                />
              )
            case 'action':
              return (
                <ActionStepCard
                  step={step}
                  number={number}
                />
              )
            case 'paths':
              return (
                <PathsStepCard
                  run={run}
                  step={step}
                  number={number}
                />
              )
          }
        })()
        return (
          <div key={index}>
            {stepElement}
            {index < steps.length - 1 && (
              <div className="mt-4 flex justify-center">
                <ArrowDown className="text-muted-foreground h-6 w-6" />
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

const RunDataPage = () => {
  const { runId } = useParams({ from: '/admin/automations/$automationId/runs/$runId' })
  const { data } = useSuspenseQuery(runQueryOptions(runId))
  const mutation = setStatusMutation('runData')
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <TypographyH3 className="flex items-center gap-6">
          <RunStatus status={data.run.status} />
          <span>{data.run.automationName}</span>
        </TypographyH3>
        <div className="flex items-center gap-2">
          <TypographySmall>
            Automation is <strong>{data.automation.active ? 'ON' : 'OFF'}</strong>
          </TypographySmall>
          <Switch
            checked={data?.automation.active}
            onCheckedChange={() => {
              if (data?.automation) {
                mutation.mutate(data.automation)
              }
            }}
          />
          {data?.automation.editUrl && (
            <Link
              to={data.automation.editUrl}
              target="_blank"
            >
              <Button variant="outline">
                <PencilIcon className="h-4 w-4" />
                Edit on Github
              </Button>
            </Link>
          )}
        </div>
      </div>
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
        { title: 'Automation History', url: runsAdminRoute.fullPath },
        {
          title: data?.run.automationName ?? '...',
          url: automationAdminRoute.fullPath,
        },
        {
          title: 'Run ' + format(new Date(data?.run.createdAt ?? ''), 'dd/MM/yyyy HH:mm:ss'),
          url: runAdminRoute.fullPath,
        },
      ]}
    >
      <div className="container mx-auto p-6">
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
