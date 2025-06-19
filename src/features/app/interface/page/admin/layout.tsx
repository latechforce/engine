import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarSkeleton,
} from '../../../../../shared/interface/ui/sidebar.ui'
import {
  Sidebar,
  type SidebarGroup,
} from '../../../../../shared/interface/component/sidebar.component'
import { History, Zap, Webhook, Link, FileText, Table } from 'lucide-react'
import { RequireAuth } from '../../../../user/interface/context/require-auth.context'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../../../shared/interface/ui/breadcrumb.ui'
import { client } from '../../../../../shared/interface/lib/client.lib'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import type { GetAdminMetadataDto } from '../../../../app/application/dto/get-admin-metadata.dto'
import { Suspense } from 'react'

const adminMetadataQueryOptions = () =>
  queryOptions<GetAdminMetadataDto>({
    queryKey: ['adminMetadataData'],
    queryFn: () => client.metadata.admin.$get().then((res) => res.json()),
  })

export type Breadcrumb = {
  title: string
  url: string
}

type LayoutProps = {
  children: React.ReactNode
  breadcrumbs?: Breadcrumb[]
}

function SidebarLayout({ children, breadcrumbs = [] }: LayoutProps) {
  const {
    data: { admin },
  } = useSuspenseQuery(adminMetadataQueryOptions())
  const items: SidebarGroup[] = [
    {
      title: 'Application',
      items: [],
    },
  ]

  if (admin.automations.length > 0) {
    items[0]?.items.push({
      title: 'Runs',
      url: '/admin/runs',
      icon: History,
    })
    items.push({
      title: 'Automations',
      items: admin.automations.map((automation) => ({
        title: automation.name,
        url: `/admin/automations/${automation.id}`,
        icon: Zap,
      })),
    })
  }

  if (admin.forms.length > 0) {
    items[0]?.items.push({
      title: 'Submissions',
      url: '/admin/submissions',
      icon: FileText,
    })
    items.push({
      title: 'Forms',
      items: admin.forms.map((form) => ({
        title: form.name,
        url: `/admin/forms/${form.id}`,
        icon: FileText,
      })),
    })
  }

  if (admin.tables.length > 0) {
    items.push({
      title: 'Tables',
      items: admin.tables.map((table) => ({
        title: table.name,
        url: `/admin/tables/${table.id}`,
        icon: Table,
      })),
    })
  }

  if (admin.connections.length > 0) {
    items[0]?.items.push({
      title: 'Connections',
      url: '/admin/connections',
      icon: Link,
    })
  }

  if (admin.automations.length > 0 || admin.tables.length > 0) {
    items[0]?.items.push({
      title: 'API Docs',
      url: '/admin/api',
      icon: Webhook,
    })
  }

  return (
    <SidebarProvider>
      <Sidebar
        title={admin.name}
        description={`Version ${admin.version}`}
        groups={items}
        startPath="/admin"
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="mr-2 -ml-1" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => [
                <BreadcrumbItem
                  key={breadcrumb.title}
                  className="hidden md:block"
                >
                  {index < breadcrumbs.length - 1 ? (
                    <BreadcrumbLink href={breadcrumb.url}>{breadcrumb.title}</BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>,
                index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator
                    key={`${breadcrumb.title}-separator`}
                    className="hidden md:block"
                  />
                ),
              ])}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function Layout({ children, breadcrumbs = [] }: LayoutProps) {
  return (
    <RequireAuth to="/admin/login">
      <Suspense fallback={<SidebarSkeleton />}>
        <SidebarLayout breadcrumbs={breadcrumbs}>{children}</SidebarLayout>
      </Suspense>
    </RequireAuth>
  )
}
