export type SidebarProps = {
  brand: string
  brandHref: string
  items: {
    label: string
    href: string
    icon: React.ReactNode
    active?: boolean
    aAttributes?: Record<string, string>
  }[]
  children: React.ReactNode
}

export type Sidebar = React.ComponentType<SidebarProps>
