export interface PageProps extends React.PropsWithChildren {
  title: string
  timestamp: string
  description?: string
}

export type Page = React.ComponentType<PageProps>
