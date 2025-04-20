export type DropdownProps = {
  label: string | React.ReactNode
  items: {
    label: string | React.ReactNode
    aAttributes: Record<string, string>
  }[]
}

export type Dropdown = React.ComponentType<DropdownProps>
