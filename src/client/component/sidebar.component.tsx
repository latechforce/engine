import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarGroupLabel,
} from '@/client/ui/sidebar.ui'
import { TypographyH3 } from '../ui/typography.ui'
import { Link } from '@tanstack/react-router'

export type SidebarItem = {
  title: string
  url: string
  icon: React.ElementType
}

export type SidebarGroup = {
  title: string
  items: SidebarItem[]
}

export type SidebarProps = React.ComponentPropsWithoutRef<'div'> & {
  title?: string
  groups?: SidebarGroup[]
}

export function Sidebar({ title, groups, ...props }: SidebarProps) {
  return (
    <SidebarUI {...props}>
      <SidebarHeader>
        <SidebarGroup>
          <TypographyH3>{title}</TypographyH3>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        {groups?.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
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
          </SidebarGroup>
        ))}
      </SidebarContent>
    </SidebarUI>
  )
}
