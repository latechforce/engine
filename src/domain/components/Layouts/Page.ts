export interface PageProps extends React.PropsWithChildren {
  title: string
  description?: string
  cssFiles: string[]
  jsFiles: string[]
}

export type Page = React.ComponentType<PageProps>
