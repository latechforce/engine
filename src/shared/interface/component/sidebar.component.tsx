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
  SidebarFooter,
} from '../ui/sidebar.ui'
import { TypographyH3 } from '../ui/typography.ui'
import { User2 } from 'lucide-react'
import { ChevronUp } from 'lucide-react'
import { DropdownMenuTrigger } from '../ui/dropdown-menu.ui'
import { DropdownMenuItem } from '../ui/dropdown-menu.ui'
import { DropdownMenuContent } from '../ui/dropdown-menu.ui'
import { DropdownMenu } from '../ui/dropdown-menu.ui'
import { Link } from '@tanstack/react-router'
import { authClient } from '../../../features/user/interface/lib/auth.lib'

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
  const { data: session } = authClient.useSession()
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {session?.user?.email}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={() => authClient.signOut()}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarUI>
  )
}
