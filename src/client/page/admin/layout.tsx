import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/client/ui/sidebar.ui'
import { Sidebar } from '@/client/component/sidebar.component'
import { History, Zap, Gauge, Webhook, Link } from 'lucide-react'
import { RequireAuth } from '@/client/context/require-auth.context'
import { Separator } from '@/client/ui/separator.ui'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/client/ui/breadcrumb.ui'

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/_admin',
    icon: Gauge,
  },
  {
    title: 'Automations',
    url: '/_admin/automations',
    icon: Zap,
  },
  {
    title: 'Automation History',
    url: '/_admin/automation/history',
    icon: History,
  },
  {
    title: 'Connections',
    url: '/_admin/connections',
    icon: Link,
  },
  {
    title: 'OpenAPI',
    url: '/_admin/openapi',
    icon: Webhook,
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
    <RequireAuth to="/_admin/login">
      <SidebarProvider>
        <Sidebar
          title="Admin"
          items={items}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 h-4"
            />
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
