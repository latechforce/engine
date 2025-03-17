export interface PageProps extends React.PropsWithChildren {
  title: string
  description?: string
}

export type Page = React.ComponentType<PageProps>
