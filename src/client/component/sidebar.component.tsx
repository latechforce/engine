import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/client/ui/sidebar.ui'
import { TypographyH3 } from '../ui/typography.ui'
import { Link } from '@tanstack/react-router'

export type SidebarProps = React.ComponentPropsWithoutRef<'div'> & {
  title?: string
  items?: {
    title: string
    url: string
    icon: React.ElementType
  }[]
}

export function Sidebar({ title, items, ...props }: SidebarProps) {
  return (
    <SidebarUI {...props}>
      <SidebarHeader>
        <SidebarGroup>
          <TypographyH3>{title}</TypographyH3>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {items && (
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={window.location.pathname === item.url}
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>
    </SidebarUI>
  )
}
