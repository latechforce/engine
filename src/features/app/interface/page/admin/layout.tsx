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
import { History, Zap, ZapOff, Webhook, Link, FileText, Table, Gauge, Search } from 'lucide-react'
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
      items: [
        {
          title: 'Dashboard',
          url: '/admin',
          icon: Gauge,
        },
      ],
    },
  ]

  if (admin.automations.length > 0 || admin.tables.length > 0) {
    items[0]?.items.push({
      title: 'API Docs',
      url: '/admin/api',
      icon: Webhook,
    })
  }

  if (admin.automations.length > 0) {
    items[0]?.items.push({
      title: 'Automation Runs',
      url: '/admin/runs',
      icon: History,
    })
    items.push({
      title: 'Automations',
      action: {
        title: 'Search Automation',
        url: '/admin/automations',
        icon: Search,
      },
      items: admin.automations.map((automation) => ({
        title: automation.name,
        url: `/admin/automations/${automation.id}`,
        icon: automation.active ? Zap : ZapOff,
      })),
    })
  }

  if (admin.forms.length > 0) {
    items.push({
      title: 'Forms',
      action: {
        title: 'Search Form',
        url: '/admin/forms',
        icon: Search,
      },
      items: admin.forms.map((form) => ({
        title: form.name,
        url: `/forms/${form.path}`,
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

  return (
    <SidebarProvider>
      <Sidebar
        title={admin.name}
        description={`Version ${admin.version}`}
        groups={items}
        startPath="/admin"
      />
      <SidebarInset>
        <div className="flex h-full flex-col">
          <header className="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4">
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
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
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
