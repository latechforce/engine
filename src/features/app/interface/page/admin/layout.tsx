import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '../../../../../shared/interface/ui/sidebar.ui'
import {
  Sidebar,
  type SidebarGroup,
} from '../../../../../shared/interface/component/sidebar.component'
import { History, Zap, Gauge, Webhook, Link, FileText, Table } from 'lucide-react'
import { RequireAuth } from '../../../../user/interface/context/require-auth.context'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../../../shared/interface/ui/breadcrumb.ui'

// Menu items.
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
  {
    title: 'Forms',
    items: [
      {
        title: 'Forms',
        url: '/admin/forms',
        icon: FileText,
      },
    ],
  },
  {
    title: 'Automations',
    items: [
      {
        title: 'Automations',
        url: '/admin/automations',
        icon: Zap,
      },
      {
        title: 'Runs',
        url: '/admin/runs',
        icon: History,
      },
      {
        title: 'Connections',
        url: '/admin/connections',
        icon: Link,
      },
    ],
  },
  {
    title: 'Tables',
    items: [
      {
        title: 'Tables',
        url: '/admin/tables',
        icon: Table,
      },
    ],
  },
  {
    title: 'Resources',
    items: [
      {
        title: 'OpenAPI',
        url: '/admin/openapi',
        icon: Webhook,
      },
    ],
  },
]

export type Breadcrumb = {
  title: string
  url: string
}

export default function Layout({
  children,
  breadcrumbs = [],
}: {
  children: React.ReactNode
  breadcrumbs?: Breadcrumb[]
}) {
  return (
    <RequireAuth to="/admin/login">
      <SidebarProvider>
        <Sidebar
          title="Admin"
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
    </RequireAuth>
  )
}
