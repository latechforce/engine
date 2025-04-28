type SidebarItemBase = {
  type: 'single' | 'with-children'
  label: string
  icon: React.ReactNode
  active?: boolean
  aAttributes?: Record<string, string>
}

export type SingleSidebarItem = SidebarItemBase & {
  type: 'single'
  href: string
}

export type SidebarItemWithChildren = SidebarItemBase & {
  type: 'with-children'
  children: SidebarItem[]
}

export type SidebarItem = SingleSidebarItem | SidebarItemWithChildren

export type SidebarProps = {
  brand: string
  brandHref: string
  items: SidebarItem[]
  children: React.ReactNode
}

export type Sidebar = React.ComponentType<SidebarProps>
